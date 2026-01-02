import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

import { useFundraising } from "../hooks/useFundraising";

function FundRaising() {
  const [showForm, setShowForm] = useState(false);
  const { cards, loading } = useFundraising();



  return (
     <div className="w-full flex flex-col items-center gap-6 px-4">
      {/* Back Button Section */}
      <div className="w-full max-w-2xl flex justify-start">
        <Link
          to="/"
          className="flex items-center gap-3 text-gray-800 hover:text-purple-700 transition-all text-xl font-bold"
        >
          <ArrowLeft className="h-6 w-6" />
          <span>Back to Home</span>
        </Link>
      </div>

      {loading ? (
        <p className="text-center mt-10 text-gray-600 text-lg">Loading fundraising cards...</p>
      ) : (
        cards.map((item) => (
          <Card
            key={item._id}
          className="mt-6 md:mt-10 max-w-3xl p-6 w-full shadow-2xl shadow-[0_35px_120px_-30px_rgba(0,0,0,0.3)] rounded-xl border border-orange-200 bg-gradient-to-br from-orange-300 via-peach-300 to-rose-300"
          >
            <div className="flex flex-col md:flex-row gap-6 w-full items-center md:items-start">

              {/* LEFT SECTION (Photo & Identity) */}
              <div className="w-full md:w-40 flex flex-col items-center shrink-0">
                <div className="w-32 md:w-40 overflow-hidden rounded-lg shadow-sm bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-auto max-h-48 md:max-h-52 object-contain bg-gray-50"
                  />
                </div>

                <div className="mt-3 text-center flex flex-col min-h-[60px] justify-center">
                  <CardTitle className="text-lg font-bold leading-tight">
                    {item.name}
                  </CardTitle>
                  <p className="text-black-500 text-sm">{item.city}</p>
                </div>
                <p className="font-bold text-sm mt-1 text-blue-700">RS - ₹ {item.payment}</p>
              </div>

              {/* RIGHT SECTION (Description, Tags & Button) */}
              <div className="flex flex-col flex-1 w-full text-center md:text-left items-center md:items-stretch">
                <CardContent className="p-0 mt-2 w-full">
                  <div className="overflow-y-auto bg-gray-50 p-3 rounded-lg shadow-sm border text-sm text-gray-700 min-h-[80px] max-h-36 italic">
                    {item.description}
                  </div>
                </CardContent>

                <CardContent className="p-0 mt-4 w-full flex flex-col items-center">
                  {/* TAGS: Center align for both PC and Mobile as per your request */}
                  <div className="flex gap-2 flex-wrap justify-center mb-5">
                    {item.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="py-1 px-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] md:text-xs rounded-full shadow-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* BUTTON: Centered on both devices */}
                  <div className="flex justify-center w-full">
                    <Link
                      to="/donor-registration"
                      className="w-full flex justify-center"
                      state={{ fundraisingId: item._id, presetAmount: "" }}
                    >
                      <Button
                        className="w-full md:w-64 py-3 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold rounded-lg shadow-md"
                      >
                        Donate Now
                      </Button>
                    </Link>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="mt-6 w-full max-w-md md:max-w-full">
                    {(() => {
                      const goal = Number(item.limit) || 0;
                      const paid = Number(item.payment) || 0;
                      const progress = goal > 0 ? (paid / goal) * 100 : 0;
                      const safeProgress = Math.min(progress, 100);

                      return (
                        <>
                          <div className="flex justify-between mb-1 px-1">
                            <span className="text-[10px] uppercase font-bold text-black-400">Progress</span>
                            <span className="text-sm font-bold text-gray-800">Goal: ₹{goal}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 shadow-inner overflow-hidden">
                            <div
                              className="bg-green-500 h-full transition-all duration-700 ease-in-out"
                              style={{ width: `${safeProgress}%` }}
                            />
                          </div>
                          <p className="text-xs text-center mt-1.5 text-gray-600 font-bold">
                            {Math.floor(safeProgress)}% Completed
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );

}

export default FundRaising;