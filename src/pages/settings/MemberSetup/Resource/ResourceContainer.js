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
import { FilterMatchMode, FilterOperator } from 'primereact/api';

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
  setSelectedRow([])
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


 const agreementCategoriesColumn = [
  {},
  {
    field: "name",
    header: "Item Name",
    id: "",
    index: "",
    sorting: true,
  },
  {
    field: "size",
    header: "Item UPC",
    id: "",
    index: "",
    sorting: true,
  },
  {
    field: "catelogPrice",
    header: "Price",
    id: "",
    index: "",
    sorting: true,
  },

];
const [agreementCategoriesData, setAgreementCategoriesData] = useState([
  {
    id: "a1",
    catelogPrice: "100",
    name: "agreements",
    size: "10",
    status: true,
  },
  {
    id: "a2",
    catelogPrice: "200",
    name: "Adults",
    size: "15",
    status: true,
  },
  {
    id: "a3",
    catelogPrice: "200",
    name: "Students",
    size: "15",
    status: true,
  },
  {
    id: "a4",
    catelogPrice: "150",
    name: "Corporate",
    size: "18",
    status: false,
  },
  {
    id: "a5",
    catelogPrice: "120",
    name: "Annual",
    size: "25",
    status: false,
  },
]);

const [globalFilterValue, setGlobalFilterValue] = useState('');
const [filters, setFilters] = useState({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const onGlobalFilterChange = (e) => {
  const value = e.target.value;
  let _filters = { ...filters };

  _filters['global'].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
};





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
    setSelectedRow(editResource.services.map((item)=>{return {id:item.id,catelogPrice:item.catelogPrice,name:item.name,size:item.size.toString(),status:item.status}}))
  }
}, [editResource])

console.log("selectedrow",selectedRow)

useEffect(() => {
  dispatch(getResourceType())
  dispatch(getLocations())
  dispatch(getEvents());
  dispatch(getResource())
  setInitialResource(resource);
}, [])


 




 console.log("resources",resource)
  return {resource,ResourceHandleChange,showAddService,setShowAddService,selectedRow,setSelectedRow,removeAll,submit,allResources,ResourceColumn,openAddResource,showAddResource,setAddResource,agreementCategoriesColumn,agreementCategoriesData,globalFilterValue,filters,onGlobalFilterChange}
   
}
export default ResourceContainer