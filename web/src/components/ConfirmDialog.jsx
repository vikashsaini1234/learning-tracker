import FloatingPanel from "./FloatingPanel";

export default function ConfirmDialog({ open, onCancel, onConfirm, title, message }) {
  return (
    <FloatingPanel open={open} onClose={onCancel}>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{message}</p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </FloatingPanel>
  );
}
