import React from 'react';
import { Upload, Search, FileText, GitBranch, MessageSquare, Send, Database } from 'lucide-react';

const tabItems = [
  { id: 'upload', icon: Upload, label: 'Upload' },
  { id: 'match', icon: Search, label: 'Match' },
  { id: 'generate', icon: FileText, label: 'Generate CV' },
  { id: 'gap', icon: GitBranch, label: 'Gap Analysis' },
  { id: 'interview', icon: MessageSquare, label: 'Interview Prep' },
  { id: 'apply', icon: Send, label: 'Apply' },
  { id: 'track', icon: Database, label: 'Track' }
];

type TabNavigationProps = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex border-b">
      {tabItems.map((tab) => {
        const Icon = tab.icon;
        return (
          <button 
            key={tab.id}
            className={`flex-1 py-4 px-4 text-center flex flex-col items-center ${
              activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={24} className="mb-2" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
} 