import React from 'react';

interface ModalProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="w-full max-w-[46rem] flex flex-col items-stretch gap-8 px-8 py-5 rounded-lg bg-black md:bg-gradient-to-b from-zinc-900 to-black">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">Notification</h2>
          <hr className="border-t-[1px] border-zinc-800 my-4" />
          <p className="text-white">{message}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

