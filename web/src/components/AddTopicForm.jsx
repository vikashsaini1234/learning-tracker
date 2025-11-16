import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function AddTopicForm({ categoryId, onClose, onCreated }) {
  const [name, setName] = useState("");

  const create = async () => {
    try {
      await api.post(`/topics/category/${categoryId}`, { name });
      toast.success("Topic created");
      onCreated();
      onClose();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to create topic");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add Topic</h2>

      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Topic name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
