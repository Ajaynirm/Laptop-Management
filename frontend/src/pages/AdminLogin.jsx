import React,{useState} from 'react';
import { auth } from '../lib/auth.js';
import toast from 'react-hot-toast';
const AdminLogin = () => {
    const {AdmLogin,isLoggin} = auth();
    const [formData, setFormData] = useState({
      email: "aj@gmail.com",
      password: "123456",
    });
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!formData.email || !formData.password){
        toast.error("enter all fields");
        return;
      }else if(formData.password.length <6){
        toast.error("enter valid password")
        return;
      }
      toast.promise(
        AdmLogin(formData),
        {
          loading: "Logging in...",
          success: "Login successful!",
          error: "Login failed. Please try again.",
        }
      )
    
    }
    if(isLoggin){
      return (
          <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
      </div>
      )
    }
    return (
      <>
        <div className="flex flex-col  justify-center items-center p-20 gap-4 ">
        <div>
            For using purpose - details are already filled
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <span className="label-text font-medium">Email</span>
            <label className="input input-bordered w-64 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" value={formData.email}
              onChange={(e)=>{setFormData({...formData,email: e.target.value})}}
              />
            </label>
            <span className="label-text font-medium">Password</span>
            <label className="input input-bordered w-64 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="password" className="grow" value={formData.password} 
              onChange={(e)=>{setFormData({...formData,password: e.target.value})}}
              />
            </label>
  
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggin}
            >
              Login as Admin
            </button>
          </form>
        </div>
      </>
    )
}

export default AdminLogin