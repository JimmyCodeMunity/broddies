import React from 'react';

const PaymentMethodCard = ({ method, selected, onSelect }) => (
  <div 
    className={`p-4 border rounded-lg cursor-pointer transition-all ${
      selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
    }`}
    onClick={() => onSelect(method.id)}
  >
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center">
        {method.id === 'stripe' ? (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-6h2v2h-2zm0-8h2v6h-2z"/>
          </svg>
        ) : (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
          </svg>
        )}
      </div>
      <div>
        <h3 className="font-medium">{method.name}</h3>
        <p className="text-sm text-gray-500">{method.description}</p>
      </div>
    </div>
  </div>
);

export default PaymentMethodCard; 