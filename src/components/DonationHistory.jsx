// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
// import { Badge } from './ui/badge.jsx';
// import { Input } from './ui/input.jsx';
// import { Search, Calendar, Heart, Download } from 'lucide-react';
// import { donorApi } from '../services/donorApi.js';

// const DonationHistory = () => {
//   const [donations, setDonations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//   const fetchDonations = async () => {
//     try {
//       const data = await donorApi.getDonations();
      
//       // 🟢 FIX HERE — extract actual array
//       setDonations(Array.isArray(data.donations) ? data.donations : []);
      
//     } catch (error) {
//       console.error('Error fetching donations:', error);

//       setDonations([
//         { id: 1, amount: 5000, date: '2024-01-15', cause: 'Education', method: 'UPI', receipt: 'RCP001', status: 'completed' },
//         { id: 2, amount: 10000, date: '2024-01-10', cause: 'Healthcare', method: 'Bank Transfer', receipt: 'RCP002', status: 'completed' },
//         { id: 3, amount: 2500, date: '2024-01-05', cause: 'Food Support', method: 'Credit Card', receipt: 'RCP003', status: 'completed' }
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   fetchDonations();
// }, []);

//   const filteredDonations = (donations || []).filter(donation =>
//   (donation.cause || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//   (donation.receipt || '').toLowerCase().includes(searchTerm.toLowerCase())
// );

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center py-12">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Donations...</h3>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Donation History</h1>
//           <p className="text-gray-600">View and manage your donation records.</p>
//         </div>

//         <Card className="mb-6 border-0 shadow-sm">
//           <CardContent className="p-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   type="text"
//                   placeholder="Search donations..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="space-y-4">
//           {filteredDonations.map((donation) => (
//             <Card key={donation.id} className="border-0 shadow-sm">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="p-3 rounded-full bg-green-100">
//                       <Heart className="h-6 w-6 text-green-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">₹{donation.amount.toLocaleString()}</h3>
//                       <p className="text-sm text-gray-600">{donation.cause}</p>
//                     </div>
//                   </div>
//                   <Badge className="bg-green-100 text-green-800">
//                     {donation.status}
//                   </Badge>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-4 w-4" />
//                     <span>{new Date(donation.date).toLocaleDateString()}</span>
//                   </div>
//                   <div>Payment: {donation.method}</div>
//                   <div>Receipt: {donation.receipt}</div>
//                   <div className="flex gap-2">
//                     <button className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
//                       <Download className="h-4 w-4" />
//                       Receipt
//                     </button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DonationHistory;
// import React, { useEffect, useState } from "react";
// import { donorApi } from "../services/donorApi";

// const DonationHistory = () => {
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     donorApi.getDonorHistory()
//       .then(res => setDonations(res.donations))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">My Donation History</h1>

//       {donations.length === 0 && <p>No donations yet</p>}

//       {donations.map(d => (
//         <div key={d._id} className="border p-4 mb-3 rounded">
//           <p><b>Name:</b> {d.name}</p>
//           <p><b>Amount:</b> ₹{d.donationAmount}</p>
//           <p><b>Email:</b> {d.email}</p>
//           <p><b>Date:</b> {new Date(d.createdAt).toLocaleDateString()}</p>

//           {d.uploadPaymentProof && (
//             <a
//               href={`${import.meta.env.VITE_BACKEND_URL}/${d.uploadPaymentProof}`}
//               target="_blank"
//               className="text-blue-600 underline"
//             >
//               View Receipt
//             </a>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DonationHistory;
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card.jsx";
import { Badge } from "./ui/badge.jsx";
import { Input } from "./ui/input.jsx";
import { Search, Calendar, Heart, Download } from "lucide-react";
import { donorApi } from "../services/donorApi";

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await donorApi.getDonorHistory();

        // 🔥 BACKEND → UI FORMAT MAPPING
        const formatted = (res.donations || []).map((d, index) => ({
          id: d._id,
          amount: d.donationAmount || 0,
          date: d.createdAt,
          cause: d.fundraisingId ? "Fundraising" : "General Donation",
          method: "UPI / Bank",
          receipt: d.uploadPaymentProof ? `RCP-${index + 1}` : "N/A",
          status: "completed",
          proof: d.uploadPaymentProof || null,
        }));

        setDonations(formatted);
      } catch (err) {
        console.error("❌ Donation history error:", err);
        setDonations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const filteredDonations = donations.filter(
    (d) =>
      d.cause.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.receipt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading Donations...
      </div>
    );
  }

const handleDownloadReceipt = async (donationId) => {
  try {
    const res = await donorApi.downloadReceipt(donationId);

    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Donation_Receipt_${donationId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    alert("Authentication failed or receipt not available");
  }
};

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Donation History
          </h1>
          <p className="text-gray-600">
            View and manage your donation records.
          </p>
        </div>

        {/* SEARCH */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* LIST */}
        <div className="space-y-4">
          {filteredDonations.length === 0 && (
            <p className="text-gray-500 text-center">
              No donations found
            </p>
          )}

          {filteredDonations.map((donation) => (
            <Card key={donation.id} className="border-0 shadow-sm">
              <CardContent className="p-6">
                {/* TOP */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-green-100">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        ₹{donation.amount.toLocaleString()}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {donation.cause}
                      </p>
                    </div>
                  </div>

                  <Badge className="bg-green-100 text-green-800">
                    {donation.status}
                  </Badge>
                </div>

                {/* BOTTOM */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(donation.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div>Payment: {donation.method}</div>

                  <div>Receipt: {donation.receipt}</div>

                  <div>
                    <button
  onClick={() => handleDownloadReceipt(donation.id)}
  className="text-purple-600 hover:text-purple-700 flex items-center gap-1"
>
  <Download className="h-4 w-4" />
  Receipt
</button>

                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
