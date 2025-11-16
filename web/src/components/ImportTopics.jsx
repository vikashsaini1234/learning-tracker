import { useRef, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function ImportTopics({ categoryId, onImported }) {
  const ref = useRef();
  const [fileName, setFileName] = useState("");

  const openPicker = () => {
    ref.current.click();
  };

  const onFileChange = () => {
    const file = ref.current.files[0];
    if (file) setFileName(file.name);
  };

  const upload = async () => {
    const file = ref.current.files[0];
    if (!file) {
      toast.error("Select a file");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);

    try {
      await api.post(`/topics/import/${categoryId}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Imported");
      onImported();
      setFileName("");
      ref.current.value = "";
    } catch (e) {
      toast.error("Import failed");
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Hidden file input */}
      <input
        ref={ref}
        type="file"
        accept=".xlsx"
        className="hidden"
        onChange={onFileChange}
      />

      {/* Custom file picker button */}
      <button
        onClick={openPicker}
        className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm"
      >
        Choose File
      </button>

      {/* Show file name (if selected) */}
      <div className="text-sm text-gray-600 italic">
        {fileName || "No file chosen"}
      </div>

      {/* Upload button */}
      <button
        onClick={upload}
        className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
      >
        Import
      </button>
    </div>
  );
}
