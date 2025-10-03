
import React, { useState, useCallback } from 'react';
import { AddItemForm } from './components/AddItemForm';
import { Header } from './components/Header';
import { InventoryList } from './components/InventoryList';
import { RentModal } from './components/RentModal';
import { EditModal } from './components/EditModal';
import { DeleteModal } from './components/DeleteModal';
import { InventoryItem, RentalStatus } from './types';
import { generateDescription } from './services/geminiService';
import { ToastContainer, Toast } from './components/Toast';

const initialInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Professional DSLR Camera',
    userDescription: 'Canon EOS 5D Mark IV with 24-70mm lens. Perfect for events and portraits.',
    aiDescription: 'Capture life\'s moments in stunning detail with this professional-grade DSLR camera. Ideal for both seasoned photographers and aspiring creators, it delivers breathtaking image quality for any occasion.',
    pricePerDay: 50,
    imageUrl: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?q=80&w=1024',
    status: RentalStatus.AVAILABLE,
  },
  {
    id: '2',
    name: 'High-Performance Laptop',
    userDescription: 'MacBook Pro 16-inch, M1 Pro chip, 16GB RAM. Great for video editing and development.',
    aiDescription: 'Unleash your productivity with this powerhouse laptop, engineered for demanding tasks. Its sleek design and blazing-fast performance make it the ultimate tool for professionals on the go.',
    pricePerDay: 75,
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1024',
    status: RentalStatus.RENTED,
  },
  {
    id: '3',
    name: 'Camping Tent for 4',
    userDescription: 'Spacious and waterproof tent. Easy to set up.',
    aiDescription: 'Embark on your next outdoor adventure with this reliable and spacious 4-person tent. Designed for comfort and durability, it’s your home away from home in the great outdoors.',
    pricePerDay: 25,
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1024',
    status: RentalStatus.AVAILABLE,
  }
];

const App: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [itemToRent, setItemToRent] = useState<InventoryItem | null>(null);
  const [itemToEdit, setItemToEdit] = useState<InventoryItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' }[]>([]);

  const addToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
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

  // Rental Modal Handlers
  const handleOpenRentModal = (item: InventoryItem) => setItemToRent(item);
  const handleCloseRentModal = () => setItemToRent(null);

  // Edit Modal Handlers
  const handleOpenEditModal = (item: InventoryItem) => setItemToEdit(item);
  const handleCloseEditModal = () => setItemToEdit(null);

  // Delete Modal Handlers
  const handleOpenDeleteModal = (item: InventoryItem) => setItemToDelete(item);
  const handleCloseDeleteModal = () => setItemToDelete(null);


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

  const handleUpdateItem = (updatedItem: InventoryItem) => {
    setInventory(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    addToast('Item updated successfully!');
    handleCloseEditModal();
  };

  const handleDeleteItem = (itemId: string) => {
    const deletedItem = inventory.find(item => item.id === itemId);
    setInventory(prev => prev.filter(item => item.id !== itemId));
    if(deletedItem) {
        addToast(`'${deletedItem.name}' was deleted.`);
    }
    handleCloseDeleteModal();
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
              onEditClick={handleOpenEditModal}
              onDeleteClick={handleOpenDeleteModal}
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

      {itemToEdit && (
        <EditModal 
          item={itemToEdit}
          onClose={handleCloseEditModal}
          onConfirm={handleUpdateItem}
        />
      )}

      {itemToDelete && (
        <DeleteModal
          item={itemToDelete}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteItem}
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
