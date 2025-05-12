import React, { useState } from 'react';
import { FileText, Upload, AlertCircle, Download, Check } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import PageHeader from '../components/common/PageHeader';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface AnalysisResult {
  sections: {
    code: string;
    title: string;
    description: string;
    punishment?: string;
  }[];
  summary: string;
  advice: string;
}

const FirAnalyzer: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const [firText, setFirText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyzeFIR = async () => {
    if (!firText.trim()) {
      setError('Please enter the FIR details to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    
    try {
      // In a real app, this would call a backend API or Firebase function
      // For demo, we'll simulate an API call with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis result
      const mockResult: AnalysisResult = {
        sections: [
          {
            code: "IPC 420",
            title: "Cheating and dishonestly inducing delivery of property",
            description: "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, shall be punished with imprisonment and fine.",
            punishment: "Imprisonment up to 7 years and fine"
          },
          {
            code: "IPC 406",
            title: "Criminal breach of trust",
            description: "Whoever commits criminal breach of trust shall be punished with imprisonment and fine.",
            punishment: "Imprisonment up to 3 years, or fine, or both"
          }
        ],
        summary: "The FIR describes a case of cheating where the complainant was induced to transfer money based on false promises. The accused appears to have obtained the money through deception and has not fulfilled the contractual obligations.",
        advice: "Based on the analysis, you should gather all payment receipts, communication records, and contract documents. These will be crucial evidence for your case. Consider filing a formal police complaint if you haven't already done so."
      };
      
      setResult(mockResult);
      
      // Save to Firestore
      if (currentUser) {
        await addDoc(collection(firestore, 'firReports'), {
          userId: currentUser.uid,
          userName: userProfile?.displayName || 'Anonymous',
          firText,
          result: mockResult,
          status: 'completed',
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error analyzing FIR:', error);
      setError('Failed to analyze FIR. Please try again later.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download would be implemented here.');
  };

  return (
    <div className="animate-fade-in min-h-[calc(100vh-64px)]">
      <PageHeader 
        title="FIR Analyzer" 
        description="Upload or enter your FIR details for AI-powered legal analysis"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="card">
            <div className="flex items-center mb-6">
              <FileText className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold text-secondary-900">Enter FIR Details</h2>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="fir-text" className="form-label">
                FIR Content
              </label>
              <textarea
                id="fir-text"
                rows={12}
                className="input resize-none"
                placeholder="Paste or type the content of your FIR here..."
                value={firText}
                onChange={(e) => setFirText(e.target.value)}
                disabled={isAnalyzing}
              ></textarea>
              <p className="text-xs text-secondary-500 mt-1">
                Your data is encrypted and only used for analysis purposes
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                type="button"
                onClick={handleAnalyzeFIR}
                disabled={isAnalyzing || !firText.trim()}
                className="btn-primary w-full sm:w-auto"
              >
                {isAnalyzing ? (
                  <>
                    <LoadingSpinner size="small" color="white" />
                    <span className="ml-2">Analyzing...</span>
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 mr-2" />
                    Analyze FIR
                  </>
                )}
              </button>
              
              <div className="relative w-full sm:w-auto">
                <input
                  type="file"
                  className="sr-only"
                  id="fir-upload"
                  accept=".pdf,.doc,.docx,.txt"
                  disabled={isAnalyzing}
                />
                <label
                  htmlFor="fir-upload"
                  className="btn-secondary w-full sm:w-auto cursor-pointer flex justify-center"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload FIR Document
                </label>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className={`card ${!result && 'flex flex-col items-center justify-center bg-secondary-50 border border-dashed border-secondary-300'}`}>
            {result ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Check className="h-6 w-6 text-green-600 mr-2" />
                    <h2 className="text-xl font-semibold text-secondary-900">Analysis Results</h2>
                  </div>
                  <button
                    onClick={handleDownloadPDF}
                    className="btn-outline"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download PDF
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-secondary-900 mb-2">Summary</h3>
                  <p className="text-secondary-700 bg-secondary-50 p-3 rounded-md border border-secondary-200">
                    {result.summary}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-secondary-900 mb-2">Applicable Sections</h3>
                  <div className="space-y-4">
                    {result.sections.map((section, index) => (
                      <div key={index} className="p-4 rounded-md border border-secondary-200">
                        <h4 className="font-semibold text-primary-700">{section.code}: {section.title}</h4>
                        <p className="text-secondary-600 mt-1 text-sm">{section.description}</p>
                        {section.punishment && (
                          <p className="text-red-600 mt-2 text-sm font-medium">
                            Punishment: {section.punishment}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-secondary-900 mb-2">Legal Advice</h3>
                  <div className="bg-primary-50 p-4 rounded-md border border-primary-200 text-secondary-800">
                    {result.advice}
                  </div>
                </div>
              </>
            ) : (
              <>
                <FileText className="h-16 w-16 text-secondary-400 mb-4" />
                <h3 className="text-lg font-medium text-secondary-700 text-center">Analysis Results</h3>
                <p className="text-secondary-500 text-center max-w-xs mt-2">
                  Enter your FIR details and click "Analyze FIR" to see the results here
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirAnalyzer;