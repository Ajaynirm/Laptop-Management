import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import {toast} from "react-hot-toast";

export const auth = create((set)=> ({
  
 AuthEmployee: null,
 AuthAdmin: null,

 isSigningUp: false,
 isLoggingIn: false,

 //we can check everytime even refresh the page (for loading component)
 isCheckingAdminAuth: true,
 isCheckingEmployAuth: true,

 //checking employee authentication by sending cookies received when employee login is success.     
  //by verifying cookies in backed with help of jwt 
 checkEmpAuth: async ()=> {
    try{
        const res = await axiosInstance("/auth/check-employee");
        set({AuthEmployee:res.data});
    }catch(e){
        set({AuthEmployee:null});
    }finally{
        set({isCheckingEmployAuth: false});
    }   
 },
//similarly for Admin..      
//by verifying cookies in backed with help of jwt 
 checkAdminAuth: async ()=> {
    try{
        const res= await axiosInstance.get("/auth/check-admin");
        set({AuthAdmin: res.data});

    }catch(e){
        set({AuthAdmin:null});
    }finally{
        set({isCheckingAdminAuth: false});
    }
 },
    //method for Admin login..
    AdmLogin: async (data) => {
        console.log(data)
        set({ isLoggingIn: true });
        try {
          console.log('started')
          const res = await axiosInstance.post("/auth/admin-login", data);
          set({ AuthAdmin: res.data });
          console.log(res.data);
          toast.success("Logged in successfully");
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
      },
      //Method for employee login
      EmpLogin: async (data) => {
        console.log(data)
        set({ isLoggingIn: true });
        try {
          console.log('started')
          const res = await axiosInstance.post("/auth/employee-login", data);
          set({ AuthEmployee: res.data });
          console.log(res.data);
          toast.success("Logged in successfully");
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isLoggingIn: false });
        }
      },
      // deleting the cookie jwt token to empty or delete it.,
      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },

    // i am not using it in frontend but api was build for this too..
      signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account created successfully");
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isSigningUp: false });
        }
      },
}));


