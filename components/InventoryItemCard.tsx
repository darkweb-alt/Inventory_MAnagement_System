
import React from 'react';
import { InventoryItem, RentalStatus } from '../types';

interface InventoryItemCardProps {
  item: InventoryItem;
  onRentClick: () => void;
}

export const InventoryItemCard: React.FC<InventoryItemCardProps> = ({ item, onRentClick }) => {
  const isAvailable = item.status === RentalStatus.AVAILABLE;

  const statusBadgeClass = isAvailable
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl">
      <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusBadgeClass}`}>
            {item.status}
            </span>
        </div>
        <p className="mt-2 text-sm text-gray-600 flex-grow">
            {item.aiDescription}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-primary-600">
            ${item.pricePerDay.toFixed(2)}<span className="text-sm font-normal text-gray-500">/day</span>
          </p>
          <button
            onClick={onRentClick}
            disabled={!isAvailable}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};
