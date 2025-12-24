{/* STEP 3 - Auditor Details */ }
const StepAuditorDetails = ({ formData, handleChange }) => {
    return (
        <div className="space-y-6">
            {/* Grid for 3 columns layout */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    ["Auditor Name", "auditorName", "e.g., CA John Doe"],
                    ["Firm Name", "firmName", "e.g., Shah & Associates"],
                    ["Firm Address", "firmAddress", "e.g., 102, Sector- ED, Nirvan Empire, Indore-452016"],
                    ["Membership No. / FRN", "membershipNumber", "e.g., 123456"],
                    ["UDIN (18-digit)", "udin", "18-digit unique number"],
                    ["Board Chairperson Name", "boardChairName", "e.g., Mr. Rajesh Kumar"],
                    ["Secretary Name", "secretaryName", "e.g., Ms. Anjali Mehta"],
                ].map(([label, name, placeholder]) => (
                    <div key={name} className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {label}
                        </label>
                        <input
                            type="text"
                            name={name}
                            value={formData[name] || ""}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200"
                        />
                    </div>
                ))}
            </div>

            {/* Audit Remarks / Observations */}
            <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Audit Remarks / Observations
                </label>
                <textarea
                    name="auditRemarks"
                    rows="5"
                    value={formData.auditRemarks || ""}
                    onChange={handleChange}
                    placeholder="Any observations, qualifications, or remarks by the auditor..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all duration-200"
                />
            </div>
        </div>
    )
}

export default StepAuditorDetails;
