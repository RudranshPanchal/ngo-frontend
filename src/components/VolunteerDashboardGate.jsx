import React from "react";
import VolunteerDashboard from "./VolunteerDashboard";
import VerificationPendingDashboard from "./VerificationPendingDashboard";
import { useAppContext } from "../contexts/AppContext"; // or wherever auth lives

const VolunteerDashboardGate = () => {
  const { currentUser, authLoading } = useAppContext();

  if (authLoading) {
    return (
      <div className="p-6 text-center">
        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-600">Checking account status...</p>
      </div>
    );
  }

  const isVerified = currentUser?.emailVerified && currentUser?.phoneVerified;

  if (!isVerified) {
    return <VerificationPendingDashboard />;
  }

  return <VolunteerDashboard />;
};

export default VolunteerDashboardGate;
