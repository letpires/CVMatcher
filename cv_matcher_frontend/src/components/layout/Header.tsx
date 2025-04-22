import React from 'react';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">CV Matcher</h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Sign In</button>
          <button className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-100 rounded">Sign Up</button>
        </div>
      </div>
    </header>
  );
} 