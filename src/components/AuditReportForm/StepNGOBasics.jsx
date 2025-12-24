{/* STEP 0 - NGO Basics */}

const StepNGOBasics = ({ formData, errors, handleChange, setFormData }) => {
    const handleFinancialYear = (e) => {
        const fy = e.target.value;
        const startYear = fy.split("-")[0];
        const endYear = parseInt(startYear) + 1;

        setFormData({
            ...formData,
            financialYear: fy,
            financialYearStart: `01 April ${startYear}`,
            financialYearEnd: `31 March ${endYear}`,
        });
    };

      const handlePANChange = (e) => {
    let val = e.target.value.toUpperCase();
    handleChange("panNumber", val);

    // Show hint if it matches pattern
    setShowHint(/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val));
  };

    return (
        <div className="space-y-6">
            {/* Grid for 3 columns layout */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    ["NGO Legal Name", "ngoName", "text", "e.g., Green Earth Foundation"],
                    ["Registration Number", "registrationNumber", "text", "e.g., REG/2020/12345"],
                    ["PAN Number", "panNumber", "text", "e.g., AAAAA0000A"],
                    ["12A Registration Number", "taxExemption12A", "text", "e.g., 12A/ABC/2022"],
                    ["80G Registration Number", "taxExemption80G", "text", "e.g., 80G/XYZ/2023"],
                    ["Contact Person", "contactPerson", "text", "Name of authorised representative"],
                    ["Contact Email", "contactEmail", "email", "e.g., contact@ngo.org"],
                    ["Contact Phone", "contactPhone", "text", "e.g., +91 9876543210"],
                ].map(([label, name, type, placeholder]) => (
                    <div key={name} className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {label}
                            {errors[name] && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name] || ""}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className={`
                                w-full px-4 py-3 text-sm border-2 rounded-xl
                                transition-all duration-200
                                focus:outline-none focus:ring-4 focus:ring-blue-100
                                ${errors[name]
                                    ? 'border-red-300 bg-red-50'
                                    : 'border-gray-200 focus:border-blue-400'
                                }
                            `}
                            required
                        />
                    </div>
                ))}

                {/* Financial Year Selection */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Financial Year
                    </label>
                    <select
                        name="financialYear"
                        value={formData.financialYear}
                        onChange={handleFinancialYear}
                        className={`
                            w-full px-2 py-2 text-sm border-2 rounded-md
                            transition-all duration-200
                            focus:outline-none focus:ring-4 focus:ring-blue-100
                            ${errors["financialYear"]
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-200 focus:border-blue-400'
                            }
                        `}
                        required
                    >
                        <option value="">Select Financial Year</option>
                        {Array.from({ length: 15 }).map((_, i) => {
                            const yearStart = 2015 + i;
                            const yearEnd = yearStart + 1;
                            const label = `${yearStart}-${yearEnd.toString().slice(-2)}`;
                            return (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Financial Year Start and End Dates */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Financial Year Start Date
                    </label>
                    <input
                        placeholder="DD-MM-YY"
                        type="text"
                        name="financialYearStart"
                        value={formData.financialYearStart || ""}
                        readOnly
                        className={`
                            w-full px-2 py-2 text-sm border-2 rounded-md
                            transition-all duration-200
                            focus:outline-none focus:ring-4 focus:ring-blue-100
                            ${errors["financialYearStart"]
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-200 focus:border-blue-400'
                            }
                        `}
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Financial Year End Date
                    </label>
                    <input
                        placeholder="DD-MM-YY"
                        type="text"
                        name="financialYearEnd"
                        value={formData.financialYearEnd || ""}
                        readOnly
                        className={`
                            w-full px-2 py-2 text-sm border-2 rounded-md
                            transition-all duration-200
                            focus:outline-none focus:ring-4 focus:ring-blue-100
                            ${errors["financialYearEnd"]
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-200 focus:border-blue-400'
                            }
                        `}
                    />
                </div>
            </div>

            {/* Registered Address Textarea */}
            <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Registered Address
                    {errors["address"] && <span className="text-red-500 ml-1">*</span>}
                </label>
                <textarea
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Complete registered address with pin code"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
                    required
                />
            </div>
        </div>
    );
}

export default StepNGOBasics;
