import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import ConfirmDialog from "./ConfirmDialog";

export default function CategoryTile({ category, index = 0 }) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const statusClass =
    category.status === "COMPLETED"
      ? "bg-green-100 text-green-700"
      : category.status === "IN_PROGRESS"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-blue-100 text-blue-700";

  // ✅ New helper: pretty formatting for status text
  const prettyStatus = (status) => {
    return status
      .toLowerCase()               // "not_started"
      .replace(/_/g, " ")          // "not started"
      .replace(/\b\w/g, (c) => c.toUpperCase()); // "Not Started"
  };

  const openCategory = () => {
    navigate(`/category/${category.id}`);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/categories/${category.id}`);
      toast.success("Deleted");
      window.location.reload();
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.18 }}
      >
        {/* Entire tile acts like a button */}
        <div
          onClick={openCategory}
          className="cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="text-lg font-semibold text-gray-900">
                {category.name}
              </div>
              <div className="text-sm text-gray-500 line-clamp-2">
                {category.description}
              </div>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
            >
              {/* ✅ Using formatted status */}
              {prettyStatus(category.status)}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
              <div>Progress</div>
              <div className="font-medium">{category.progressPercent ?? 0}%</div>
            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  category.progressPercent >= 100
                    ? "bg-green-500"
                    : category.progressPercent > 0
                    ? "bg-yellow-400"
                    : "bg-blue-500"
                }`}
                style={{ width: `${category.progressPercent ?? 0}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowConfirm(true);
              }}
              className="px-3 py-1 rounded bg-red-500 text-white text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modern confirmation dialog */}
      <ConfirmDialog
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Category?"
        message="Are you sure you want to delete this category? All topics within this category will also be deleted."
      />
    </>
  );
}
