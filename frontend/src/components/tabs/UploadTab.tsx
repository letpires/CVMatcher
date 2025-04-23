import React from 'react';
import { Briefcase, User } from 'lucide-react';

export default function UploadTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer">
        <Briefcase size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-gray-500 text-xl font-semibold mb-2">Upload Job Listing</h3>
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:border-blue-400"
          placeholder="Paste job description here..."
          style={{ color: "#666" }}
        />
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer">
        <User size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-gray-500 text-xl font-semibold mb-2">Upload Your CV</h3>
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:border-blue-400"
          placeholder="Paste your CV here..."
          style={{ color: "#666" }}
        />
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </div>
    </div>
  );
}