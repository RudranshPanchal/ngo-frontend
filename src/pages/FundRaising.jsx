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
    <div className="w-full flex flex-col items-center gap-6">

      {/* Bigger Back Button - LEFT */}
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
        <p className="text-center mt-10 text-gray-600 text-lg">
          Loading fundraising cards...
        </p>
      ) : (
        cards.map((item) => (
          <Card
            key={item._id}
            className="mt-10 max-w-3xl p-6 w-full bg-white shadow-2xl rounded-xl border"
          >
            <div className="flex gap-6 w-full">
              {/* LEFT */}
              <div className="w-40">
                <div className="w-40 flex flex-col items-center">
                  {/* IMAGE */}
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${item.image}`}
                    alt={item.name}
                    loading="lazy"
                    className="w-40 h-40 object-cover rounded-lg shadow-sm"
                  />

                  {/* NAME &  CITY */}
                  <div className="mt-3 text-center flex flex-col min-h-[70px] justify-between">
                    <CardTitle className="text-lg font-semibold leading-tight">
                      {item.name}
                    </CardTitle>
                    <p className="text-gray-500 text-sm">{item.city}</p>
                  </div>

                  {/* PAYMENT — ALWAYS BOTTOM, NEVER MOVES */}
                  <p className="font-bold text-sm mt-2">RS -  ₹ {item.payment}</p>
                </div>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col justify-between flex-1">
                <CardContent className="p-0 mt-2">
                  <div className=" overflow-y-auto bg-gray-50 p-3  rounded-lg shadow-sm border text-sm text-gray-700 h-30">
                    {item.description}
                  </div>
                </CardContent>

                <CardContent className="p-0 mt-4">
                  <div className="flex gap-3 flex-wrap justify-center">
                    {item.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="py-1 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-full shadow-sm cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center mt-5">
                    <Link
                      to="/donor-registration"
                      state={{
                        fundraisingId: item._id,
                        presetAmount: "", // empty so input ENABLE rahe
                      }}

                    >
                      <Button
                        className="w-60 py-3 bg-orange-500 hover:bg-orange-600 text-white text-lg rounded-lg shadow-md"
                      >
                        Donate Now
                      </Button>

                    </Link>

                  </div>

                  <div className="mt-5">
                    {(() => {
                      const progress = Math.min(item.payment / 100, 100);

                      return (
                        <>
                          <div className="mt-5">
                            {(() => {
                              const goal = Number(item.limit) || 0;
                              const paid = Number(item.payment) || 0;

                              const progress = goal > 0 ? (paid / goal) * 100 : 0;

                              return (
                                <>
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm font-semibold text-gray-700"></span>
                                    <span className="text-sm font-semibold text-gray-700">
                                      Goal: ₹{goal}
                                    </span>
                                  </div>

                                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                                    <div
                                      className="bg-green-500 h-3 rounded-full"
                                      style={{ width: `${Math.min(progress, 100)}%` }}
                                    />
                                  </div>

                                  <p className="text-sm text-center mt-1 text-gray-600 font-medium">
                                    {Math.floor(Math.min(progress, 100))}% Completed
                                  </p>
                                </>
                              );
                            })()}
                          </div>

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