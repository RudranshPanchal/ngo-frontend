import React from "react";
import { Button } from "./ui/button.jsx";

const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center px-4 z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-xl border border-gray-200 animate-[pop_0.25s_ease-out]">
        
        <h2 className="text-xl font-bold text-red-600 mb-3 text-center">
          Delete !
        </h2>

        <p className="text-gray-700 text-center mb-6">
          Are you sure you want to delete this ?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <Button
            className="bg-gray-300 text-black hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
