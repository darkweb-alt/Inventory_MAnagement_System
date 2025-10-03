
import React from 'react';

const BoxIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6H5.25V5.25C5.25 4.009 6.259 3 7.5 3H16.5C17.741 3 18.75 4.009 18.75 5.25V6H20.625C21.246 6 21.75 6.504 21.75 7.125V18.375C21.75 18.996 21.246 19.5 20.625 19.5H3.375C2.754 19.5 2.25 18.996 2.25 18.375V7.125ZM7.5 4.5V6H16.5V4.5C16.5 4.40326 16.4605 4.31086 16.3902 4.24018C16.3199 4.1695 16.2275 4.125 16.125 4.125H7.875C7.7725 4.125 7.68011 4.1695 7.60982 4.24018C7.53953 4.31086 7.5 4.40326 7.5 4.5ZM3.75 7.5V18H20.25V7.5H3.75Z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <BoxIcon className="h-8 w-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Rentify
            </h1>
        </div>
        <span className="text-sm font-medium text-gray-500">Your Peer-to-Peer Rental Hub</span>
      </div>
    </header>
  );
};
