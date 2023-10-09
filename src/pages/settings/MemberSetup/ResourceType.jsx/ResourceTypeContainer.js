import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteResourceType, UpdateResourceType, addResourceType, getResourceType } from "../../../../redux/actions/resourceTypeAction";
import { useEffect } from "react";
import { confirmDialog } from "primereact/confirmdialog";
import { showAllFormErrors } from "../../../../utils/commonFunctions";
import { showToast } from "../../../../redux/actions/toastAction";
import FormValidation from "../../../../utils/AllFormValidation";

const ResourceTypeContainer = () => {
  const dispatch = useDispatch()
  const ResourceTypeData = useSelector((state)=>state.resourceType.allResourceType)
  const [showAddResourceType, setAddResourceType] = useState(false);
  const [editResourceTypeData, setEditResourceTypeData] = useState(null)
  const [initialResourceTypeData,setInitialResourceTypeData] = useState({})
  const [required, setRequired] = useState(["name","description"]);
  const [resourceType, setResourceType] = useState({
    isActive: true,
    name: "",
    description: "",
  });
  const resourceTypeHandleChange = ({name,value}) => {
    const formErrors = FormValidation(
      name,
      value,
      resourceType,
      required,
      initialResourceTypeData
    );
    setResourceType((prev) => {
      return {
        ...prev,
        [name]:value,
        formErrors
      };
    });
  };

  const resourceTypeSubmit = () => {
    if (
      showAllFormErrors(resourceType, setResourceType, required, initialResourceTypeData)
    ) {
    if(editResourceTypeData){
      dispatch(UpdateResourceType(resourceType)).then((data)=>{
        if (data.success) {
          dispatch(getResourceType());
          const myTimeout = setTimeout(() => {
            setAddResourceType(false);
            setResourceType({...initialResourceTypeData})
          }, 1000);
        }
      });
    }else{
      dispatch(addResourceType(resourceType)).then((data)=>{
        if (data.success) {
          dispatch(getResourceType());
          const myTimeout = setTimeout(() => {
            setAddResourceType(false);
            setResourceType({...initialResourceTypeData})
          }, 1000);
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
    dispatch(DeleteResourceType(id)).then((data) => {
      if (data.success) {
        dispatch(getResourceType());
      }
    });
  };

  const reject = () => {};

  const actionTemplate = (col) => {
    return (
      <>
        <div className="flex justify-content-end  ">
          <span onClick={()=>setEditResourceTypeData(col)}>
            <i className="pi pi-pencil mr-3 cursor-pointer" ></i>
          </span>
          <span onClick={() => deleteConfirm(col?._id)}>
            <i className="pi pi-trash cursor-pointer" ></i>
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

  // const statusTemplate = (col) => {
  //   return(
  //     <div>
  //       {col.isActive==true ? "Active" : "Inactive"}
  //     </div>
  //   )
  // }

  const ResourceTypeColumn = [
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
    // {
    //   field:"isActive",
    //   header: "Status",
    //   id:"",
    //   index:"",
    //   body: statusTemplate,
    // },

    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];

  const openADDResourceType = () => {
    setAddResourceType((prev) => !prev);
    if(editResourceTypeData){
      setEditResourceTypeData(null)
      setResourceType({...initialResourceTypeData})
    }
  };

  useEffect(() => {
    if(editResourceTypeData){
      let obj = {
        ...editResourceTypeData,
        isActive: editResourceTypeData.isActive,
    name: editResourceTypeData.name,
    description: editResourceTypeData.description,
      }
      setResourceType(obj)
      setAddResourceType(true)
    }
  }, [editResourceTypeData])
  

  useEffect(() => {
    setInitialResourceTypeData(resourceType);
   dispatch(getResourceType())
  }, [])



  

 
  return { resourceType, resourceTypeHandleChange,resourceTypeSubmit,ResourceTypeColumn,setAddResourceType,showAddResourceType,openADDResourceType,ResourceTypeData };
};

export default ResourceTypeContainer;
