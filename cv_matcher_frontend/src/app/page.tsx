'use client';
import React, { useState } from 'react';
import { Search, Upload, FileText, Briefcase, Award, MessageSquare, Send, User, CheckCircle, PlusCircle, Database, GitBranch } from 'lucide-react';

export default function CVMatcherLandingPage() {
  const [activeTab, setActiveTab] = useState('upload');
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CV Matcher</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded">Sign In</button>
            <button className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-100 rounded">Sign Up</button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {/* Hero Section */}
        <section className="text-center py-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Match Your CV to Your Dream Job</h2>
          <p className="text-xl text-gray-600 mb-8">Upload a job listing and your CV to get a tailored application that maximizes your chances.</p>
          <div className="flex justify-center">
            <button 
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
              onClick={() => setActiveTab('upload')}
            >
              <PlusCircle className="mr-2" size={20} />
              Start New Application
            </button>
          </div>
        </section>
        
        {/* Process Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <button 
              className={`flex-1 py-4 px-4 text-center flex flex-col items-center ${activeTab === 'upload' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('upload')}
            >
              <Upload size={24} className="mb-2" />
              <span>Upload</span>
            </button>
            <button 
              className={`flex-1 py-4 px-4 text-center flex flex-col items-center ${activeTab === 'match' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('match')}
            >
              <Search size={24} className="mb-2" />
              <span>Match</span>
            </button>
            <button 
              className={`flex-1 py-4 px-4 text-center flex flex-col items-center ${activeTab === 'generate' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('generate')}
            >
              <FileText size={24} className="mb-2" />
              <span>Generate CV</span>
            </button>
            <button 
              className={`flex-1 py-4 px-4 text-center flex flex-col items-center ${activeTab === 'gap' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('gap')}
            >
              <GitBranch size={24} className="mb-2" />
              <span>Gap Analysis</span>
            </button>
            <button 
              className={`flex-1 py-4 px-4 text-center flex flex-col items-center ${activeTab === 'interview' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('interview')}
            >
              <MessageSquare size={24} className="mb-2" />
              <span>Interview Prep</span>
            </button>
            <button 
              className={`flex-1 py-4 px-4 text-center flex flex-col items-center ${activeTab === 'apply' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('apply')}
            >
              <Send size={24} className="mb-2" />
              <span>Apply</span>
            </button>
            <button 
              className={`flex-1 py-4 px-4 text-center flex flex-col items-center ${activeTab === 'track' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('track')}
            >
              <Database size={24} className="mb-2" />
              <span>Track</span>
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'upload' && (
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
            )}
            
            {activeTab === 'match' && (
              <div className="text-center py-12">
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
                  <Search size={48} className="text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Matching in Progress</h3>
                <p className="text-gray-500 mb-6">Our AI is analyzing your CV against the job requirements</p>
                <div className="w-full max-w-md mx-auto h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-3/4"></div>
                </div>
                <p className="mt-2 text-sm text-gray-500">This will take a few moments</p>
              </div>
            )}
            
            {activeTab === 'generate' && (
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
                      <p className="text-sm">Experienced software developer with a strong background in React, Node.js, and cloud technologies, matching 85% of the required skills for this position.</p>
                    </div>
                    <div className="mb-4">
                      <h5 className="font-semibold">Experience</h5>
                      <div className="text-sm">
                        <p className="font-medium">Lead Developer - Tech Solutions</p>
                        <p className="text-gray-600">2020 - Present</p>
                        <ul className="list-disc pl-5 mt-1">
                          <li>Led development of React-based applications</li>
                          <li>Implemented cloud-based architecture solutions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">Edit</button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Download</button>
                  </div>
                </div>
                <div className="flex-1 border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Template Options</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border-2 border-blue-500 p-2 rounded">
                      <div className="h-20 bg-blue-100 mb-2 rounded flex items-center justify-center">
                        <span className="text-sm text-blue-500">Modern</span>
                      </div>
                    </div>
                    <div className="border p-2 rounded">
                      <div className="h-20 bg-gray-100 mb-2 rounded flex items-center justify-center">
                        <span className="text-sm text-gray-500">Classic</span>
                      </div>
                    </div>
                    <div className="border p-2 rounded">
                      <div className="h-20 bg-gray-100 mb-2 rounded flex items-center justify-center">
                        <span className="text-sm text-gray-500">Minimal</span>
                      </div>
                    </div>
                    <div className="border p-2 rounded">
                      <div className="h-20 bg-gray-100 mb-2 rounded flex items-center justify-center">
                        <span className="text-sm text-gray-500">Creative</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'gap' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Skills Gap Analysis</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium flex items-center mb-2">
                    <Award size={20} className="mr-2 text-yellow-500" />
                    You have 75% of required skills
                  </h4>
                  <p className="text-sm text-gray-600">Here's what you need to bridge the gap:</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Docker & Containerization</h4>
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-gray-200 h-2 rounded-full mr-2">
                        <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
                      </div>
                      <span className="text-sm text-gray-500">25%</span>
                    </div>
                    <p className="text-sm text-gray-600">Learning path:</p>
                    <ul className="text-sm list-disc pl-5 mt-1">
                      <li>Complete Docker fundamentals course (2 weeks)</li>
                      <li>Build a containerized application (1 week)</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">GraphQL</h4>
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-gray-200 h-2 rounded-full mr-2">
                        <div className="bg-blue-500 h-2 rounded-full w-1/2"></div>
                      </div>
                      <span className="text-sm text-gray-500">50%</span>
                    </div>
                    <p className="text-sm text-gray-600">Learning path:</p>
                    <ul className="text-sm list-disc pl-5 mt-1">
                      <li>Complete advanced GraphQL tutorials (1 week)</li>
                      <li>Implement authentication in GraphQL (1 week)</li>
                    </ul>
                  </div>
                </div>
                
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Generate Complete Learning Plan
                </button>
              </div>
            )}
            
            {activeTab === 'interview' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Interview Preparation</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600">
                    Based on the job requirements, here are likely interview questions and suggested answers.
                  </p>
                </div>
                
                <div className="space-y-6 mb-6">
                  <div className="border-b pb-4">
                    <h4 className="font-medium mb-2">Tell me about your experience with React development?</h4>
                    <p className="text-sm text-gray-600 mb-2">Suggested answer:</p>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      I've worked with React for over 5 years, building enterprise applications with complex state management. In my current role at Tech Solutions, I led the development of a customer portal that serves over 10,000 daily users. I'm particularly skilled in performance optimization and component architecture.
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-medium mb-2">How would you handle state management in a large React application?</h4>
                    <p className="text-sm text-gray-600 mb-2">Suggested answer:</p>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      For large applications, I prefer a combination of Redux for global state and React's Context API for component-specific state. This provides a good balance between performance and developer experience. I also implement custom hooks to encapsulate complex logic.
                    </div>
                  </div>
                </div>
                
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Generate More Questions
                </button>
              </div>
            )}
            
            {activeTab === 'apply' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Apply for Job</h3>
                
                <div className="border rounded-lg p-6 mb-6">
                  <h4 className="font-medium text-lg mb-4">Application Details</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" className="w-full p-2 border rounded" placeholder="your@email.com" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                      <div className="border rounded p-3 bg-white">
                        <p className="text-sm mb-2">Dear Hiring Manager,</p>
                        <p className="text-sm mb-2">
                          I am writing to express my interest in the Senior Developer position at Tech Innovators. With over 5 years of experience in React development and cloud technologies, I believe I would be a valuable addition to your team.
                        </p>
                        <p className="text-sm">
                          My experience aligns well with the requirements for this role, particularly in designing scalable architectures and implementing modern frontend technologies.
                        </p>
                      </div>
                      <div className="flex justify-end mt-2">
                        <button className="text-blue-500 text-sm">Edit cover letter</button>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input type="checkbox" id="attachment" className="mr-2" />
                      <label htmlFor="attachment" className="text-sm text-gray-700">Attach generated CV (Modern template)</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                    Save as Draft
                  </button>
                  <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center">
                    <Send size={16} className="mr-2" />
                    Send Application
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'track' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Application Tracking</h3>
                
                <div className="border rounded-lg overflow-hidden">
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
                          <button className="text-blue-500 hover:text-blue-700">View</button>
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
                          <button className="text-blue-500 hover:text-blue-700">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Job Search Analytics</h4>
                  <div className="grid grid-cols-3 gap-4">
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
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">CV Matcher</h3>
              <p className="text-gray-400">Match, prepare, and apply with confidence</p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h4 className="font-medium mb-2">Product</h4>
                <ul className="text-sm text-gray-400">
                  <li className="mb-1">Features</li>
                  <li className="mb-1">Pricing</li>
                  <li className="mb-1">FAQ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Company</h4>
                <ul className="text-sm text-gray-400">
                  <li className="mb-1">About Us</li>
                  <li className="mb-1">Contact</li>
                  <li className="mb-1">Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
            © 2025 CV Matcher. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}