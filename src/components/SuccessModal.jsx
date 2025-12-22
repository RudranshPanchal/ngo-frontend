import { CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

const SuccessModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-sm p-6 text-center animate-in fade-in zoom-in">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-3" />

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Registration Successful 🎉
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Your account has been created successfully.
          Please login to continue.
        </p>

        <Button
          className="w-full bg-purple-600 hover:bg-purple-700"
          onClick={onClose}
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default SuccessModal;
