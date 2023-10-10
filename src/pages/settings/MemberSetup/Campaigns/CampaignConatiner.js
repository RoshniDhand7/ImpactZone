import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteCampaignAction,
  UpdateCampaignAction,
  addCampaignAction,
  getCampaignsAction,
} from "../../../../redux/actions/campaignAction";
import { getStateVAlue } from "../../../../redux/actions/stateAction";
import { getCampaignsGroupAction } from "../../../../redux/actions/campaignsGroupAction";
import { confirmDialog } from "primereact/confirmdialog";
import { showToast } from "../../../../redux/actions/toastAction";
import { showAllFormErrors } from "../../../../utils/commonFunctions";
import FormValidation from "../../../../utils/AllFormValidation";

const CampaignConatiner = () => {
  const dispatch = useDispatch();
  const AllcampaignGroupData = useSelector(
    (state) => state.campaignsGroup.AllcampaignsGroup
  ).map((item) => {
    return { label: item.name, value: item._id };
  });
  const campaignTypeOption = useSelector(
    (state) => state.staticData.campaignTypes
  );
  const [showAddCampaigns, setAddCampaigns] = useState(false);
  const [initialCampaignData, setInitialCampaignData] = useState({});
  const [editCampaign, setEditCampaign] = useState(null);
  const [required, setRequired] = useState([
    "name",
    "description",
    "campaignGroup",
    "campaignTypes",
  ]);
  const [campaignsForm, setCampaignsForm] = useState({
    isActive: true,
    name: "",
    description: "",
    campaignGroup: "",
    campaignTypes: [],
  });

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
    dispatch(DeleteCampaignAction(id)).then((data) => {
      if (data.success) {
        dispatch(getCampaignsAction());
      }
    });
  };

  const reject = () => {};



  const actionTemplate = (col) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span onClick={() => setEditCampaign(col)}>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          <span onClick={() => deleteConfirm(col?._id)}>
            <i className="pi pi-trash cursor-pointer"></i>
          </span>
        </div>
      </>
    );
  };

  const descriptionTemplate = (col) => {
    return(
    <div>
      {col.description.length >= 100 ? col.description.slice(0, 100)+"..." : col.description}
    </div>
    )
    
  }

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
      body: descriptionTemplate,
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
    if (editCampaign) {
      setEditCampaign(null);
      setCampaignsForm({ ...initialCampaignData });
    }
  };

  const campaignsHandleChange = ({ name, value }) => {
    const formErrors = FormValidation(
      name,
      value,
      campaignsForm,
      required,
      initialCampaignData
    );
    setCampaignsForm((prev) => {
      return {
        ...prev,
        [name]: value,
        formErrors,
      };
    });
  };

  const campaignPickerHandleChange = ({ name, value, source }) => {
    const formErrors = FormValidation(
      name,
      value,
      campaignsForm,
      required,
      initialCampaignData
    );
    setCampaignsForm((prev) => {
      return {
        ...prev,
        [name]: value,
        formErrors,
      };
    });

    dispatch(getStateVAlue(source, name));
  };

  const campaignSubmit = () => {
    if (
      showAllFormErrors(
        campaignsForm,
        setCampaignsForm,
        required,
        initialCampaignData
      )
    ) {
      if (editCampaign) {
        dispatch(UpdateCampaignAction(campaignsForm)).then((data) => {
          if (data.success) {
            dispatch(getCampaignsAction());
            const myTimeout = setTimeout(() => {
              setAddCampaigns(false);
              setCampaignsForm({ ...initialCampaignData });
            }, 1000);
          }
        });
      } else {
        dispatch(addCampaignAction(campaignsForm)).then((data) => {
          if (data.success) {
            dispatch(getCampaignsAction());
            const myTimeout = setTimeout(() => {
              setAddCampaigns(false);
              setCampaignsForm({ ...initialCampaignData });
            }, 1000);
          }
        });
      }
    } else {
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
  };

  useEffect(() => {
    if (editCampaign) {
      let obj = {
        ...editCampaign,
        isActive: editCampaign.isActive,
        name: editCampaign.name,
        description: editCampaign.description,
        campaignGroup: editCampaign.campaignGroup._id,
        campaignTypes: editCampaign.campaignTypes,
      };
      setCampaignsForm(obj);
      setAddCampaigns(true);
      let filteredCampaignTypeOption = campaignTypeOption.filter((item) => {
        return !editCampaign.campaignTypes.find((child) => {
          return item == child;
        });
      });
      dispatch(getStateVAlue(filteredCampaignTypeOption, "campaignTypes"));
    }
  }, [editCampaign]);

  useEffect(() => {
    setInitialCampaignData(campaignsForm);
    dispatch(getCampaignsGroupAction());
    dispatch(getCampaignsAction());
  }, []);

  return {
    showAddCampaigns,
    showcomponent,
    CampaignsColumn,
    campaignsHandleChange,
    campaignsForm,
    campaignPickerHandleChange,
    AllcampaignGroupData,
    campaignSubmit,
    campaignTypeOption,
  };
};

export default CampaignConatiner;
