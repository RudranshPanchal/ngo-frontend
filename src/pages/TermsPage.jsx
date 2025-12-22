import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using Orbosis Foundation's services, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Volunteer Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain confidentiality of beneficiary information</li>
                <li>Attend scheduled training sessions and activities</li>
                <li>Represent the organization with integrity</li>
                <li>Follow safety guidelines and protocols</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Code of Conduct</h2>
              <p>All volunteers and members must adhere to our code of conduct, which includes respect for all individuals, non-discrimination, and professional behavior.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Limitation of Liability</h2>
              <p>Orbosis Foundation shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Contact Information</h2>
              <p>For questions about these terms, please contact us at info@orbosis.org</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;