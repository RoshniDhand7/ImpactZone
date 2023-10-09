import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCampaignsAction } from '../../../../redux/actions/campaignAction';

const CampaignConatiner = () => {
const dispatch = useDispatch()
    const [showAddCampaigns, setAddCampaigns] = useState(false);
    const actionTemplate = (col) => {
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
  
    const CampaignsColumn = [
      {
        field: "name",
        header: "Name",
        id: "",
        index: "",
      },
      {
        field: "description",
        header: "Description",
        id: "",
        index: "",
      },
      {
        field: "members",
        header: "# Members",
        id: "",
        index: "",
      },
      { field: "", header: "", body: actionTemplate, id: "", index: "" },
    ];
  
    const showcomponent = () => {
      setAddCampaigns((prev) => !prev);
    };


    useEffect(() => {
      dispatch(getCampaignsAction())
    }, [])
    

  return {
    showAddCampaigns,
    showcomponent,
    CampaignsColumn,
  }
}

export default CampaignConatiner