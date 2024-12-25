import React ,{useState} from 'react'
import { axiosInstance } from '../lib/axios';

const AddLaptop = () => {
  const [formData,setFormData]=useState({
    id:"",
    brand:"",
    model:"",
    serialNumber:"",
    purchaseDate:""
  });
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      await axiosInstance.post("/laptop/add-laptop",formData);
    }catch(e){
      console.log(e.mesage);
    }
  }
  return (
    <>
        <div className='flex flex-col justify-center items-center'>
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    {/* id */}
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-control" >
          <label className="label">
            <span className="label-text">Laptop ID</span>
          </label>
          <input type="text" placeholder="ID" className="input input-bordered" required onChange={(e)=>setFormData({...formData,id:e.target.value})} />
        </div>

        {/* brand */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Brand</span>
          </label>
          <input type="text" placeholder="Brand" className="input input-bordered" required onChange={(e)=>setFormData({...formData,brand:e.target.value})}/>
        </div>
        {/* model */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">model</span>
          </label>
          <input type="text" placeholder="model" className="input input-bordered" required  onChange={(e)=>setFormData({...formData,model:e.target.value})}/>
        </div>

          {/* serial Number */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Serial Number</span>
          </label>
          <input type="text" placeholder="ex.123e123" className="input input-bordered" required onChange={(e)=>setFormData({...formData,serialNumber:e.target.value})}/>
        </div>

          {/* purchaseDate */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Purchase Date</span>
          </label>
          <input type="date"  className="input input-bordered" required onChange={(e)=>{setFormData({...formData,purchaseDate:e.target.value})}}/>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" type='submit'>Add Laptop</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    </>
  )
}

export default AddLaptop;