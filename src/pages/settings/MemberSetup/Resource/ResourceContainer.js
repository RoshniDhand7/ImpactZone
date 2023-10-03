import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getResourceType } from '../../../../redux/actions/resourceTypeAction'
import { useDispatch, useSelector } from 'react-redux'
import { getLocations } from '../../../../redux/actions/locationsActions'
import { getEvents } from '../../../../redux/actions/eventActions'
import { DeleteResource, UpdateResource, addResource, getResource } from '../../../../redux/actions/resourcesAction'
import { confirmDialog } from 'primereact/confirmdialog'
import { showAllFormErrors } from '../../../../utils/commonFunctions'
import { showToast } from '../../../../redux/actions/toastAction'
import FormValidation from '../../../../utils/AllFormValidation'

const ResourceContainer = () => {
  const dispatch = useDispatch()
  const [showAddService,setShowAddService] = useState(false)
const [selectedRow,setSelectedRow] = useState([])
const [showAddResource, setAddResource] = useState(false);
const [editResource,setEditResource] = useState(null)
const [initialResource,setInitialResource] = useState({})
const [required, setRequired] = useState(["name","resourceType","location","availableQuantity","usedInEvents","pastDue","services"]);
const allResources = useSelector((state)=>state.resources.allResource)
console.log("allResources",allResources)

  const [resource,setResource] = useState({
    isActive:true,
    name: "",
    resourceType: "",
    location: "",
    availableQuantity: "",
    usedInEvents: [],
    pastDue: "",
    services: []
  })


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
    dispatch(DeleteResource(id)).then((data) => {
      if (data.success) {
        dispatch(getResource());
      }
    });
  };

  const reject = () => {};


  const actionTemplate = (col) => {
    return (
      <>
        <div className="flex justify-content-end  ">
          <span onClick={()=>setEditResource(col)}>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          <span onClick={() => deleteConfirm(col?._id)}>
            <i className="pi pi-trash cursor-pointer"></i>
          </span>
        </div>
      </>
    );
  };

  const ResourceColumn = [
    {
      field: "name",
      header: "Resource Name",
      id: "",
      index: "",
    },
    {
      field: "resourceType.name",
      header: "Resource Type",
      id: "",
      index: "",
    },
    {
      field: "location.name",
      header: "Location",
      id: "",
      index: "",
    },
    {
      field: "availableQuantity",
      header: "Available",
      id: "",
      index: "",
    },
    {
      field: "pastDue",
      header: "Past Due",
      id: "",
      index: "",
    },

    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];

 const ResourceHandleChange = ({name,value}) => {
  const formErrors = FormValidation(
    name,
    value,
    resource,
    required,
    initialResource
  );
setResource((prev)=>{
  return{
    ...prev,
    [name]:value,
    formErrors
  }
})
 }

 const removeAll = () => {
  setResource((prev)=>{
    return{
      ...prev,
      services:[]
    }
  })
  delete resource?.formErrors?.services;
 }

 const openAddResource = () => {
  setAddResource((prev) => !prev);
  if(editResource){
    setEditResource(null)
    setResource({
      isActive:true,
    name: "",
    resourceType: "",
    location: "",
    availableQuantity: "",
    usedInEvents: [],
    pastDue: "",
    services: []
    })
  }
};

 const submit = () => {
  if (
    showAllFormErrors(resource, setResource, required, initialResource)
  ) {
  if(editResource){
  dispatch(UpdateResource(resource)).then((data)=>{
    if (data.success) {
      dispatch(getResource());
      const myTimeout = setTimeout(() => setAddResource(false), 1000);
    }
  });
}else{
  dispatch(addResource(resource)).then((data)=>{
    if (data.success) {
      dispatch(getResource());
      const myTimeout = setTimeout(() => setAddResource(false), 1000);
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
  }
 }

 useEffect(() => {
  if(editResource){
    let obj = {
      ...editResource,
      isActive: editResource.isActive,
  name: editResource.name,
  resourceType: editResource.resourceType._id,
  location: editResource.location._id,
  availableQuantity: editResource.availableQuantity,
  usedInEvents: editResource.usedInEvents?.map((item)=>{return item._id}),
  pastDue: parseInt(editResource.pastDue),
  services: editResource.services
    }
    setResource(obj)
    setAddResource(true)
  }
}, [editResource])

useEffect(() => {
  dispatch(getResourceType())
  dispatch(getLocations())
  dispatch(getEvents());
  dispatch(getResource())
  setInitialResource(resource);
}, [])


 




 console.log("resources",resource)
  return {resource,ResourceHandleChange,showAddService,setShowAddService,selectedRow,setSelectedRow,removeAll,submit,allResources,ResourceColumn,openAddResource,showAddResource,setAddResource}
   
}
export default ResourceContainer