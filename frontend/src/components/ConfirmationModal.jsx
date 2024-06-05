import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ConfirmationModal({
  isOpen,
  onRequestClose,
  onConfirm,
  message,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-5 rounded-lg shadow-lg max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-xl font-bold mb-4">Confirmation</h2>
      <p className="mb-4">{message}</p>
      <div className="flex justify-end">
        <button
          onClick={onRequestClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Confirmer
        </button>
      </div>
    </Modal>
  );
}
