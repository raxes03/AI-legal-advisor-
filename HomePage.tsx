import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, MessageSquare, Calendar, Scale } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { currentUser, userProfile } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-6">
                AI-Powered Legal Assistance at Your Fingertips
              </h1>
              <p className="text-lg md:text-xl text-primary-100 mb-8">
                Simplify legal processes with FIR analysis, AI legal assistance, and easy lawyer scheduling.
              </p>
              <div className="flex flex-wrap gap-4">
                {currentUser ? (
                  <Link to="/fir-analyzer" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
                    Analyze FIR
                  </Link>
                ) : (
                  <Link to="/register" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
                    Get Started
                  </Link>
                )}
                <Link to="/legal-helpdesk" className="btn-outline border-white text-white hover:bg-primary-700">
                  Ask Legal Questions
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Legal assistance with AI" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900">How The Legal AI Helps You</h2>
            <p className="mt-4 text-lg text-secondary-600 max-w-3xl mx-auto">
              Our AI-powered platform simplifies legal processes and makes justice more accessible for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* FIR Analysis */}
            <div className="card hover:shadow-elevated transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <FileText className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 text-center mb-2">FIR Analysis</h3>
              <p className="text-secondary-600 text-center mb-6">
                Upload your FIR and get an instant AI analysis with relevant IPC/CRPC sections and legal advice.
              </p>
              <Link to="/fir-analyzer" className="btn-outline w-full justify-center">
                Try FIR Analyzer
              </Link>
            </div>

            {/* Legal Helpdesk */}
            <div className="card hover:shadow-elevated transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <MessageSquare className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 text-center mb-2">Legal Helpdesk</h3>
              <p className="text-secondary-600 text-center mb-6">
                Get instant answers to your legal questions from our AI chatbot trained on Indian legal frameworks.
              </p>
              <Link to="/legal-helpdesk" className="btn-outline w-full justify-center">
                Ask Legal Questions
              </Link>
            </div>

            {/* Lawyer Scheduling */}
            <div className="card hover:shadow-elevated transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <Calendar className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 text-center mb-2">Lawyer Scheduling</h3>
              <p className="text-secondary-600 text-center mb-6">
                Book consultations with experienced lawyers specialized in your specific legal needs.
              </p>
              <Link to="/schedule-lawyer" className="btn-outline w-full justify-center">
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900">What Our Users Say</h2>
            <p className="mt-4 text-lg text-secondary-600 max-w-3xl mx-auto">
              The Legal AI has helped thousands of citizens navigate the legal system with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold text-lg">
                  RK
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Rahul Kumar</h4>
                  <p className="text-secondary-500">Delhi</p>
                </div>
              </div>
              <p className="text-secondary-600 italic">
                "The FIR analysis tool saved me hours of confusion and worry. It quickly identified the relevant sections and explained my rights clearly."
              </p>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold text-lg">
                  PS
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Priya Singh</h4>
                  <p className="text-secondary-500">Mumbai</p>
                </div>
              </div>
              <p className="text-secondary-600 italic">
                "The Legal AI chatbot answered all my property dispute questions instantly. I felt much more confident when meeting with my lawyer afterwards."
              </p>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold text-lg">
                  AJ
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Advocate Joshi</h4>
                  <p className="text-secondary-500">Bangalore</p>
                </div>
              </div>
              <p className="text-secondary-600 italic">
                "As a lawyer, this platform helps me manage cases more efficiently. My clients come prepared with better understanding of their legal situation."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="h-16 w-16 mx-auto mb-6 text-primary-300" />
          <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Legal Journey?</h2>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto mb-8">
            Join thousands of citizens who have made legal processes easier with The Legal AI.
          </p>
          {currentUser ? (
            <Link to="/fir-analyzer" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
              Get Started Now
            </Link>
          ) : (
            <Link to="/register" className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
              Create Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;