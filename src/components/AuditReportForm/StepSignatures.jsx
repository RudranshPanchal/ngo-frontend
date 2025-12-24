{/* STEP 4 - Signatures & Compliance */ }
const StepSignatures = ({ formData, handleChange, setFormData, StepIconSignature, StepIconChecklist, StepIconWarning }) => {
    return (
        <div className="space-y-8">

            {/* Signature Upload Section */}
            <div className="grid md:grid-cols-2 gap-8">
                {[
                    ["presidentSignature", "President/Secretary Signature", "Upload signature of authorized signatory"],
                    ["auditorSignature", "Auditor Signature / Seal", "Upload auditor's signature or firm seal"],
                ].map(([name, title, subtitle]) => (
                    <div key={name} className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {title}
                        </label>
                        <p className="text-xs text-gray-500 mb-3">{subtitle}</p>

                        <label className="relative block border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        [name]: e.target.files[0],
                                    })
                                }
                            />

                            {!formData[name] ? (
                                <div className="text-center">
                                    <StepIconSignature className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                                    <p className="text-sm font-medium text-gray-600">Click to upload</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={URL.createObjectURL(formData[name])}
                                        className="w-full h-32 object-contain rounded-lg"
                                        alt="Signature preview"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
                                        <p className="text-white text-sm font-medium opacity-0 hover:opacity-100">
                                            Click to change
                                        </p>
                                    </div>
                                </div>
                            )}
                        </label>
                    </div>
                ))}
            </div>

            {/* Signature Names & Dates */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        President / Secretary Name
                    </label>
                    <input
                        type="text"
                        name="presidentName"
                        value={formData.presidentName || ""}
                        onChange={handleChange}
                        placeholder="Full name of the signatory"
                        className="
            w-full px-4 py-3 border-2 border-gray-200 rounded-xl
            focus:outline-none focus:ring-4 focus:ring-indigo-100
            focus:border-indigo-400 transition-all duration-200
          "
                    />
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date (President / Secretary)
                    </label>
                    <input
                        type="date"
                        name="presidentDate"
                        value={formData.presidentDate || ""}
                        onChange={handleChange}
                        className="
            w-full px-4 py-3 border-2 border-gray-200 rounded-xl
            focus:outline-none focus:ring-4 focus:ring-indigo-100
            focus:border-indigo-400 transition-all duration-200
          "
                    />
                </div>

                <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date (Auditor)
                    </label>
                    <input
                        type="date"
                        name="auditorDate"
                        value={formData.auditorDate || ""}
                        onChange={handleChange}
                        className="
            w-full px-4 py-3 border-2 border-gray-200 rounded-xl
            focus:outline-none focus:ring-4 focus:ring-indigo-100
            focus:border-indigo-400 transition-all duration-200
          "
                    />
                </div>
            </div>

            {/* Compliance Checklist */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-200">
                <div className="flex items-center gap-3 mb-4">
                    <StepIconChecklist className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-lg font-bold text-gray-900">
                        Compliance Checklist
                    </h3>
                </div>

                <div className="space-y-3">
                    {[
                        ["booksMaintained", "Books of accounts maintained properly as per accounting standards"],
                        ["returnsFiled", "All statutory returns (TDS/GST/FCRA) filed on time"],
                        ["noViolation", "No violation of Section 13(1)(c) or related party transactions"],
                        ["fcraCompliance", "FCRA funds (if any) used only for approved purposes"],
                    ].map(([name, label]) => (
                        <label
                            key={name}
                            className="flex items-start gap-3 p-4 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all duration-200"
                        >
                            <input
                                type="checkbox"
                                name={name}
                                checked={formData[name]}
                                onChange={handleChange}
                                className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            />
                            <span className="text-sm text-gray-700 font-medium">{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Final Check Warning */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                    <StepIconWarning className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-amber-900 mb-1">Final Review</h4>
                        <p className="text-sm text-amber-700">
                            Please review all information carefully before generating the report.
                            Ensure all financial figures and compliance statements are accurate.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepSignatures;