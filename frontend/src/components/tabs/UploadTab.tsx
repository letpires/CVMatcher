import React from 'react';
import { Briefcase, User } from 'lucide-react';

export default function UploadTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer">
        <Briefcase size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2">Upload Job Listing</h3>
        <p className="text-gray-500 mb-4">Paste job URL or description</p>
        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">Browse Jobs</button>
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer">
        <User size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2">Upload Your CV</h3>
        <p className="text-gray-500 mb-4">Or link your LinkedIn profile</p>
        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">Upload CV</button>
      </div>
    </div>
  );
} 