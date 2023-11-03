import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembershipPlans } from '../../../../redux/actions/membershipPlansAction';
import { useEffect } from 'react';
import { Chips } from "primereact/chips";

const MembershipContainer = () => {
const dispatch = useDispatch()

const AllMembershipPlan = useSelector((state)=>state.membershipPlans.membershipPlans)
console.log("AllMembershipPlan",AllMembershipPlan)
// const [memberPlanData,setMemberPlanData] = useState([])
    const [addPaymentPlans, setPaymentPlans] = useState(false);

    const onClickChangePage = () => {
      setPaymentPlans((prev) => !prev);
    };

    const actionTemplate = (col) => {
        // console.log(col._id, "collllll");
        return (
          <>
            <div className="flex justify-content-end">
              <span>
                <i className="pi pi-pencil mr-3 cursor-pointer"></i>
              </span>
              <span>
                <i className="pi pi-trash cursor-pointer"></i>
              </span>
            </div>
          </>
        );
      };

    const clubsTemplate = (col) => {
        return (
            <div>
                {col?.clubs[0]?.name}
                {/* <Chips value={clubs} separator="," /> */}
            </div>
        )
    }
    const categoryTemplate = (col) => {
      return (
<div>{col?.category?.name}</div>
      )
    }
    
      const ManagePaymentPlansColumn = [
        {
          field: "name",
          header: "Plan Name",
          id: "",
          index: "",
        },
        {
          field: "clubs",
          header: "Clubs",
          id: "",
          index: "",
          body: clubsTemplate,
        },
        {
          field: "category",
          header: "Category",
          id: "",
          index: "",
          body: categoryTemplate
        },
        {
          field: "membershiptype",
          header: "Membership Type",
          id: "",
          index: "",
        },
        {
          field: "noofmembers",
          header: "No.of Members",
          id: "",
          index: "",
        },
        {
          field: "soldonline",
          header: "Sold Online",
          id: "",
          index: "",
        },
    
        {
          field: "availability",
          header: "Availability",
          id: "",
          index: "",
        },
        {
          field: "",
          header: "",
          id: "",
          body: actionTemplate,
        },
      ];

    //   const [ManagePaymentPlansData, setManagePaymentPlansData] = useState([
    //     {
    //       planname: "Annual Fee",
    //       category: "Annual Fee",
    //       membershiptype: "$49.99",
    //       noofmembers: "01/03/2022",
    //       clubs: "30591",
    //       soldonline: "",
    //       availability: "",
    //     },
    //     {
    //       planname: "Late Fee",
    //       category: "-",
    //       membershiptype: "$49.99",
    //       noofmembers: "01/03/2022",
    //       clubs: "30591",
    //       soldonline: "",
    //       availability: "",
    //     },
    //     {
    //       planname: "Decline Fee",
    //       category: "-",
    //       membershiptype: "$49.99",
    //       noofmembers: "01/03/2022",
    //       clubs: "30591",
    //       soldonline: "",
    //       availability: "",
    //     },
    //     {
    //       planname: "No Show Fee",
    //       category: "GymAccess",
    //       membershiptype: "$49.99",
    //       noofmembers: "01/03/2022",
    //       clubs: "30591",
    //       soldonline: "",
    //       availability: "",
    //     },
    //     {
    //       planname: "Freeze Fee",
    //       category: "Unassigned",
    //       membershiptype: "$49.99",
    //       noofmembers: "01/03/2022",
    //       clubs: "30591",
    //       soldonline: "",
    //       availability: "",
    //     },
    //   ]);


      const handleChangeMember = () => {

      }

      // useEffect(() => {
      //   if(AllMembershipPlan.length>0){
      //     let mainData = []
      //     AllMembershipPlan.map((item)=>{
      //       let club = []
      //       let category = ""
      //       // item?.clubs?.map((item)=>{
      //       //   let obj = {
      //       //     name:item.name,
      //       //     // id:item._id
      //       //   }
      //       //   club.push(obj)
      //       // })

      //       let mainObj = {
      //         ...item,
      //         clubs:club,
      //       category:category
      //       }
      //       mainData.push(mainObj)
      //     })
      //     setMemberPlanData(mainData)
      //     // setMemberPlanData({
      //     //   ...AllMembershipPlan,
      //     //   clubs:club,
      //     //   category:category
      //     // })
      //   }
        
      // }, [AllMembershipPlan])
      
// console.log("memberPlanData",memberPlanData)
      useEffect(() => {
        dispatch(getMembershipPlans())
      }, [])
      

  return {
    ManagePaymentPlansColumn,
    addPaymentPlans,
    onClickChangePage,
    AllMembershipPlan
  }
}

export default MembershipContainer