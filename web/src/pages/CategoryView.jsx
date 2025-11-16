import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import FloatingPanel from "../components/FloatingPanel";
import AddTopicForm from "../components/AddTopicForm";
import ImportTopics from "../components/ImportTopics";
import ConfirmDialog from "../components/ConfirmDialog";   // ✅ added
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function CategoryView() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddPanel, setShowAddPanel] = useState(false);
  const addBtnRef = useRef(null);

  // ✅ For deleting topics
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([api.get(`/categories/${id}`), api.get(`/topics/category/${id}`)])
      .then(([catRes, topicsRes]) => {
        setCategory(catRes.data);
        setTopics(topicsRes.data);
      })
      .catch(() => setError("Failed"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [id]);

  const updateStatus = (topicId, newStatus) => {
    api
      .put(`/topics/${topicId}`, { status: newStatus })
      .then(() => {
        toast.success("Updated");
        load();
      })
      .catch(() => toast.error("Failed"));
  };

  // Pretty status text
  const prettyStatus = (status) => {
    return status
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // ✅ Delete topic handler
  const deleteTopic = async () => {
    try {
      await api.delete(`/topics/${selectedTopicId}`);
      toast.success("Deleted");
      setShowConfirm(false);
      load();
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            ref={addBtnRef}
            onClick={() => setShowAddPanel(true)}
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            + Add Topic
          </button>
          <ImportTopics categoryId={id} onImported={load} />
        </div>
      </div>

      {topics.length === 0 ? (
        <p className="text-gray-500 italic">No topics yet</p>
      ) : (
        <div className="space-y-4">
          {topics.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{t.name}</h3>
              </div>

              <div className="flex items-center gap-6">
                {/* Status badge */}
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    t.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : t.status === "IN_PROGRESS"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {prettyStatus(t.status)}
                </div>

                {/* Status buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => updateStatus(t.id, "IN_PROGRESS")}
                    className="px-3 py-1 bg-yellow-300 text-black rounded text-sm"
                  >
                    Start
                  </button>
                  <button
                    onClick={() => updateStatus(t.id, "COMPLETED")}
                    className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                  >
                    Complete
                  </button>
                </div>

                {/* ✅ Delete button */}
                <button
                  onClick={() => {
                    setSelectedTopicId(t.id);
                    setShowConfirm(true);
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link to="/category" className="text-blue-600 hover:underline">
          ← Back
        </Link>
      </div>

      {/* Add topic modal */}
      <FloatingPanel
        open={showAddPanel}
        onClose={() => setShowAddPanel(false)}
        anchorRef={addBtnRef}
      >
        <AddTopicForm
          categoryId={id}
          onClose={() => setShowAddPanel(false)}
          onCreated={load}
        />
      </FloatingPanel>

      {/* ✅ Delete confirmation modal */}
      <ConfirmDialog
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={deleteTopic}
        title="Delete Topic?"
        message="Are you sure you want to delete this topic? This action cannot be undone."
      />
    </div>
  );
}
