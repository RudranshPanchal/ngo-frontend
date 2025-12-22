{/* STEP 2 - Activities & Impact */ }
const StepActivities = ({ formData, handleChange, StepIcon }) => {
    return (
        <div className="space-y-6">
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                    <StepIcon className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-purple-900 mb-2">Highlight Your Impact</h3>
                        <p className="text-sm text-purple-700">
                            Describe 3-5 major activities, projects, or initiatives undertaken during this financial year. Include beneficiary numbers and measurable outcomes.
                        </p>
                    </div>
                </div>
            </div>

            <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Key Activities & Project Highlights
                </label>
                <textarea
                    name="projectHighlights"
                    rows="10"
                    value={formData.projectHighlights}
                    onChange={handleChange}
                    placeholder="Example:&#10;1. Education Program: Provided scholarships to 150 underprivileged children...&#10;2. Healthcare Initiative: Conducted 25 health camps reaching 5000+ beneficiaries...&#10;3. Skill Development: Trained 200 women in vocational skills..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-200 font-mono text-sm"
                />
            </div>
        </div>

    )
}

export default StepActivities;