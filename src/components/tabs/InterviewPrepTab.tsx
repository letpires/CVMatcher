import React from 'react';
import { MessageSquare, Plus, ThumbsUp, Lightbulb } from 'lucide-react';
import Button from '../ui/Button';

export default function InterviewPrepTab() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Interview Preparation</h3>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Lightbulb size={24} className="text-blue-500 mr-3 mt-1" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">AI-Powered Interview Prep</h4>
            <p className="text-sm text-gray-600">
              Based on the job requirements and your CV, here are likely interview questions and suggested answers.
              Practice these to improve your chances of success.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6 mb-6">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <h4 className="font-medium">Technical Questions</h4>
          </div>
          
          <div className="divide-y">
            <div className="p-4">
              <h5 className="font-medium mb-2">Tell me about your experience with React development?</h5>
              <p className="text-sm text-gray-600 mb-2">Suggested answer:</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                I've worked with React for over 5 years, building enterprise applications with complex state management. 
                In my current role at Tech Solutions, I led the development of a customer portal that serves over 10,000 
                daily users. I'm particularly skilled in performance optimization and component architecture.
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <ThumbsUp size={14} className="mr-1" />
                  This answer demonstrates both breadth and depth of experience
                </div>
              </div>
            </div>

            <div className="p-4">
              <h5 className="font-medium mb-2">How would you handle state management in a large React application?</h5>
              <p className="text-sm text-gray-600 mb-2">Suggested answer:</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                For large applications, I prefer a combination of Redux for global state and React's Context API for 
                component-specific state. This provides a good balance between performance and developer experience. 
                I also implement custom hooks to encapsulate complex logic and make it reusable across the application.
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <ThumbsUp size={14} className="mr-1" />
                  Shows understanding of different state management approaches
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <h4 className="font-medium">Behavioral Questions</h4>
          </div>
          
          <div className="divide-y">
            <div className="p-4">
              <h5 className="font-medium mb-2">Describe a challenging project you led and how you handled it.</h5>
              <p className="text-sm text-gray-600 mb-2">Suggested answer:</p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                I led a project to migrate our legacy monolithic application to a microservices architecture. 
                The main challenge was ensuring zero downtime during the transition. I developed a detailed migration 
                strategy, implemented feature flags for gradual rollout, and coordinated with multiple teams. 
                The project was completed ahead of schedule with minimal disruption to users.
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <ThumbsUp size={14} className="mr-1" />
                  Demonstrates leadership, technical skills, and problem-solving
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Button variant="outline" icon={MessageSquare}>Start Mock Interview</Button>
        <Button variant="primary" icon={Plus}>Generate More Questions</Button>
      </div>
    </div>
  );
} 