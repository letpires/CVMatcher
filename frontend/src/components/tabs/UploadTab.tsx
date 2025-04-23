'use client';
import React, { useState } from 'react';
import { Briefcase, User, Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useTab } from '../../contexts/TabContext';

interface UploadState {
  text: string;
  file: File | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState = {
  text: '',
  file: null,
  loading: false,
  error: null,
  success: false,
};

export default function UploadTab() {
  const { setActiveTab } = useTab();
  const [jobListing, setJobListing] = useState<UploadState>({ ...initialState });
  const [cv, setCv] = useState<UploadState>({ ...initialState });

  const handleTextChange = (type: 'job' | 'cv', value: string) => {
    const setState = type === 'job' ? setJobListing : setCv;
    setState(prev => ({ ...prev, text: value, error: null }));
  };

  const handleFileUpload = (type: 'job' | 'cv', file: File | null) => {
    if (!file) return;

    const setState = type === 'job' ? setJobListing : setCv;
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      setState(prev => ({ 
        ...prev, 
        error: 'Please upload a PDF or Word document',
        file: null 
      }));
      return;
    }

    setState(prev => ({ 
      ...prev, 
      file,
      error: null 
    }));
  };

  const handleSubmit = async (type: 'job' | 'cv') => {
    const state = type === 'job' ? jobListing : cv;
    const setState = type === 'job' ? setJobListing : setCv;

    if (!state.text && !state.file) {
      setState(prev => ({ 
        ...prev, 
        error: 'Please provide either text or upload a file' 
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Create FormData for file upload
      const formData = new FormData();
      if (state.file) {
        formData.append('file', state.file);
      }
      if (state.text) {
        formData.append('text', state.text);
      }

      console.log(`Sending ${type} upload request to server...`);
      
      const response = await fetch(`/api/${type === 'job' ? 'job-listing' : 'cv'}`, {
        method: 'POST',
        body: formData,
      });

      console.log(`Server response status:`, response.status);
      console.log(`Server response headers:`, Object.fromEntries(response.headers.entries()));

      // Try to parse as JSON first
      let responseData;
      let responseText;
      
      try {
        // First get the response as text
        responseText = await response.text();
        console.log('Raw response text:', responseText);

        // Then try to parse it as JSON if it's not empty
        if (responseText) {
          responseData = JSON.parse(responseText);
          console.log('Parsed JSON response:', responseData);
        } else {
          throw new Error('Empty response from server');
        }
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error(`Server response was not valid JSON: ${responseText}`);
      }

      if (!response.ok) {
        throw new Error(responseData?.error || `Upload failed with status ${response.status}`);
      }

      console.log(`Upload successful:`, responseData);

      setState(prev => ({ ...prev, loading: false, success: true }));

      // If both job listing and CV are uploaded successfully, move to next tab
      if (
        (type === 'job' && cv.success) || 
        (type === 'cv' && jobListing.success)
      ) {
        setTimeout(() => {
          setActiveTab('match');
        }, 1500);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Upload failed. Please try again.' 
      }));
    }
  };

  const renderUploadSection = (
    type: 'job' | 'cv',
    state: UploadState,
    icon: React.ReactNode,
    title: string,
    placeholder: string
  ) => (
    <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
      ${state.error ? 'border-red-300 bg-red-50' : 
        state.success ? 'border-green-300 bg-green-50' :
        'border-gray-300 hover:border-blue-500'}`}
    >
      <div className="mb-4">
        {state.success ? (
          <CheckCircle size={48} className="mx-auto text-green-500" />
        ) : (
          icon
        )}
      </div>
      
      <h3 className="text-xl font-semibold mb-4">
        {state.success ? 'Successfully Uploaded!' : title}
      </h3>

      {!state.success && (
        <>
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:border-blue-400 mb-4"
            placeholder={placeholder}
            value={state.text}
            onChange={(e) => handleTextChange(type, e.target.value)}
            disabled={state.loading}
          />

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Or upload a file (PDF, DOC, DOCX)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(type, e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              disabled={state.loading}
            />
          </div>

          {state.error && (
            <div className="flex items-center justify-center text-red-500 mb-4">
              <AlertCircle size={16} className="mr-2" />
              <span className="text-sm">{state.error}</span>
            </div>
          )}

          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            onClick={() => handleSubmit(type)}
            disabled={state.loading || (!state.text && !state.file)}
          >
            {state.loading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={16} className="mr-2" />
                Upload
              </>
            )}
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderUploadSection(
          'job',
          jobListing,
          <Briefcase size={48} className="mx-auto text-gray-400" />,
          'Upload Job Listing',
          'Paste job description here...'
        )}
        {renderUploadSection(
          'cv',
          cv,
          <User size={48} className="mx-auto text-gray-400" />,
          'Upload Your CV',
          'Paste your CV here...'
        )}
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Upload both your CV and the job listing to proceed to the next step.</p>
        <p>Supported formats: PDF, DOC, DOCX</p>
      </div>
    </div>
  );
}