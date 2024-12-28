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
import UpdateLaptop from "./admin-components/UpdateLaptop.jsx";
import DeleteLaptop from "./admin-components/DeleteLaptop.jsx";
import ViewEmployee from "./admin-components/ViewEmployee.jsx";
import AddEmployee  from "./admin-components/AddEmployee.jsx";
import AddMaintenance from "./admin-components/AddMaintenance.jsx";

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
        <Route path="/manage" element={AuthAdmin ? <ManageLap/>: <Navigate to="/admin-login" />} /> 

        <Route path="/update-laptop" element={AuthAdmin ? <UpdateLaptop/>: <Navigate to="/admin-login" />} />
        <Route path="/delete-laptop" element={AuthAdmin ? <DeleteLaptop/>: <Navigate to="/admin-login" />} />

        <Route path="/assign" element={AuthAdmin ? <AssignLap/>: <Navigate to="/admin-login" />} />  
        <Route path="/track" element={AuthAdmin ? <TrackStatus/>: <Navigate to="/admin-login" />} />  
        <Route path="/view" element={AuthAdmin ? <ViewReport/>: <Navigate to="/admin-login" />} />  
        <Route path="/add-lap" element={AuthAdmin ? <AddLaptop />: <Navigate to="/admin-login" />} /> 
        
        {/* need to setup later*/}
        <Route path="/update-employe" element={AuthAdmin ? <AssignLap/>: <Navigate to="/admin-login" />} />  
        <Route path="/delete-employe" element={AuthAdmin ? <TrackStatus/>: <Navigate to="/admin-login" />} /> 

        {/* protected route for authenticated employee */}
        <Route path="/emp" element={AuthEmployee ? <EmployHome/> : <Navigate to="/employee-login" />} />  
        <Route path="/my-assign" element={AuthEmployee ? <ViewAssigLap/> : <Navigate to="/employee-login" />} /> 
        <Route path="/request-laptop" element={AuthEmployee ? <RequestLap/> : <Navigate to="/employee-login" />} /> 
        


          <Route path="/view-emp" element={AuthAdmin ? <ViewEmployee/> : <Navigate to="/Admin-login" />} />
          <Route path="/add-emp" element={AuthAdmin ? <AddEmployee /> : <Navigate to="/Admin-login" />} />
          <Route path="/add-maintain" element={AuthAdmin ? <AddMaintenance /> : <Navigate to="/Admin-login" />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App;
