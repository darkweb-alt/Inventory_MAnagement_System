
import React from 'react';
import { InventoryItem } from '../types';
import { InventoryItemCard } from './InventoryItemCard';

interface InventoryListProps {
  items: InventoryItem[];
  onRentClick: (item: InventoryItem) => void;
}

export const InventoryList: React.FC<InventoryListProps> = ({ items, onRentClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Available for Rent</h2>
      {items.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium text-gray-600">No items yet!</h3>
            <p className="text-sm text-gray-500 mt-1">Add an item using the form on the left to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map(item => (
            <InventoryItemCard key={item.id} item={item} onRentClick={() => onRentClick(item)} />
          ))}
        </div>
      )}
    </div>
  );
};
