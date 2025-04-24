'use client';
import React, { useState, useEffect } from 'react';
import { FileText, Download, Edit, Loader2, Github, Linkedin, FileDown, History, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

interface GeneratedCV {
  analysis: string;
  tailored_resume: string;
  recommendations: string;
  ipfs_hash: string;
  version_history: any[];
  timestamp?: string; // Add timestamp for history
}

interface StoredCV extends GeneratedCV {
  id: string;
  timestamp: string;
}

export default function GenerateCVTab() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCV, setGeneratedCV] = useState<GeneratedCV | null>(null);
  const [githubUsername, setGithubUsername] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [activeSection, setActiveSection] = useState<'cv' | 'analysis' | 'recommendations'>('cv');
  const [pdfLoading, setPdfLoading] = useState(false);
  const [cvHistory, setCVHistory] = useState<StoredCV[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Load CV history from backend on component mount
  useEffect(() => {
    fetchCVHistory();
  }, []);

  const fetchCVHistory = async () => {
    try {
      setLoadingHistory(true);
      const response = await fetch('http://localhost:5001/api/cv-history');
      if (!response.ok) {
        throw new Error('Failed to fetch CV history');
      }
      const result = await response.json();
      setCVHistory(result.history.map((entry: any) => ({
        ...entry.data,
        id: entry.id,
        timestamp: new Date(entry.timestamp).toLocaleString()
      })));
    } catch (err) {
      console.error('Error fetching CV history:', err);
      setError('Failed to load CV history');
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadFromHistory = (storedCV: StoredCV) => {
    setGeneratedCV(storedCV);
    setIsHistoryOpen(false);
  };

  const generateCV = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:5001/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          github_username: githubUsername || undefined,
          linkedin_url: linkedinUrl || undefined,
          use_sample_data: false
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || `HTTP error! status: ${response.status}`;
        
        if (errorMessage.includes('No CV found')) {
          throw new Error('Please upload your CV first in the Upload CV tab');
        } else if (errorMessage.includes('No job listing found')) {
          throw new Error('Please upload a job listing first in the Job Listing tab');
        } else {
          throw new Error(errorMessage);
        }
      }

      const result = await response.json();
      console.log('API Response:', result);

      if (result.error) {
        throw new Error(result.error);
      }

      setGeneratedCV(result.data);
      // Refresh history after generating new CV
      fetchCVHistory();
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while generating the CV');
    } finally {
      setLoading(false);
    }
  };

  const downloadCV = () => {
    if (!generatedCV) return;

    const blob = new Blob([generatedCV.tailored_resume], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailored_cv.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const downloadPDF = async () => {
    const content = document.getElementById('cv-content');
    if (!content) return;

    try {
      setPdfLoading(true);
      // Dynamically import html2pdf.js
      const html2pdf = (await import('html2pdf.js')).default;

      // Create a clone of the content to modify for PDF
      const pdfContent = content.cloneNode(true) as HTMLElement;
      
      // Replace any remaining Tailwind classes with direct styles
      const elements = pdfContent.getElementsByTagName('*');
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement;
        if (el.classList.contains('text-gray-600')) {
          el.style.color = '#4B5563';
        }
        if (el.classList.contains('text-gray-700')) {
          el.style.color = '#374151';
        }
        if (el.classList.contains('text-gray-800')) {
          el.style.color = '#1F2937';
        }
      }

      const opt = {
        margin: 0.5,
        filename: 'tailored_cv.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: true,
          backgroundColor: '#ffffff'
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait',
          putOnlyUsedFonts: true
        }
      };

      await html2pdf().set(opt).from(pdfContent).save();
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  };

  const formatCV = (content: string) => {
    const sections = content.split('\n\n');
    return sections.map((section, index) => {
      const lines = section.trim().split('\n');
      const isHeader = index === 0;
      
      if (isHeader) {
        return (
          <div key={index} className="text-center mb-8 bg-[#f0f7ff] p-8 rounded-t-lg" style={{ backgroundColor: '#f0f7ff' }}>
            {lines.map((line, i) => (
              <div 
                key={i} 
                className={i === 0 
                  ? "text-3xl font-bold mb-3" 
                  : "text-lg"}
                style={{ 
                  color: i === 0 ? '#1e40af' : '#4B5563',
                  marginBottom: i === 0 ? '0.75rem' : '0.25rem'
                }}
              >
                {line}
              </div>
            ))}
          </div>
        );
      }

      const [title, ...content] = lines;
      return (
        <div key={index} className="mb-8">
          {title && (
            <h2 
              className="text-lg font-semibold pb-2 mb-4" 
              style={{ 
                color: '#1d4ed8',
                borderBottom: '2px solid #bfdbfe'
              }}
            >
              {title}
            </h2>
          )}
          <div className="pl-4">
            {content.map((line, i) => (
              <div 
                key={i} 
                className={line.startsWith('-') ? "ml-4 mb-3 flex items-start" : "mb-3 font-medium"}
                style={{ 
                  color: line.startsWith('-') ? '#374151' : '#1F2937'
                }}
              >
                {line.startsWith('-') ? (
                  <>
                    <span style={{ color: '#3b82f6', marginRight: '0.5rem', marginTop: '0.25rem' }}>•</span>
                    <span>{line.substring(1).trim()}</span>
                  </>
                ) : line}
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Social Links Input */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Username (Optional)
          </label>
          <div className="relative">
            <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter GitHub username"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn URL (Optional)
          </label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter LinkedIn profile URL"
            />
          </div>
        </div>
      </div>

      {/* History Dropdown and Generate Button */}
      <div className="flex justify-between items-center">
        <div className="relative">
          <button
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50"
            disabled={loadingHistory}
          >
            {loadingHistory ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading History...
              </>
            ) : (
              <>
                <History size={20} />
                Previous Versions
                <ChevronDown size={16} className={`transform transition-transform ${isHistoryOpen ? 'rotate-180' : ''}`} />
              </>
            )}
          </button>
          
          {isHistoryOpen && cvHistory.length > 0 && (
            <div className="absolute z-10 w-64 mt-2 bg-white border rounded-md shadow-lg">
              <div className="py-1">
                {cvHistory.map((cv) => (
                  <button
                    key={cv.id}
                    onClick={() => loadFromHistory(cv)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    <div className="font-medium">Generated CV</div>
                    <div className="text-xs text-gray-500">{cv.timestamp}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          variant="primary"
          onClick={generateCV}
          disabled={loading}
          className="w-full md:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Generate New CV
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {generatedCV && (
        <div className="border rounded-lg shadow-sm bg-white">
          {/* Navigation Tabs with enhanced styling */}
          <div className="flex border-b bg-gray-50">
            <button
              className={`flex-1 px-4 py-3 text-center transition-colors ${
                activeSection === 'cv'
                  ? 'border-b-2 border-[#3b82f6] text-[#1d4ed8] bg-white'
                  : 'text-gray-600 hover:text-[#3b82f6] hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection('cv')}
            >
              Generated CV
            </button>
            <button
              className={`flex-1 px-4 py-3 text-center transition-colors ${
                activeSection === 'analysis'
                  ? 'border-b-2 border-[#3b82f6] text-[#1d4ed8] bg-white'
                  : 'text-gray-600 hover:text-[#3b82f6] hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection('analysis')}
            >
              Analysis
            </button>
            <button
              className={`flex-1 px-4 py-3 text-center transition-colors ${
                activeSection === 'recommendations'
                  ? 'border-b-2 border-[#3b82f6] text-[#1d4ed8] bg-white'
                  : 'text-gray-600 hover:text-[#3b82f6] hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection('recommendations')}
            >
              Recommendations
            </button>
          </div>

          {/* Content with enhanced styling */}
          <div className="p-6">
            {activeSection === 'cv' && (
              <div>
                <div id="cv-content" className="prose max-w-none bg-white rounded-lg shadow-inner">
                  {formatCV(generatedCV.tailored_resume)}
                </div>
                <div className="flex justify-end mt-6 space-x-3">
                  <Button 
                    variant="outline" 
                    icon={Edit}
                    className="border-[#bfdbfe] text-[#2563eb] hover:bg-[#eff6ff]"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    icon={FileDown} 
                    onClick={downloadCV}
                    className="border-[#bfdbfe] text-[#2563eb] hover:bg-[#eff6ff]"
                  >
                    Download TXT
                  </Button>
                  <Button 
                    variant="primary" 
                    icon={Download} 
                    onClick={downloadPDF}
                    disabled={pdfLoading}
                    className="bg-[#2563eb] hover:bg-[#1d4ed8]"
                  >
                    {pdfLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      'Download PDF'
                    )}
                  </Button>
                </div>
              </div>
            )}
            {activeSection === 'analysis' && (
              <div className="prose max-w-none">
                <div className="bg-white p-6 rounded-lg space-y-6">
                  {generatedCV.analysis.split('\n\n').map((section, sectionIndex) => {
                    const lines = section.split('\n');
                    return (
                      <div key={sectionIndex} className="bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0]">
                        {lines.map((line, i) => {
                          if (line.includes(':')) {
                            const [title, content] = line.split(':');
                            return (
                              <div key={i} className="mb-3">
                                <h3 className="text-[#1e40af] font-semibold text-lg mb-2">{title}:</h3>
                                <p className="text-gray-700 ml-4">{content.trim()}</p>
                              </div>
                            );
                          }
                          return (
                            <p key={i} className="text-gray-700 mb-2">{line}</p>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {activeSection === 'recommendations' && (
              <div className="prose max-w-none">
                <div className="bg-white p-6 rounded-lg">
                  {generatedCV.recommendations.split('\n\n').map((section, sectionIndex) => {
                    const lines = section.split('\n');
                    return (
                      <div key={sectionIndex} className="mb-6 last:mb-0">
                        {lines.map((line, i) => {
                          if (line.match(/^\d\./)) {
                            return (
                              <div key={i} className="bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0] mb-4">
                                <h3 className="text-[#1e40af] font-semibold text-lg mb-2">{line}</h3>
                              </div>
                            );
                          }
                          return (
                            <p key={i} className="text-gray-700 ml-4 mb-2">{line}</p>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 