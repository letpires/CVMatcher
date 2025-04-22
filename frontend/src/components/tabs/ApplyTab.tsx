import React from 'react';
import { Send, Edit } from 'lucide-react';
import Button from '../ui/Button';

export default function ApplyTab() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Apply for Job</h3>
      
      <div className="border rounded-lg p-6 mb-6">
        <h4 className="font-medium text-lg mb-4">Application Details</h4>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="your@email.com" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="(123) 456-7890" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
            <div className="border rounded p-4 bg-white">
              <p className="text-sm mb-2">Dear Hiring Manager,</p>
              <p className="text-sm mb-2">
                I am writing to express my interest in the Senior Developer position at Tech Innovators. 
                With over 5 years of experience in React development and cloud technologies, I believe I 
                would be a valuable addition to your team.
              </p>
              <p className="text-sm">
                My experience aligns well with the requirements for this role, particularly in designing 
                scalable architectures and implementing modern frontend technologies. I am excited about 
                the opportunity to contribute to your team's success.
              </p>
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="ghost" icon={Edit} size="sm">Edit cover letter</Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Attachments</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="cv" className="mr-2" checked readOnly />
                <label htmlFor="cv" className="text-sm text-gray-700">Generated CV (Modern template)</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="portfolio" className="mr-2" />
                <label htmlFor="portfolio" className="text-sm text-gray-700">Portfolio / Work Samples</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="certificates" className="mr-2" />
                <label htmlFor="certificates" className="text-sm text-gray-700">Certificates</label>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <h5 className="text-sm font-medium text-blue-900 mb-2">Application Score: 92%</h5>
            <p className="text-xs text-blue-700">
              Your application is well-optimized for this position. The cover letter and CV are tailored 
              to match the job requirements.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline">Save as Draft</Button>
        <Button variant="secondary" icon={Send}>Send Application</Button>
      </div>
    </div>
  );
} 