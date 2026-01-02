import React, { useEffect, useState } from "react";
import { CheckCircle, X, Loader2 } from "lucide-react";

const VerificationModal = ({
  open,
  type, // "email" | "phone"
  value, // masked email / phone
  onResend,
  onClose,
  onVerify,
}) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(30);

  // countdown timer
  useEffect(() => {
    if (!open || timer === 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [open, timer]);

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    try {
      setLoading(true);
      setError("");

      await onVerify(otp); // backend call

      setSuccess(true);

      setTimeout(() => {
        onClose();
        setSuccess(false);
        setOtp("");
      }, 1400);
    } catch (err) {
      setError("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative animate-[fadeIn_0.25s_ease-out]">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        {/* Success */}
        {success ? (
          <div className="text-center py-10">
            <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Verified Successfully</h3>
            <p className="text-gray-500 mt-1">
              Your {type} has been verified
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-900">
              Verify your {type}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Enter the 6-digit code sent to
            </p>

            <p className="mt-2 font-medium text-gray-900">{value}</p>
            <p className="text-sm text-gray-400 mt-1">
              OTP will expire in 10 minutes
            </p>
            {/* OTP Input */}
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              className="mt-6 w-full h-12 text-center text-lg tracking-widest border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="••••••"
              autoFocus
            />

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}

            {/* Actions */}
            <button
              onClick={handleVerify}
              disabled={loading || otp.length !== 6}
              className="mt-6 w-full h-12 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg font-medium flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Verify & Continue"
              )}
            </button>

            {/* Resend */}
            <div className="mt-4 text-center text-sm text-gray-500">
              {timer > 0 ? (
                <>Resend code in {timer}s</>
              ) : (
                <button
                  onClick={() => { onResend(); setTimer(30) }}
                  className="text-purple-600 hover:underline"
                >
                  Resend code
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationModal;
