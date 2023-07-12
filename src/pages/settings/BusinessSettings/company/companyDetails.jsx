import React, { useState } from 'react'
import Buttons from '../../../../components/buttons/button'
import CardWithTitle from '../../../../components/cards/cardWithTitle/cardWithTitle'
import RecentCheckIn from '../../../../components/cards/Profilecard/recentCheckIn'
import checkInData from '../../../../utils/checkInData'
import Company from './company'

const CompanyDetails = () => {
    const[showAddCompanyDetails , setAddComapnyDetails] = useState(false)

const onClickDivChange =()=>{
    setAddComapnyDetails((prev)=>!prev)
}

  return (
    <>

{
    showAddCompanyDetails ? <Company/> :  <>
    <div className=''>
        <div className='flex justify-content-end m-2 mt-3'>
            <Buttons onClick={onClickDivChange} label="Add Company Details" className="btn-dark border-none"></Buttons>
        </div>
        <div className='flex mt-2' >
        <div className='col' >
            <CardWithTitle title="General Details">
            <div className='card-height flex justify-content-between p-3'>
                <div className='font-semibold text-sm flex flex-column justify-content-between '>
<span>Company Id</span>
<span>Billing  Country</span>
<span>Company Name</span>
<span>Brand</span>
                </div>
<div className='flex flex-column justify-content-between'>
    {/* <span>Company Id</span>
<span>Billing  Country</span>
<span>Company Name</span>
<span>Brand</span> */}
</div>
            </div>
</CardWithTitle>
        </div>
<div className='col'>
    
            <CardWithTitle title="Address Details"  >
            <div className='card-height flex justify-content-between p-3'>
                <div className='font-semibold text-sm flex flex-column justify-content-between'>
<span>Country</span>
<span>Address 1</span>
<span>Address 2</span>
<span>City</span>
<span>State</span>
<span>Zip Code</span>
<span>Country Addresses</span>
                </div>
            </div>
</CardWithTitle>
        </div>
        </div>
        <div className='flex ' >
        <div className='col mt-3' >
            <CardWithTitle title="Contact Information    ">
            <div className='card-height flex justify-content-between p-3'>
                <div className='font-semibold text-sm flex flex-column justify-content-between '>
<span>Work Number</span>
<span>Work Extention</span>
<span>Fax Number</span>
<span>Primary Email</span>
<span>Alternate Email</span>
<span>Work Extention</span>
<span>Company URL</span>
                </div>
<div className='flex flex-column justify-content-between'>
    {/* <span>Company Id</span>
<span>Billing  Country</span>
<span>Company Name</span>
<span>Brand</span> */}
</div>
            </div>
</CardWithTitle>
        </div>
<div className='col mt-3'>

            <CardWithTitle title="Data Export Information"  >
            <div className='card-height flex justify-content-between p-3'>
                <div className='font-semibold text-sm flex flex-column justify-content-between'>
<span>Company Code</span>
<span>Batch ID</span>
<span></span>
<span></span>
<span></span>
<span></span>
<span></span>
                </div>
            </div>
</CardWithTitle>
        </div>
        </div>
        
        <div className='flex ' >
        <div className='col mt-3' >
            <CardWithTitle title="Remote Check Ins Information   ">
            <div className='card-height flex justify-content-between p-3'>
                <div className='font-semibold text-sm flex flex-column justify-content-between '>
                <span>Check In Limit</span>
<span>Per</span>
<span>Restriction Type</span>
<span>City</span>
<span>State</span>
<span>Zip Code</span>
<span>Country Addresses</span>
                </div>
<div className='flex flex-column justify-content-between'>
    {/* <span>Company Id</span>
<span>Billing  Country</span>
<span>Company Name</span>
<span>Brand</span> */}
</div>
            </div>
</CardWithTitle>
        </div>
<div className='col mt-3'>

            <CardWithTitle title="Club Credit Information"  >
            <div className='card-height flex justify-content-between p-3'>
                <div className='font-semibold text-sm flex flex-column justify-content-between'>
                <span>Club Credit Reset Day</span>
<span>Allow Secondary Members</span>
<span>Restriction Type</span>
<span></span>
<span></span>
<span></span>
<span></span>
                </div>
            </div>
</CardWithTitle>
        </div>
        </div>

        
        
    </div>
    <div>
        <RecentCheckIn data={checkInData}/>
    </div></> 
}

    
    </>
  )
}

export default CompanyDetails