
import React, { useState } from 'react';
import { InventoryItem } from '../types';

interface RentModalProps {
  item: InventoryItem;
  onClose: () => void;
  onConfirm: (itemId: string, days: number) => void;
}

export const RentModal: React.FC<RentModalProps> = ({ item, onClose, onConfirm }) => {
  const [days, setDays] = useState(1);

  const handleConfirm = () => {
    if (days > 0) {
      onConfirm(item.id, days);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center" id="my-modal">
      <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Rent "{item.name}"</h3>
          <div className="mt-4 px-7 py-3">
             <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-sm text-gray-500">
              Please enter the number of days you'd like to rent this item.
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
                <label htmlFor="rental-days" className="text-sm font-medium text-gray-700">Days:</label>
                <input
                    type="number"
                    id="rental-days"
                    value={days}
                    onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-24 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
            </div>
            <div className="mt-4 text-lg font-semibold">
                Total: <span className="text-primary-600">${(item.pricePerDay * days).toFixed(2)}</span>
            </div>
          </div>
          <div className="items-center px-4 py-3 bg-gray-50 rounded-b-md">
            <button
              id="confirm-button"
              className="px-4 py-2 bg-primary-600 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={handleConfirm}
            >
              Confirm Rental
            </button>
            <button
              id="cancel-button"
              className="ml-2 px-4 py-2 bg-white text-gray-700 text-base font-medium rounded-md w-auto border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
