{/* STEP 1 - Financials */ }
const StepFinancials = ({ formData, errors, handleChange }) => {
    return (
        <div className="space-y-6">
            {/* Grid for 3 columns layout */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    ["Total Income / Receipts", "totalIncome", "₹"],
                    ["Total Expenditure / Payments", "totalExpenditure", "₹"],
                    ["Surplus (+) / Deficit (-)", "surplusDeficit", "₹"],
                    ["Cash & Bank Balance", "bankBalance", "₹"],
                    ["Foreign Contribution Received", "foreigncontribution", "₹"],
                    ["Number of Beneficiaries", "numberOfBeneficiaries", "", "e.g., 1200"],
                ].map(([label, name, symbol, placeholder]) => (
                    <div key={name} className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {label}
                            {errors[name] && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="relative">
                            {symbol && (
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                    {symbol}
                                </span>
                            )}
                            <input
                                type="text"
                                name={name}
                                value={formData[name] || ""}
                                onChange={handleChange}
                                placeholder={placeholder || "0.00"}
                                className={`
                                    w-full ${symbol ? "pl-10" : "pl-4"} pr-4 py-3 border-2 rounded-xl
                                    transition-all duration-200
                                    focus:outline-none focus:ring-4 focus:ring-green-100
                                    ${errors[name]
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-200 focus:border-green-400'
                                    }
                                `}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Sources of Funds */}
            <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Main Sources of Funds
                </label>
                <textarea
                    name="sourcesOfFunds"
                    value={formData.sourcesOfFunds || ""}
                    onChange={handleChange}
                    rows="3"
                    placeholder="e.g., Donations, Grants, Membership fees, Interest income..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 transition-all duration-200"
                />
            </div>

            {/* Main Areas of Expenditure */}
            <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Main Areas of Expenditure
                </label>
                <textarea
                    name="areasOfExpenditure"
                    value={formData.areasOfExpenditure || ""}
                    onChange={handleChange}
                    rows="3"
                    placeholder="e.g., Education Programs, Health Camps, Women Empowerment, Staff Salaries..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 transition-all duration-200"
                />
            </div>
        </div>
    )
}

export default StepFinancials;
