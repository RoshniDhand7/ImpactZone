import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCampaignGroupAction, UpdateCampaignGroupAction, addCampaignGroupAction, getCampaignsGroupAction } from '../../../../redux/actions/campaignsGroupAction';
import { useEffect } from 'react';
import { showAllFormErrors } from '../../../../utils/commonFunctions';
import { showToast } from '../../../../redux/actions/toastAction';
import FormValidation from '../../../../utils/AllFormValidation';
import { confirmDialog } from "primereact/confirmdialog";

const CampaignsGroupContainer = () => {
    const dispatch = useDispatch()
    const AllcampaignGroupData = useSelector((state)=>state.campaignsGroup.AllcampaignsGroup)
    const [showAddCampaignsGroup, setAddCampaignsGroup] = useState(false);
    const [initialCampaignGroupData,setInitialCampaignGroupData] = useState({})
    const [editCampaignGroup,setEditCampaignGroup] = useState(null)
    const [required,setRequired] = useState(["name"])
    const [campaignGroupData,setCampaignGroupData] = useState({
        isActive:true,
        name:''
    })

    console.log("campaignGroupData",campaignGroupData)
    const showcomponent = () => {
        setAddCampaignsGroup((prev) => !prev);
        if(editCampaignGroup){
          setEditCampaignGroup(null)
          setCampaignGroupData({...initialCampaignGroupData})
        }
      };

      const deleteConfirm = (id) => {
        console.log("test",id)
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
        dispatch(DeleteCampaignGroupAction(id)).then((data) => {
          // console.log("data", data);
          if (data.success) {
            dispatch(getCampaignsGroupAction());
          }
        });
      };
    
      const reject = () => {};


      const actionTemplate = (col) => {
        return (
          <>
            <div className="flex justify-content-end">
              <span onClick={()=>setEditCampaignGroup(col)}>
                <i className="pi pi-pencil  mr-3 cursor-pointer"></i>
              </span>
              <span onClick={() => deleteConfirm(col?._id)}>
                <i className="pi pi-trash cursor-pointer"></i>
              </span>
            </div>
          </>
        );
      };
      const CampaignsColumn = [
        {
          field: "name",
          header: "Campaigns Group Name",
          id: "",
          index: "",
        },
    
        { field: "", header: "", body: actionTemplate, id: "", index: "" },
      ];


const handleChangeCampaignGroup = ({name,value}) => {
  const formErrors = FormValidation(
    name,
    value,
    campaignGroupData,
    required,
    initialCampaignGroupData
  );
    setCampaignGroupData((prev)=>{
        return {
            ...prev,
            [name]:value,
            formErrors
        }
    })
}

const onSubmit = () =>{
  if (
    showAllFormErrors(campaignGroupData, setCampaignGroupData, required, initialCampaignGroupData)
  ) {
    if(editCampaignGroup){
      dispatch(UpdateCampaignGroupAction(campaignGroupData)).then((data)=>{
        if (data.success) {
          dispatch(getCampaignsGroupAction());
          const myTimeout = setTimeout(() => {
          setAddCampaignsGroup(false);
          setCampaignGroupData({...initialCampaignGroupData})
        }
          , 1000);

        }
      })
    }else{
      dispatch(addCampaignGroupAction(campaignGroupData)).then((data)=>{
        if (data.success) {
          dispatch(getCampaignsGroupAction());
          const myTimeout = setTimeout(() => {
            setAddCampaignsGroup(false);
            setCampaignGroupData({...initialCampaignGroupData})
          }
            , 1000);
        }
      })
    }
  }
  else{
    dispatch(
      showToast({
        severity: "error",
        summary: "Please Fill All Required Fields",
      })
    );
  } 
}

useEffect(()=>{
if(editCampaignGroup){
  let obj = {
    ...editCampaignGroup,
    isActive:editCampaignGroup.isActive,
    name:editCampaignGroup.name
  }
  setCampaignGroupData(obj)
  setAddCampaignsGroup(true)
}
},[editCampaignGroup])

useEffect(() => {
  setInitialCampaignGroupData(campaignGroupData)
 dispatch(getCampaignsGroupAction())
}, [])


  return {
    showcomponent,
    showAddCampaignsGroup,
    CampaignsColumn,
    AllcampaignGroupData,
    handleChangeCampaignGroup,
    campaignGroupData,
    onSubmit
  }
}

export default CampaignsGroupContainer