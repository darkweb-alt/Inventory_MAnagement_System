
import React, { useState, useEffect } from 'react';
import { InventoryItem } from '../types';

interface EditModalProps {
  item: InventoryItem;
  onClose: () => void;
  onConfirm: (item: InventoryItem) => void;
}

export const EditModal: React.FC<EditModalProps> = ({ item, onClose, onConfirm }) => {
  const [name, setName] = useState(item.name);
  const [userDescription, setUserDescription] = useState(item.userDescription);
  const [pricePerDay, setPricePerDay] = useState(item.pricePerDay.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      ...item,
      name,
      userDescription,
      pricePerDay: parseFloat(pricePerDay),
    });
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
        onClose();
       }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Edit "{item.name}"</h3>
            <div className="mt-4 px-2 py-3 text-left space-y-4">
              <div>
                <label htmlFor="edit-item-name" className="block text-sm font-medium text-gray-700">Item Name</label>
                <input
                  type="text"
                  id="edit-item-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-item-description" className="block text-sm font-medium text-gray-700">Your Notes/Description</label>
                <textarea
                  id="edit-item-description"
                  rows={3}
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-item-price" className="block text-sm font-medium text-gray-700">Price per day ($)</label>
                <input
                  type="number"
                  id="edit-item-price"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>
          <div className="items-center px-4 py-3 bg-gray-50 rounded-b-md text-right">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-white text-gray-700 text-base font-medium rounded-md w-auto border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
