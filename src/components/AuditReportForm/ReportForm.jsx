import React, { useState, useEffect } from "react";
import { CheckCircle, Building2, DollarSign, Target, FileText, PenTool, AlertCircle } from "lucide-react";
import StepNGOBasics from "./StepNGOBasics";
import StepFinancials from "./StepFinancials";
import StepActivities from "./StepActivities";
import StepAuditorDetails from "./StepAuditorDetails";
import StepSignatures from "./StepSignatures";


const steps = [
  { title: "NGO Basics", icon: Building2, color: "blue" },
  { title: "Financials", icon: DollarSign, color: "green" },
  { title: "Activities & Impact", icon: Target, color: "purple" },
  { title: "Auditor Details", icon: FileText, color: "red" },
  { title: "Signatures & Compliance", icon: PenTool, color: "indigo" },
];

<style>
  {`
.spinner {
  border: 3px solid #ffffff50;
  border-top: 3px solid white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 0.65s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
}

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`}
</style>


const ReportForm = ({ onGenerateReport, loading, isReportReady, downloadPDF }) => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({

    // STEP 0 — NGO BASICS
    ngoName: "",
    registrationNumber: "",
    panNumber: "",
    address: "",
    taxExemption12A: "",
    taxExemption80G: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    financialYear: "",
    financialYearStart: "",
    financialYearEnd: "",
    dateOfReport: "",

    // STEP 2 — ACTIVITIES
    projectHighlights: "",


    // STEP 1 — FINANCIALS
    totalIncome: "",
    totalExpenditure: "",
    surplusDeficit: "",
    sourcesOfFunds: "",
    areasOfExpenditure: "",
    foreigncontribution: "",
    bankBalance: "",
    numberOfBeneficiaries: "",


    // STEP 3 — AUDITOR DETAILS
    auditorName: "",
    membershipNumber: "",
    udin: "",
    auditRemarks: "",
    boardChairName: "",
    secretaryName: "",

    // STEP 4 — SIGNATURES
    presidentSignature: "",
    auditorSignature: "",
    presidentName: "",
    presidentDate: "",
    auditorDate: "",

    // COMPLIANCE CHECKBOXES
    booksMaintained: false,
    returnsFiled: false,
    noViolation: false,
    fcraCompliance: false,
  });

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [step]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 0) {
      if (!formData.ngoName) newErrors.ngoName = true;
      if (!formData.registrationNumber) newErrors.registrationNumber = true;
      if (!formData.financialYear) newErrors.financialYear = true;
    } else if (currentStep === 1) {
      if (!formData.totalIncome) newErrors.totalIncome = true;
      if (!formData.totalExpenditure) newErrors.totalExpenditure = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (!completedSteps.includes(step)) {
        setCompletedSteps([...completedSteps, step]);
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
     console.log("Submitting triggered"); 
    if (validateStep(step)) {
      await onGenerateReport(formData);
    }
  };

  const stepColors = {
    0: 'text-blue-500 stroke-blue-500',
    1: 'text-green-500 stroke-green-500',
    2: 'text-purple-500 stroke-purple-500',
    3: 'text-red-500 stroke-red-500',
    4: 'text-indigo-500 stroke-indigo-500',
  };

  // Use the current step color or fallback to blue
  const currentColorClass = stepColors[step]

  const StepIcon = steps[step].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
      <div className="">

        {/* Animated Header */}
        {/* <div className="text-center mb-8 opacity-0 animate-fadeIn">
          <div className="inline-block p-3 bg-white rounded-2xl shadow-lg mb-4">
            <Building2 className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            NGO Annual Audit Report
          </h1>
          <p className="text-gray-600 text-lg">
            Professional report generation made simple
          </p>
        </div> */}

        {/* Progress Bar - Enhanced */}
        <div className="bg-white rounded-2xl shadow-xl p-1 mb-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-between mb-4">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isCompleted = completedSteps.includes(idx) || idx < step;
              const isCurrent = idx === step;

              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center flex-1 relative">
                    <div
                      className={`
                        w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-lg
                        transition-all duration-500 transform
                        ${isCurrent ? 'scale-110 shadow-lg' : 'scale-100'}
                        ${isCompleted ? 'bg-green-500 text-white' :
                          isCurrent ? 'bg-blue-600 text-white' :
                            'bg-gray-200 text-gray-400'}
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-7 h-7" />
                      ) : (
                        <Icon className={`w-4 h-4 md:w-6 md:h-6 ${isCurrent ? 'animate-pulse' : ''}`} />
                      )}
                    </div>
                    <p
                      className={`
                        mt-3 text-xs font-semibold text-center max-w-[100px]
                        transition-colors duration-300
                        ${isCurrent ? 'text-blue-700' : 'text-gray-500'}
                      `}
                    >
                      {item.title}
                    </p>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-2 mt-[-40px] relative">
                      <div className="absolute inset-0 bg-gray-200 rounded-full" />
                      <div
                        className={`
                          absolute inset-0 rounded-full transition-all duration-700
                          ${isCompleted ? 'bg-green-500 w-full' : 'w-0'}
                        `}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className={`bg-gradient-to-r ${step === 0 ? 'from-blue-500 to-blue-600' : step === 1 ? 'from-green-500 to-green-600' : step === 2 ? 'from-purple-500 to-purple-600' : step === 3 ? 'from-red-500 to-red-600' : 'from-indigo-500 to-indigo-600'} p-4`}>
            <div className="flex items-center gap-4 text-white">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <StepIcon className={`w-6 h-6 ${currentColorClass}`} />
              </div>
              <div>
                <p className="text-sm font-medium opacity-90">Step {step + 1} of 5</p>
                <h2 className="text-xl md:text-2xl font-bold">{steps[step].title}</h2>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div
              className={`
                transition-all duration-400
                ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
              `}
            >


              {/* STEP 0 - NGO Basics */}
              {step === 0 && (
                <StepNGOBasics
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  setFormData={setFormData}
                />
              )}



              {/* STEP 1 - Financials */}
              {step === 1 && (
                <StepFinancials
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                />
              )}

              {/* STEP 2 - Activities & Impact */}
              {step === 2 && (
                <StepActivities
                  formData={formData}
                  handleChange={handleChange}
                  StepIcon={Target}
                />
              )}

              {/* STEP 3 - Auditor Details */}
              {step === 3 && (
                <StepAuditorDetails
                  formData={formData}
                  handleChange={handleChange}
                />
              )}

              {/* STEP 4 - Signatures & Compliance */}
              {step === 4 && (
                <StepSignatures
                  formData={formData}
                  handleChange={handleChange}
                  setFormData={setFormData}
                  StepIconSignature={PenTool}
                  StepIconChecklist={CheckCircle}
                  StepIconWarning={AlertCircle}
                />
              )}

            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t-2 border-gray-100">

              {/* Previous Button */}
              {step > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="cursor-pointer px-4 py-2 text-sm md:px-6 md:py-3 md:text-base bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 hover:shadow-md transform hover:-translate-x-1"
                >
                  ← Previous
                </button>
              ) : (
                <div></div>
              )}

              {/* NEXT / GENERATE / DOWNLOAD LOGIC */}
              {step < 4 ? (
                /* CONTINUE BUTTON */
                <button
                  type="button"
                  onClick={handleNext}
                  className={`px-4 py-2 text-sm md:px-6 md:py-3 md:text-base shadow-lg cursor-pointer ${step === 0
                    ? "bg-gradient-to-r from-blue-500 to-blue-600"
                    : step === 1
                      ? "bg-gradient-to-r from-green-500 to-green-600"
                      : step === 2
                        ? "bg-gradient-to-r from-purple-500 to-purple-600"
                        : "bg-gradient-to-r from-red-500 to-red-600"
                    } text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:translate-x-1 hover:scale-105`}
                >
                  Continue →
                </button>
              ) : (
                /* LAST STEP → GENERATE OR DOWNLOAD PDF */
                <>
                  {!isReportReady ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`cursor-pointer px-4 py-3 text-sm md:px-10 md:py-4 md:text-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300
            ${loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-2xl hover:scale-105"
                        }
          `}
                    >
                      {loading ? (
                        <span className="flex items-center gap-3">

                          <svg
                            className="w-6 h-6 animate-spin text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M4 12a8 8 0 0 1 8-8"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                          </svg>

                          <span className="animate-pulse">Generating Report…</span>
                        </span>
                      ) : (
                        "Generate Report 🚀"
                      )}

                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={downloadPDF}
                      className="cursor-pointer px-4 py-3 text-sm md:px-10 md:py-4 md:text-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      Download PDF 📄
                    </button>
                  )}
                </>
              )}

            </div>

          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Professional NGO audit reporting • Secure & Compliant</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        input::placeholder,
        textarea::placeholder {
          color: #9ca3af;
        }

        input:focus::placeholder,
        textarea:focus::placeholder {
          color: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default ReportForm;