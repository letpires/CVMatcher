import React from 'react';
import { CheckCircle, Eye, ChartBar } from 'lucide-react';
import Button from '../ui/Button';

export default function TrackTab() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Application Tracking</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border rounded-lg p-4 bg-blue-50">
          <div className="text-3xl font-bold text-blue-600 mb-1">5</div>
          <div className="text-sm text-gray-500">Total Applications</div>
        </div>
        <div className="border rounded-lg p-4 bg-green-50">
          <div className="text-3xl font-bold text-green-600 mb-1">2</div>
          <div className="text-sm text-gray-500">Interviews Scheduled</div>
        </div>
        <div className="border rounded-lg p-4 bg-purple-50">
          <div className="text-3xl font-bold text-purple-600 mb-1">82%</div>
          <div className="text-sm text-gray-500">Average Match Score</div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mb-6">
        <div className="bg-gray-50 p-4 border-b">
          <h4 className="font-medium flex items-center">
            <ChartBar size={20} className="mr-2 text-blue-500" />
            Application Status
          </h4>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Job Title</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Company</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Applied Date</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Match %</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr className="bg-white">
              <td className="px-4 py-3">Senior React Developer</td>
              <td className="px-4 py-3">Tech Innovators</td>
              <td className="px-4 py-3">Apr 20, 2025</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  <CheckCircle size={12} className="mr-1" />
                  Applied
                </span>
              </td>
              <td className="px-4 py-3">85%</td>
              <td className="px-4 py-3">
                <Button variant="ghost" icon={Eye} size="sm">View</Button>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3">Frontend Team Lead</td>
              <td className="px-4 py-3">Digital Solutions</td>
              <td className="px-4 py-3">Apr 15, 2025</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  In Review
                </span>
              </td>
              <td className="px-4 py-3">78%</td>
              <td className="px-4 py-3">
                <Button variant="ghost" icon={Eye} size="sm">View</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 border rounded-lg p-4">
        <h4 className="font-medium mb-3 flex items-center">
          <ChartBar size={20} className="mr-2 text-blue-500" />
          Application Insights
        </h4>
        <div className="text-sm text-gray-600">
          <ul className="space-y-2">
            <li>• Your applications have an above-average response rate of 40%</li>
            <li>• Technical roles at mid-sized companies show the highest match rates</li>
            <li>• Applications sent on Tuesdays and Wednesdays receive faster responses</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 