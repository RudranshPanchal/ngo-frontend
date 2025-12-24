import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Lock, Mail, Phone, TrendingUp, Calendar, Users, Sparkles } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import VerificationModal from './VerificationModal';

const VerificationPendingDashboard = () => {
    // Mock verification state - in real app, this comes from API/context
    const { currentUser, refreshUser } = useAppContext();

    const emailVerified = currentUser?.emailVerified ?? false;
    const phoneVerified = currentUser?.phoneVerified ?? false;

    const [modalOpen, setModalOpen] = useState(false);
    const [verifyType, setVerifyType] = useState(null);

    const userEmail = currentUser?.email ?? "Not provided";
    const userPhone = currentUser?.contactNumber ?? "Not provided";

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Calculate progress
    const verifiedCount = [emailVerified, phoneVerified].filter(Boolean).length;
    const progressPercentage = (verifiedCount / 2) * 100;

    // Check if verification complete
    useEffect(() => {
        if (emailVerified && phoneVerified) {
            setShowSuccessModal(true);
            // In real app: setTimeout(() => router.push('/dashboard'), 2000);
        }
    }, [emailVerified, phoneVerified]);

    const handleVerifyEmail = async () => {
        // call backend → send verification email
        await refreshUser();
    };

    const handleVerifyPhone = async () => {
        // call backend → send OTP
        await refreshUser();
    };

    return (
        <div className="bg-gray-50">
            {/* Sidebar */}


            {/* Main Content */}
            <main className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            Complete Your Verification
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        You're just 2 quick steps away from joining our volunteer community and making an impact!
                    </p>
                </div>

                {/* Progress Card */}
                <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">VERIFICATION PROGRESS</p>
                            <p className="text-gray-900 text-4xl font-bold">{verifiedCount} of 2 Complete</p>
                        </div>
                        <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-purple-600 text-3xl font-bold">{Math.round(progressPercentage)}%</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                             className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                                width: `${progressPercentage}%`,
                                // width: `50%`,
                                background: 'linear-gradient(to right, #c43bf6bc, #8400ffff)' // purple gradient
                            }}
                        />
                    </div>

                    <p className="mt-4 text-gray-600 text-sm">
                        {verifiedCount === 0 && "Let's get started with your verifications!"}
                        {verifiedCount === 1 && "Great progress! Just one more step to go."}
                        {verifiedCount === 2 && "🎉 All done! Redirecting to your dashboard..."}
                    </p>
                </div>


                {/* Verification Checklist */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Email Verification Card */}
                    <div className={`bg-white rounded-xl p-6 border-2 transition-all ${emailVerified
                        ? 'border-green-200 bg-green-50/30'
                        : 'border-gray-200 hover:border-purple-200 hover:shadow-md'
                        }`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${emailVerified ? 'bg-green-100' : 'bg-purple-100'
                                    }`}>
                                    <Mail className={`w-6 h-6 ${emailVerified ? 'text-green-600' : 'text-purple-600'
                                        }`} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Email Verification</h3>
                                    <p className="text-sm text-gray-500">{userEmail}</p>
                                </div>
                            </div>

                            {emailVerified ? (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : (
                                <XCircle className="w-6 h-6 text-gray-300" />
                            )}
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                            {emailVerified
                                ? "Your email has been verified successfully!"
                                : "We'll send a verification link to confirm your email address."}
                        </p>

                        {emailVerified ? (
                            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium text-center">
                                ✓ Verified
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    setVerifyType("email");
                                    setModalOpen(true);
                                }}
                                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Verify Email Address
                            </button>
                        )}
                    </div>

                    {/* Phone Verification Card */}
                    <div className={`bg-white rounded-xl p-6 border-2 transition-all ${phoneVerified
                        ? 'border-green-200 bg-green-50/30'
                        : 'border-gray-200 hover:border-purple-200 hover:shadow-md'
                        }`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${phoneVerified ? 'bg-green-100' : 'bg-purple-100'
                                    }`}>
                                    <Phone className={`w-6 h-6 ${phoneVerified ? 'text-green-600' : 'text-purple-600'
                                        }`} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Phone Verification</h3>
                                    <p className="text-sm text-gray-500">{userPhone}</p>
                                </div>
                            </div>

                            {phoneVerified ? (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : (
                                <XCircle className="w-6 h-6 text-gray-300" />
                            )}
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                            {phoneVerified
                                ? "Your phone number has been verified successfully!"
                                : "We'll send a verification code via SMS to your phone."}
                        </p>

                        {phoneVerified ? (
                            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium text-center">
                                ✓ Verified
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    setVerifyType("phone");
                                    setModalOpen(true);
                                }}
                                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Verify Phone Number
                            </button>
                        )}
                    </div>
                </div>

                {/* Preview Locked Features */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                        <Lock className="w-5 h-5 text-gray-400" />
                        <h3 className="font-semibold text-gray-900">What You'll Unlock</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg opacity-60">
                            <TrendingUp className="w-8 h-8 text-gray-400 mb-2" />
                            <h4 className="font-medium text-gray-700 mb-1">Impact Dashboard</h4>
                            <p className="text-sm text-gray-500">Track your volunteer hours and contribution metrics</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg opacity-60">
                            <Calendar className="w-8 h-8 text-gray-400 mb-2" />
                            <h4 className="font-medium text-gray-700 mb-1">Event Calendar</h4>
                            <p className="text-sm text-gray-500">Browse and sign up for upcoming volunteer opportunities</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg opacity-60">
                            <Users className="w-8 h-8 text-gray-400 mb-2" />
                            <h4 className="font-medium text-gray-700 mb-1">Community</h4>
                            <p className="text-sm text-gray-500">Connect with fellow volunteers and share experiences</p>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                    <p className="text-sm text-gray-600 mb-3">
                        Having trouble with verification? Our support team is here to help.
                    </p>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                        Contact Support →
                    </button>
                </div>
            </main>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-[fadeIn_0.3s_ease-out]">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Verification Complete! 🎉
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Your account is now fully activated. Redirecting you to the dashboard...
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-green-600 h-full rounded-full animate-[slideIn_2s_ease-in-out]" />
                        </div>
                    </div>
                </div>
            )}
            <VerificationModal
                open={modalOpen}
                type={verifyType}
                value={
                    verifyType === "email"
                        ? currentUser.email
                        : currentUser.contactNumber
                }
                onClose={() => setModalOpen(false)}
                onVerify={async (otp) => {
                    // call backend here
                    await refreshUser();
                }}
            />
        </div>
    );
};

export default VerificationPendingDashboard;