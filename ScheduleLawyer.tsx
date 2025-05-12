import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

const ScheduleLawyer = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader 
        title="Schedule a Lawyer Consultation" 
        description="Book a consultation with a qualified legal professional"
      />
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Calendar className="h-5 w-5" />
              <h2>Select Date</h2>
            </div>
            <div className="border rounded-lg p-4">
              {/* Calendar component would go here */}
              <p className="text-gray-500">Calendar implementation coming soon</p>
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Clock className="h-5 w-5" />
              <h2>Available Time Slots</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                <button
                  key={time}
                  className="p-3 text-sm border rounded-md hover:bg-primary-50 hover:border-primary-300 transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Consultation Details */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Consultation Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="caseType" className="block text-sm font-medium text-gray-700">
                Type of Case
              </label>
              <select
                id="caseType"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option>Criminal Law</option>
                <option>Civil Law</option>
                <option>Family Law</option>
                <option>Corporate Law</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Brief Description of Your Case
              </label>
              <textarea
                id="description"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Please provide a brief description of your case..."
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Schedule Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleLawyer;