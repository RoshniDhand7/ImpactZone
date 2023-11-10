import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAssessedFee, UpdateAssessedFee, addAssessedFee, getAssessed } from '../../../../redux/actions/assessedAction';
import { useEffect } from 'react';
import { Chips } from "primereact/chips";
import { getClubs } from '../../../../redux/actions/clubsActions';
import { getMembershipPlans } from '../../../../redux/actions/membershipPlansAction';
import { confirmDialog } from "primereact/confirmdialog";
import { showAllFormErrors } from '../../../../utils/commonFunctions';
import FormValidation from '../../../../utils/AllFormValidation';
import { showToast } from '../../../../redux/actions/toastAction';
import { Tag } from 'primereact/tag';


const AssessedContainer = () => {
    const dispatch = useDispatch()
    const [addAssessedFees, setAddAssessedFee] = useState(false);
    const [clubs, setClubs] = useState([]);
    const [membershipPlan,setMembershipPlan] = useState([])
    const allAssessedData = useSelector((state)=>state.Assessed.AllAssessed)
    const AllMembershipPlan = useSelector((state)=>state.membershipPlans.membershipPlans)
    const allClubs = useSelector((state) => state.clubs.clubs);
    const [initialAssessedInfo,setInitialAssessedInfo] = useState([])
    const [assesedInfo,setAssesedInfo] = useState({
      isActive:true,
      name: null,
    type: null,
    profitCenter: null,
    amount: null,
    preferedDueDate: null,
    clubs: [],
    recurring: null,
    monthAndDate: null,
    membershipPlans: [],
    pastDue: null,
    noOfDays: null,
    noOfMonths:null,
    clubsOption:[],
    membershipOption:[],
    })

    const [editAssessedData, setEditAssessedData] = useState(null)
    const [required, setRequired] = useState(["name","type","profitCenter","amount","clubs",]);

console.log("assesedInfo",assesedInfo)

    const dateBodyTemplate = (rowData) => {
        let start_data = new Date(rowData.createdAt).toLocaleDateString()
return (
    <div>
        {start_data}
    </div>
        
)
    }

    const clubsBodyTemplate = (col) => {
    // let newClub = col?.clubs?.map((item)=>{return item.name})
      return (
        <div>
          {/* {col?.membershipPlans[0]?.name} */}
         { col?.clubs?.map((item)=>{return <Tag value={item.name}></Tag>})}
          
          {/* <Chips value={newClub} disabled/> */}
        </div>
      )
    }

    const deleteConfirm = (id) => {
      confirmDialog({
        message: "Do you want to delete this record?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        acceptClassName: "p-button-danger",
        rejectClassName: "cancel-button",
        accept: () => acceptFunc(id),
        reject,
      });
    };
    const acceptFunc = (id) => {
      dispatch(DeleteAssessedFee(id)).then((data) => {
        if (data.success) {
          dispatch(getAssessed());
        }
      });
    };
  
    const reject = () => {};

    const actionTemplate = (col) => {
      // console.log(col._id, "collllll");
      return (
        <>
          <div className="flex justify-content-start">
            <span onClick={()=>setEditAssessedData(col)}>
              <i className="pi pi-pencil mr-3 cursor-pointer"></i>
            </span>
            <span onClick={() => deleteConfirm(col?._id)}>
              <i className="pi pi-trash cursor-pointer"></i>
            </span>
          </div>
        </>
      );
    };

    const assessedColumn = [
        {
          field: "name",
          header: "Name",
          id: "",
          index: "",
        },
        {
          field: "profitCenter",
          header: "Profit Center",
          id: "",
          index: "",
        },
        {
          field: "amount",
          header: "Amount",
          id: "",
          index: "",
        },
        {
          field: "startdate",
          header: "Start Date",
          id: "",
          index: "",
          body:dateBodyTemplate
        },
        {
          field: "clubs",
          header: "Clubs",
          id: "",
          index: "",
          body:clubsBodyTemplate
        },
        {
          field: "",
          header: "Action",
          id: "",
          body: actionTemplate,
        },
      ];

      const onClickAddFees = () => {
        setAddAssessedFee((prev) => !prev);
        if(editAssessedData){
          setEditAssessedData(null)
          setAssesedInfo({...initialAssessedInfo})
        }
      };

      const handleChangeAssessed = ({name,value}) => {
        const formErrors = FormValidation(
          name,
          value,
          assesedInfo,
          required,
          initialAssessedInfo
        );
        setAssesedInfo((prev)=>{
          return {
            ...prev,
            [name]:value,
            formErrors
          }
        })
      }

      const AssessedPickerHandleChange = ({ name, value, source }) => {
        if(name=="clubsOption"){
          let clubsNew = value.map((item) => {
            return item._id;
          });
          const formErrors = FormValidation(
            "clubs",
            value,
            assesedInfo,
            required,
            initialAssessedInfo
          );
          setAssesedInfo((prev) => {
            return {
              ...prev,
              [name]: value,
              clubs: clubsNew,
              formErrors
            };
          });
          setClubs(source);
        }
        else{
          let memberNew = value.map((item) => {
            return item._id;
          });
          const formErrors = FormValidation(
            "membershipPlans",
            value,
            assesedInfo,
            required,
            initialAssessedInfo
          );
          setAssesedInfo((prev) => {
            return {
              ...prev,
              [name]: value,
              membershipPlans: memberNew,
              formErrors
            };
          });
          setMembershipPlan(source);
        }
      }

      const save = () => {
        if (
          showAllFormErrors(assesedInfo, setAssesedInfo, required, initialAssessedInfo)
        ) {
        if(editAssessedData){
          dispatch(UpdateAssessedFee(assesedInfo)).then((data)=>{
            if (data.success) {
              dispatch(getAssessed());
              const myTimeout = setTimeout(() => {
                setAddAssessedFee(false);
                setAssesedInfo({...initialAssessedInfo})
              }, 1000);
            }
          });
        }else{
          
          dispatch(addAssessedFee(assesedInfo)).then((data)=>{
            if (data.success) {
              dispatch(getAssessed());
              const myTimeout = setTimeout(() => {
                setAddAssessedFee(false);
                setAssesedInfo({...initialAssessedInfo})
              }, 1000);
            }
          });
        }
      }
      else{
        dispatch(
          showToast({
            severity: "error",
            summary: "Please Fill All Required Fields",
          })
        );
        window.scrollTo({
          top: 250,
          left: 0,
          behavior: "smooth",
        });
      }
        
      }

      useEffect(() => {
        if(editAssessedData){
          // let Newclubs = editAssessedData?.clubs?.map((item)=>{return item._id})
          // let NewmemberShip = editAssessedData?.membershipPlans?.map((item)=>{return item._id})

          let obj = {
            ...editAssessedData,
            isActive:editAssessedData.isActive,
          name: editAssessedData.name,
        type: editAssessedData.type,
        profitCenter: editAssessedData.profitCenter,
        amount: editAssessedData.amount,
        preferedDueDate: editAssessedData.preferedDueDate,
        clubs: editAssessedData?.clubs?.map((item)=>{return item._id}),
        recurring: editAssessedData.recurring,
        // monthAndDate: editAssessedData.recurring,
        membershipPlans: editAssessedData?.membershipPlans?.map((item)=>{return item._id}),
        pastDue: parseInt(editAssessedData.pastDue),
        noOfDays: editAssessedData.noOfDays,
        noOfMonths:editAssessedData.noOfMonths,
        clubsOption:editAssessedData.clubs,
        membershipOption:editAssessedData.membershipPlans,
          }
        let NewClub = clubs.filter((item)=>{return !editAssessedData.clubs.find((child)=>{return item._id===child._id})})
        let NewMember = membershipPlan.filter((item)=>{return !editAssessedData.membershipPlans.find((child)=>{return item._id===child._id})})
        setClubs(NewClub)
        setMembershipPlan(NewMember)

          setAssesedInfo(obj)
          setAddAssessedFee(true)
          
        }
        
      }, [editAssessedData])
      

      useEffect(() => {
        setClubs(allClubs);
      }, [allClubs]);

      useEffect(()=>{
        setMembershipPlan(AllMembershipPlan)
      },[AllMembershipPlan])


useEffect(() => {
    dispatch(getAssessed())
    dispatch(getClubs());
    dispatch(getMembershipPlans())
    setInitialAssessedInfo(assesedInfo)
}, [])


  return {
    assessedColumn,
    allAssessedData,
    onClickAddFees,
    addAssessedFees,
    assesedInfo,
    handleChangeAssessed,
    clubs,
    AssessedPickerHandleChange,
    membershipPlan,
    save
  }
}

export default AssessedContainer