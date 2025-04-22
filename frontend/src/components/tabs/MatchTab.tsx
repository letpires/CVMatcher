import React from 'react';
import { Search } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

export default function MatchTab() {
  return (
    <div className="text-center py-12">
      <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
        <Search size={48} className="text-blue-500" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">Matching in Progress</h3>
      <p className="text-gray-500 mb-6">Our AI is analyzing your CV against the job requirements</p>
      <div className="w-full max-w-md mx-auto mb-4">
        <ProgressBar progress={75} variant="primary" size="md" showLabel />
      </div>
      <p className="mt-2 text-sm text-gray-500">This will take a few moments</p>
      
      <div className="mt-8 text-left">
        <h4 className="text-lg font-semibold mb-4">Initial Results</h4>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="font-medium text-green-800">Strong Matches</div>
            <ul className="mt-2 space-y-1">
              <li className="text-sm text-green-700">• React Development (5 years experience)</li>
              <li className="text-sm text-green-700">• Frontend Architecture</li>
              <li className="text-sm text-green-700">• UI/UX Implementation</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="font-medium text-yellow-800">Partial Matches</div>
            <ul className="mt-2 space-y-1">
              <li className="text-sm text-yellow-700">• Cloud Services (AWS preferred, you have Azure)</li>
              <li className="text-sm text-yellow-700">• CI/CD Experience (Some exposure)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 