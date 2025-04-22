import React from 'react';
import { Award, BookOpen } from 'lucide-react';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

export default function GapAnalysisTab() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Skills Gap Analysis</h3>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium flex items-center mb-2">
          <Award size={20} className="mr-2 text-yellow-500" />
          You have 75% of required skills
        </h4>
        <p className="text-sm text-gray-600">Here's what you need to bridge the gap:</p>
      </div>
      
      <div className="space-y-6 mb-8">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Docker & Containerization</h4>
          <div className="flex items-center mb-4">
            <div className="flex-grow mr-4">
              <ProgressBar progress={25} variant="warning" size="md" showLabel />
            </div>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <p className="text-sm text-gray-600 font-medium mb-2">Learning path:</p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <BookOpen size={16} className="mr-2 mt-0.5 text-blue-500" />
                <span>Complete Docker fundamentals course (2 weeks)</span>
              </li>
              <li className="flex items-start">
                <BookOpen size={16} className="mr-2 mt-0.5 text-blue-500" />
                <span>Build a containerized application (1 week)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">GraphQL</h4>
          <div className="flex items-center mb-4">
            <div className="flex-grow mr-4">
              <ProgressBar progress={50} variant="primary" size="md" showLabel />
            </div>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <p className="text-sm text-gray-600 font-medium mb-2">Learning path:</p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <BookOpen size={16} className="mr-2 mt-0.5 text-blue-500" />
                <span>Complete advanced GraphQL tutorials (1 week)</span>
              </li>
              <li className="flex items-start">
                <BookOpen size={16} className="mr-2 mt-0.5 text-blue-500" />
                <span>Implement authentication in GraphQL (1 week)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">AWS Cloud Services</h4>
          <div className="flex items-center mb-4">
            <div className="flex-grow mr-4">
              <ProgressBar progress={60} variant="primary" size="md" showLabel />
            </div>
          </div>
          <div className="bg-gray-50 rounded p-4">
            <p className="text-sm text-gray-600 font-medium mb-2">Learning path:</p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <BookOpen size={16} className="mr-2 mt-0.5 text-blue-500" />
                <span>AWS Solutions Architect course (4 weeks)</span>
              </li>
              <li className="flex items-start">
                <BookOpen size={16} className="mr-2 mt-0.5 text-blue-500" />
                <span>Complete hands-on AWS projects (2 weeks)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline">Download Full Report</Button>
        <Button variant="secondary" icon={BookOpen}>Generate Learning Plan</Button>
      </div>
    </div>
  );
} 