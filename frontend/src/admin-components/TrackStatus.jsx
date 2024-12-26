import React,{useState} from 'react'
import { AdNav } from '../components/AdNav'

const TrackStatus = () => {
  const [Assignment,setAssignment]=useState(null);
  return (
    <>
    <AdNav />
        <div className='flex flex-col justify-center items-center'>
          <div className='text-green-700'>Track status</div>

          {/* search  */}
          <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>

            {/* track the maintenance */}
            <div>maintenence</div>

            
        </div>
    </>
    
  )
}

export default TrackStatus