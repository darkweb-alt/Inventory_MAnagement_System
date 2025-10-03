
import React from 'react';
import { InventoryItem, RentalStatus } from '../types';

interface InventoryItemCardProps {
  item: InventoryItem;
  onRentClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const EditIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
    </svg>
);

const DeleteIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.22-2.365.468a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25V4c.827-.05 1.66-.075 2.5-.075zM8.47 9.47a.75.75 0 011.06 0L10 10.06l.47-.47a.75.75 0 011.06 1.06L11.06 11l.47.47a.75.75 0 11-1.06 1.06L10 12.12l-.47.47a.75.75 0 01-1.06-1.06l.47-.47-.47-.47a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);

export const InventoryItemCard: React.FC<InventoryItemCardProps> = ({ item, onRentClick, onEditClick, onDeleteClick }) => {
  const isAvailable = item.status === RentalStatus.AVAILABLE;

  const statusBadgeClass = isAvailable
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl group">
      <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEditClick} aria-label="Edit item" className="p-2 bg-white/80 rounded-full text-gray-700 hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500 backdrop-blur-sm">
              <EditIcon className="h-5 w-5" />
          </button>
          <button onClick={onDeleteClick} aria-label="Delete item" className="p-2 bg-white/80 rounded-full text-gray-700 hover:bg-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 backdrop-blur-sm">
              <DeleteIcon className="h-5 w-5" />
          </button>
      </div>
      <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 pr-2">{item.name}</h3>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusBadgeClass} flex-shrink-0`}>
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
