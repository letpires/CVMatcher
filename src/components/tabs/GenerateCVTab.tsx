import React from 'react';
import { FileText, Download, Edit } from 'lucide-react';
import Button from '../ui/Button';

export default function GenerateCVTab() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 border rounded-lg p-4 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FileText size={20} className="mr-2 text-blue-500" />
          Generated CV
        </h3>
        <div className="p-4 bg-white border rounded-md h-96 overflow-y-auto">
          <h4 className="text-xl font-bold mb-2">John Doe</h4>
          <p className="text-gray-600 mb-4">Senior Software Developer</p>
          <div className="mb-4">
            <h5 className="font-semibold">Summary</h5>
            <p className="text-sm">
              Experienced software developer with a strong background in React, Node.js, and cloud technologies,
              matching 85% of the required skills for this position.
            </p>
          </div>
          <div className="mb-4">
            <h5 className="font-semibold">Experience</h5>
            <div className="text-sm">
              <p className="font-medium">Lead Developer - Tech Solutions</p>
              <p className="text-gray-600">2020 - Present</p>
              <ul className="list-disc pl-5 mt-1">
                <li>Led development of React-based applications</li>
                <li>Implemented cloud-based architecture solutions</li>
                <li>Managed team of 5 developers</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outline" icon={Edit}>Edit</Button>
          <Button variant="primary" icon={Download}>Download</Button>
        </div>
      </div>

      <div className="flex-1 border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Template Options</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 border-blue-500 p-3 rounded cursor-pointer">
            <div className="h-32 bg-blue-100 mb-2 rounded flex items-center justify-center">
              <span className="text-sm text-blue-500">Modern</span>
            </div>
            <p className="text-xs text-gray-500 text-center">Clean and contemporary design</p>
          </div>
          <div className="border p-3 rounded cursor-pointer hover:border-blue-500">
            <div className="h-32 bg-gray-100 mb-2 rounded flex items-center justify-center">
              <span className="text-sm text-gray-500">Classic</span>
            </div>
            <p className="text-xs text-gray-500 text-center">Traditional and professional</p>
          </div>
          <div className="border p-3 rounded cursor-pointer hover:border-blue-500">
            <div className="h-32 bg-gray-100 mb-2 rounded flex items-center justify-center">
              <span className="text-sm text-gray-500">Minimal</span>
            </div>
            <p className="text-xs text-gray-500 text-center">Simple and focused</p>
          </div>
          <div className="border p-3 rounded cursor-pointer hover:border-blue-500">
            <div className="h-32 bg-gray-100 mb-2 rounded flex items-center justify-center">
              <span className="text-sm text-gray-500">Creative</span>
            </div>
            <p className="text-xs text-gray-500 text-center">Bold and distinctive</p>
          </div>
        </div>
      </div>
    </div>
  );
} 