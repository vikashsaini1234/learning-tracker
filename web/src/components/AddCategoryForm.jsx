import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function AddCategoryForm({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const create = async () => {
    try {
      const res = await api.post("/categories", { name, description });
      toast.success("Category created");
      onCreated();
      onClose();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to create category");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add Category</h2>

      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className="w-full border px-3 py-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={create}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Save
      </button>
    </div>
  );
}
