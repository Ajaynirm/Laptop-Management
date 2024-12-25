import React, { useState } from 'react'
import { AdNav } from '../components/AdNav'

const ViewReport = () => {
  const [report,setReport] = useState(null);
  return (
    <>
    <AdNav />
        <div>ViewReport</div>
    </>
    
  )
}

export default ViewReport


