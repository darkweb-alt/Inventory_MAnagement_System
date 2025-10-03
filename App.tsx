
import React, { useState, useCallback } from 'react';
import { AddItemForm } from './components/AddItemForm';
import { Header } from './components/Header';
import { InventoryList } from './components/InventoryList';
import { RentModal } from './components/RentModal';
import { InventoryItem, RentalStatus } from './types';
import { generateDescription } from './services/geminiService';
import { ToastContainer, Toast } from './components/Toast';

const App: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [itemToRent, setItemToRent] = useState<InventoryItem | null>(null);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' }[]>([]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const handleAddItem = useCallback(async (
    name: string,
    userDescription: string,
    pricePerDay: number,
    image: File | null
  ) => {
    if (!name || !userDescription || !pricePerDay || !image) {
      addToast('Please fill all fields and select an image.', 'error');
      return;
    }

    try {
      const aiDescription = await generateDescription(name, userDescription);
      
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        const newItem: InventoryItem = {
          id: Date.now().toString(),
          name,
          userDescription,
          aiDescription,
          pricePerDay,
          imageUrl: reader.result as string,
          status: RentalStatus.AVAILABLE,
        };
        setInventory(prev => [newItem, ...prev]);
        addToast('Item added successfully with AI description!');
      };
      reader.onerror = () => {
        throw new Error("Could not read image file.");
      }
    } catch (error) {
      console.error('Error adding item:', error);
      addToast('Failed to generate description or add item.', 'error');
    }
  }, []);

  const handleOpenRentModal = (item: InventoryItem) => {
    setItemToRent(item);
  };

  const handleCloseRentModal = () => {
    setItemToRent(null);
  };

  const handleConfirmRent = (itemId: string, days: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, status: RentalStatus.RENTED } : item
      )
    );
    const rentedItem = inventory.find(item => item.id === itemId);
    if (rentedItem) {
      const cost = rentedItem.pricePerDay * days;
      addToast(`Rented '${rentedItem.name}' for ${days} days. Total: $${cost.toFixed(2)}`, 'success');
    }
    handleCloseRentModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AddItemForm onAddItem={handleAddItem} />
          </div>
          <div className="lg:col-span-2">
            <InventoryList
              items={inventory}
              onRentClick={handleOpenRentModal}
            />
          </div>
        </div>
      </main>
      {itemToRent && (
        <RentModal
          item={itemToRent}
          onClose={handleCloseRentModal}
          onConfirm={handleConfirmRent}
        />
      )}
      <ToastContainer>
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToasts(p => p.filter(t => t.id !== toast.id))} />
        ))}
      </ToastContainer>
    </div>
  );
};

export default App;
