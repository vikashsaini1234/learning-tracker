import { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import ConfirmDialog from '../components/ConfirmDialog';

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Sorting controls
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc"); // newest first

  const load = () => {
    setLoading(true);
    api.get('/topics')
      .then(r => setTopics(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const deleteTopic = async () => {
    try {
      await api.delete(`/topics/${selectedId}`);
      toast.success("Deleted");
      setShowConfirm(false);
      load();
    } catch {
      toast.error("Failed");
    }
  };

  // Status badge colors
  const getStatusBadge = (status) => {
    if (status === "COMPLETED")
      return "bg-green-100 text-green-700 border-green-300";
    if (status === "IN_PROGRESS")
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  // Category label colors
  const getCategoryColor = (name = "") => {
    const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const colors = [
      "bg-blue-100 text-blue-700",
      "bg-purple-100 text-purple-700",
      "bg-pink-100 text-pink-700",
      "bg-green-100 text-green-700",
      "bg-yellow-100 text-yellow-700",
      "bg-indigo-100 text-indigo-700"
    ];
    return colors[hash % colors.length];
  };

  // Sorting logic
  const sortedTopics = [...topics].sort((a, b) => {
    if (sortBy === "createdAt") {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    if (sortBy === "status") {
      const order = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"];
      return sortOrder === "asc"
        ? order.indexOf(a.status) - order.indexOf(b.status)
        : order.indexOf(b.status) - order.indexOf(a.status);
    }
    return 0;
  });

  if (loading) return <Loader />;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Topics</h2>
        <Link to="/" className="text-sm text-blue-600 hover:underline">← Back</Link>
      </div>

      {/* SORT CONTROLS */}
      <div className="flex items-center gap-3 mb-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-2 text-sm"
        >
          <option value="createdAt">Sort by: Creation Date</option>
          <option value="status">Sort by: Status</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded p-2 text-sm"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Topic List */}
      {sortedTopics.length === 0 ? (
        <p className="text-gray-500 italic">No topics found</p>
      ) : (
        <div className="space-y-3">
          {sortedTopics.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center"
            >
              {/* LEFT SIDE */}
              <div>
                <div className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                  {t.name}

                  {/* STATUS BADGE */}
                  <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(t.status)}`}>
                    {t.status.replace("_", " ")}
                  </span>
                </div>

                {/* CATEGORY LABEL */}
                <div className={`inline-block mt-1 text-xs px-2 py-1 rounded ${getCategoryColor(t.categoryName)}`}>
                  {t.categoryName || `Category ${t.categoryId}`}
                </div>
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => { setSelectedId(t.id); setShowConfirm(true); }}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* DELETE CONFIRMATION */}
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
