
import React, { useState } from 'react';
import { Spinner } from './Spinner';

interface AddItemFormProps {
  onAddItem: (
    name: string,
    userDescription: string,
    pricePerDay: number,
    image: File | null
  ) => Promise<void>;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onAddItem(name, userDescription, parseFloat(pricePerDay), image);
    setIsLoading(false);
    // Reset form
    setName('');
    setUserDescription('');
    setPricePerDay('');
    setImage(null);
    setImagePreview(null);
    // Also reset the file input visually
    const fileInput = document.getElementById('item-image-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="item-name" className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            id="item-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="e.g., Electric Drill"
            required
          />
        </div>
        <div>
          <label htmlFor="item-description" className="block text-sm font-medium text-gray-700">Your Notes/Description</label>
          <textarea
            id="item-description"
            rows={3}
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="e.g., Good for DIY projects, comes with 3 bits"
            required
          />
        </div>
        <div>
          <label htmlFor="item-price" className="block text-sm font-medium text-gray-700">Price per day ($)</label>
          <input
            type="number"
            id="item-price"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="e.g., 15"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Item Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="mx-auto h-24 w-24 object-cover rounded-md" />
                    ) : (
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor="item-image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                            <span>Upload a file</span>
                            <input id="item-image-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" required/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 disabled:cursor-not-allowed"
        >
          {isLoading ? <Spinner /> : 'Generate & Add Item'}
        </button>
        {isLoading && <p className="text-center text-sm text-gray-500 mt-2">Our AI is crafting a great description...</p>}
      </form>
    </div>
  );
};
