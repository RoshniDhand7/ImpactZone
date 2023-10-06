import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCampaignGroupAction, getCampaignsGroupAction } from '../../../../redux/actions/campaignsGroupAction';
import { useEffect } from 'react';
import { showAllFormErrors } from '../../../../utils/commonFunctions';
import { showToast } from '../../../../redux/actions/toastAction';
import FormValidation from '../../../../utils/AllFormValidation';

const CampaignsGroupContainer = () => {
    const dispatch = useDispatch()
    const AllcampaignGroupData = useSelector((state)=>state.campaignsGroup.AllcampaignsGroup)
    const [showAddCampaignsGroup, setAddCampaignsGroup] = useState(false);
    const [initialCampaignGroupData,setInitialCampaignGroupData] = useState({})
    const [required,setRequired] = useState(["name"])
    const [campaignGroupData,setCampaignGroupData] = useState({
        isActive:true,
        name:''
    })

    console.log("campaignGroupData",campaignGroupData)
    const showcomponent = () => {
        setAddCampaignsGroup((prev) => !prev);
      };
      const actionTemplate = (col) => {
        return (
          <>
            <div className="flex justify-content-end">
              <span>
                <i className="pi pi-pencil  mr-3 cursor-pointer"></i>
              </span>
              <span>
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
    dispatch(addCampaignGroupAction(campaignGroupData)).then((data)=>{
      if (data.success) {
        dispatch(getCampaignsGroupAction());
        const myTimeout = setTimeout(() => setAddCampaignsGroup(false), 1000);
      }
    })
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