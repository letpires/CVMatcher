'use client';
import React from 'react';
import { PlusCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TabNavigation from '../components/ui/TabNavigation';
import UploadTab from '../components/tabs/UploadTab';
import MatchTab from '../components/tabs/MatchTab';
import GenerateCVTab from '../components/tabs/GenerateCVTab';
import GapAnalysisTab from '../components/tabs/GapAnalysisTab';
import InterviewPrepTab from '../components/tabs/InterviewPrepTab';
import ApplyTab from '../components/tabs/ApplyTab';
import TrackTab from '../components/tabs/TrackTab';
import { useTab } from '../contexts/TabContext';

export default function CVMatcherPage() {
  const { activeTab, setActiveTab } = useTab();
  
  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'upload':
        return <UploadTab />;
      case 'match':
        return <MatchTab />;
      case 'generate':
        return <GenerateCVTab />;
      case 'gap':
        return <GapAnalysisTab />;
      case 'interview':
        return <InterviewPrepTab />;
      case 'apply':
        return <ApplyTab />;
      case 'track':
        return <TrackTab />;
      default:
        return <UploadTab />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
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
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          
          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 