import { Routes,Route,Navigate } from "react-router-dom"
import { useEffect } from "react";
import { auth } from "./lib/auth.js";


import {Loader} from "lucide-react";
import { Toaster } from "react-hot-toast";

import BootPage from "./pages/BootPage.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import EmployHome from "./pages/EmployHome.jsx";
import ManageLap from "./admin-components/ManageLap.jsx";
import AssignLap from "./admin-components/AssignLap.jsx";
import TrackStatus from "./admin-components/TrackStatus.jsx";
import ViewReport from "./admin-components/ViewReport.jsx";
import AddLaptop from "./admin-components/AddLaptop.jsx";
import ViewAssigLap from "./emp-components/ViewAssigLap.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import EmployLogin from "./pages/EmployLogin.jsx";
import RequestLap from "./emp-components/RequesLap.jsx"
import ReportIssue from "./emp-components/ReportIssue.jsx";

function App() {
  const {AuthAdmin,AuthEmployee,checkAdminAuth,checkEmpAuth, isCheckingAdminAuth,isCheckingEmployAuth}  = auth();

  // updating Authentication of admin
  useEffect(()=> {
    checkEmpAuth();
  },[checkEmpAuth]);
  // updating Authentication of employee
  useEffect(()=> {
    checkAdminAuth();
  },[checkAdminAuth]);
  
if(isCheckingAdminAuth && !AuthAdmin || isCheckingEmployAuth && !AuthEmployee) 
  return (
    <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
    </div>
  );


  return (
    <>
      

      <Routes>
        {/* Booting Page */}
        <Route path="/" element={<BootPage/>} /> 

        {/* Login page if not authenticated admin or employee otherwise go to their respective Home page */}
        <Route path="/admin-login" element={!AuthAdmin ? <AdminLogin />: <Navigate to="/admin" />} />
        <Route path="/employee-login" element={!AuthEmployee ? <EmployLogin /> :<Navigate to="/emp" />} />

        {/* All admin activities are enabled only they are authenticated abd saved using AuthAdmin global state by Zustand.. */}
        <Route path="/admin" element={AuthAdmin ?<AdminHome/> : <Navigate to="/admin-login" />} />  
        <Route path="/emp" element={AuthAdmin ? <EmployHome/> : <Navigate to="/admin-login" />} />      
        <Route path="/manage" element={AuthAdmin ? <ManageLap/>: <Navigate to="/admin-login" />} /> 

        <Route path="/assign" element={AuthAdmin ? <AssignLap/>: <Navigate to="/admin-login" />} />  
        <Route path="/track" element={AuthAdmin ? <TrackStatus/>: <Navigate to="/admin-login" />} />  
        <Route path="/view" element={AuthAdmin ? <ViewReport/>: <Navigate to="/admin-login" />} />  
        <Route path="/add-lap" element={AuthAdmin ? <AddLaptop />: <Navigate to="/admin-login" />} /> 

        {/* protected route for authenticated employee */}
        <Route path="/my-assign" element={AuthEmployee ? <ViewAssigLap/> : <Navigate to="/employee-login" />} /> 
        <Route path="/request-laptop" element={AuthEmployee ? <RequestLap/> : <Navigate to="/employee-login" />} /> 
        <Route path="/report-issue" element={AuthEmployee ? <ReportIssue/> : <Navigate to="/employee-login" />} /> 
          
      </Routes>
   
    </>
  )
}

export default App
