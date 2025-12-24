import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
    const oneTimeSupport = [
        { plan: "1 Girl", amount: "₹1500", details: "Supports 1 girl’s basic education & hygiene needs" },
        { plan: "10 Girls", amount: "₹15000", details: "Supports 2 girls with computer & confidence training" },
        { plan: "25 Girls", amount: "₹37500", details: "Sponsors 5 girls for full skill & spiritual program" },
        { plan: "50 Girls", amount: "₹75000", details: "Supports a group of 10 girls – complete development" },
        { plan: "100 Girls", amount: "₹150000", details: "Helps train & empower an entire batch (25 girls)" },
        { plan: "200 Girls", amount: "₹300000", details: "Partner with us to uplift 100+ girls every quarter" },
    ];

    const monthlySupport = [
        { plan: "1 Girl", amount: "₹1000", details: "Supports 1 girl’s basic education & hygiene needs" },
        { plan: "2 Girls", amount: "₹2500", details: "Supports 2 girls with computer & confidence training" },
        { plan: "5 Girls", amount: "₹5000", details: "Sponsors 5 girls for full skill & spiritual program" },
        { plan: "10 Girls", amount: "₹10000", details: "Supports a group of 10 girls – complete development" },
        { plan: "25 Girls", amount: "₹25000", details: "Helps train & empower an entire batch (25 girls)" },
        { plan: "100+ Girls", amount: "₹50000", details: "Partner with us to uplift 100+ girls every quarter" },
    ];

    const navigate = useNavigate();
    const handleClickForMonth = (item) => {
        console.log("amount---" , item.amount.replace('₹', ""));
        navigate('/signup', { state: "Donor" });
    }
    const handleClickOneTime = (item) => {
        console.log("amount---" , item.amount.replace('₹', ""));
        navigate('/donor-registration', { state: item.amount.replace('₹', "")});
    }

    return (
        <div className="max-w-7xl mx-auto p-8 bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-lg mt-6">
            <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
                Back to Home
            </button>
            {/* --- Project Intro Section --- */}
            <div className="mb-10 text-gray-800">
                <h1 className="text-3xl font-bold text-blue-700 text-center mb-4">
                    Orbosis Foundation – 200 Girls Safe & Skilled Campaign
                </h1>
                <p className="text-lg text-gray-700 text-center mb-6">
                    Every girl deserves safety, confidence, and opportunity. Through Orbosis Foundation’s
                    <span className="font-semibold"> ‘200 Girls – Safe & Skilled’ </span>
                    initiative, we aim to empower 200 underprivileged girls and women in Indore with the
                    tools they need to lead an independent and dignified life.
                </p>

                <h2 className="text-2xl font-semibold text-blue-700 mb-2">Focus Areas</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                    <li><span className="font-medium">Personality Development:</span> Building confidence and communication skills.</li>
                    <li><span className="font-medium">Basic Computer Training:</span> Digital literacy sessions for jobs and education.</li>
                    <li><span className="font-medium">Hygiene & Cleaning Kits:</span> Promoting personal health and self-care.</li>
                    <li><span className="font-medium">Spiritual & Value-Based Sessions:</span> Meditation and moral education for peace and discipline.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-blue-700 mb-2">Our Goal</h2>
                <p className="text-gray-700 mb-6">
                    To empower 200 girls in Indore’s slum and low-income areas through training, hygiene kits, and spiritual guidance —
                    helping them grow with dignity and strength.
                </p>

                <h2 className="text-2xl font-semibold text-green-700 text-center">
                    Donation Options – Empower a Girl Today
                </h2>
            </div>

            {/* --- Tables Section --- */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* One-Time Support Table */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">One-Time Support</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border border-blue-200 rounded-lg">
                            <thead className="bg-blue-100 text-blue-700">
                                <tr>
                                    <th className="p-3 text-left">Sponsorship</th>
                                    <th className="p-3 text-left">What It Covers</th>
                                    <th className="p-3 text-left">Donate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {oneTimeSupport.map((item, index) => (
                                    <tr key={index} className="border-b hover:bg-blue-50">
                                        <td className="p-3 font-medium">{item.plan}</td>
                                        <td className="p-3">{item.details}</td>
                                        <td className="p-3">
                                            <button onClick={()=>handleClickOneTime(item)} className="bg-green-600 text-white font-semibold py-1 px-4 rounded-lg hover:bg-green-700 transition w-full">
                                                {item.amount}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Monthly Support Table */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center">Monthly Support</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border border-blue-200 rounded-lg">
                            <thead className="bg-blue-100 text-blue-700">
                                <tr>
                                    <th className="p-3 text-left">Plan</th>
                                    <th className="p-3 text-left">What It Supports</th>
                                    <th className="p-3 text-left">Donate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlySupport.map((item, index) => (
                                    <tr key={index} className="border-b hover:bg-blue-50">
                                        <td className="p-3 font-medium">{item.plan}</td>
                                        <td className="p-3">{item.details}</td>
                                        <td className="p-3">
                                            <button onClick={() => handleClickForMonth(item)} className="bg-green-600 text-white font-semibold py-1 px-4 rounded-lg hover:bg-green-700 transition w-full">
                                                {item.amount}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
