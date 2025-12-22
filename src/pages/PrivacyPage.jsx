import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you register as a volunteer, apply for membership, or contact us.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To communicate with you about programs and opportunities</li>
                <li>To improve our services and develop new ones</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information. Contact us at info@orbosis.org to exercise these rights.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at info@orbosis.org</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;