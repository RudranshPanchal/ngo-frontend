import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { useReportGenerator } from "../hooks/useReportGenerator.js";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import ReportForm from "./AuditReportForm/ReportForm.jsx";

const AuditReportPage = () => {
  const [activeTab, setActiveTab] = useState("audit-report");
   const {
    handleGenerateReport,
    downloadPDF,
    loading,
    isReportReady,
  } = useReportGenerator();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                NGO Audit Report
              </h1>
              <p className="text-gray-600">
                {/* Generate and download yearly audit reports for your NGO
                 */}
                 Generate Professional, Compliant Audit Reports Aligned with ICA Standards.
              </p>
            </div>

            {/* Main Card */}
            <Card className="border-0 shadow-sm">
              {/* <CardHeader className="border-b border-gray-100">
    <CardTitle className="flex items-center gap-2">
      <FileText className="h-5 w-5 text-purple-700" />
      Generate Audit Report
    </CardTitle>
  </CardHeader> */}

              <CardContent className="p-1">
                <div className="space-y-6">
                  <ReportForm
                    onGenerateReport={handleGenerateReport}
                    loading={loading}
                    isReportReady={isReportReady}
                    downloadPDF={downloadPDF}
                  />
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditReportPage;
