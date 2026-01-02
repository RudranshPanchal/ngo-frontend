// import { useState } from "react";
// import { useAppContext } from "../contexts/AppContext";
// import DashboardHeader from "../components/DashboardHeader";
// import Sidebar from "../components/Sidebar";

// const DashboardLayout = ({ children }) => {
//   const [activeTab, setActiveTab] = useState("event-management");
//   // const { sidebarOpen } = useAppContext();

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <DashboardHeader />

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-auto">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


import { useLocation } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader.jsx";
import Sidebar from "../components/Sidebar.jsx";

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const activeTab = (() => {
    if (location.pathname.startsWith("/event-management")) return "event-management";
    if (location.pathname.startsWith("/volunteer-management")) return "volunteer-management";
    if (location.pathname.startsWith("/member-management")) return "member-management";
    if (location.pathname.startsWith("/dashboard")) return "dashboard";
    return "";
  })();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};
export default DashboardLayout;