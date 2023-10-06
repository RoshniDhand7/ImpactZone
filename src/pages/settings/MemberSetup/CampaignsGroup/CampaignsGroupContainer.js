import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCampaignGroupAction, getCampaignsGroupAction } from '../../../../redux/actions/campaignsGroupAction';
import { useEffect } from 'react';

const CampaignsGroupContainer = () => {
    const dispatch = useDispatch()
    const AllcampaignGroupData = useSelector((state)=>state.campaignsGroup.AllcampaignsGroup)
    const [showAddCampaignsGroup, setAddCampaignsGroup] = useState(false);
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
      // const [CampaignsData, setCampaignsData] = useState([
      //   {
      //     CampaignsGroupName: "Black Friday",
      //     description: "",
      //     index: "",
      //     id: "",
      //   },
      //   {
      //     CampaignsGroupName: "Coffee Cup Sleeve",
      //     description: "",
      //     index: "",
      //     id: "",
      //   },
      //   {
      //     CampaignsGroupName: "Direct Mailer",
      //     description: "Direct Mail",
      //     index: "",
      //     id: "",
      //   },
      //   {
      //     CampaignsGroupName: "Google Ad or Search",
      //     description: "Google Ad or Search",
      //     index: "",
      //     id: "",
      //   },
      //   {
      //     CampaignsGroupName: "Grocery Bag",
      //     description: "",
      //     index: "",
      //     id: "",
      //   },
      // ]);

const handleChangeCampaignGroup = ({name,value}) => {
    setCampaignGroupData((prev)=>{
        return {
            ...prev,
            [name]:value
        }
    })
}

const onSubmit = () =>{
    dispatch(addCampaignGroupAction(campaignGroupData))
}

useEffect(() => {
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