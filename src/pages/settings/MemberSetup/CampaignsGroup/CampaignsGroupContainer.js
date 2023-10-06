import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const CampaignsGroupContainer = () => {
    const dispatch = useDispatch()
    const [showAddCampaignsGroup, setAddCampaignsGroup] = useState(false);
    const [campaignGroupData,setCampaignGroupData] = useState({
        isActive:true,
        name:''
    })
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
          field: "CampaignsGroupName",
          header: "Campaigns Group Name",
          id: "",
          index: "",
        },
    
        { field: "", header: "", body: actionTemplate, id: "", index: "" },
      ];
      const [CampaignsData, setCampaignsData] = useState([
        {
          CampaignsGroupName: "Black Friday",
          description: "",
          index: "",
          id: "",
        },
        {
          CampaignsGroupName: "Coffee Cup Sleeve",
          description: "",
          index: "",
          id: "",
        },
        {
          CampaignsGroupName: "Direct Mailer",
          description: "Direct Mail",
          index: "",
          id: "",
        },
        {
          CampaignsGroupName: "Google Ad or Search",
          description: "Google Ad or Search",
          index: "",
          id: "",
        },
        {
          CampaignsGroupName: "Grocery Bag",
          description: "",
          index: "",
          id: "",
        },
      ]);

const handleChangeCampaignGroup = ({name,value}) => {
    setCampaignGroupData((prev)=>{
        return {
            ...prev,
            [name]:value
        }
    })
}

const onSubmit = () =>{
    dispatch()
}

  return {
    showcomponent,
    showAddCampaignsGroup,
    CampaignsColumn,
    CampaignsData,
    handleChangeCampaignGroup,
    campaignGroupData
  }
}

export default CampaignsGroupContainer