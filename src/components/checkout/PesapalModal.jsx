import React from 'react';

const PesapalModal = ({ open, url, onClose }) => {
  if (!open) return null;
  console.log("url",url)
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-xl shadow-lg w-[90vw] h-[80vh] overflow-hidden p-8 relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-600 font-bold text-xl z-[102] hover:text-red-700"
        >
          &times;
        </button>
        {url && (
          <iframe
            src={url}
            className="w-full h-full rounded-b-xl border-none"
            title="Pesapal Payment"
            allow="payment"
          />
        )}
      </div>
    </div>
  );
};

export default PesapalModal; 