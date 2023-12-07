import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteVendor, UpdateVendor, addVendor, getVendor } from '../../../../redux/actions/VendorAction';
import { useEffect } from 'react';
import { showToast } from '../../../../redux/actions/toastAction';
import { showAllFormErrors } from '../../../../utils/commonFunctions';
import FormValidation from '../../../../utils/AllFormValidation';
import { confirmDialog } from "primereact/confirmdialog";
import { Country, State, City } from 'country-state-city';
// import us from 'us';

const VendorContainer = () => {
    const dispatch = useDispatch()
    const AllVendorData = useSelector((state)=>state.VendorReducer.allVendor)
    const [showAddVendor, setShowAddVendor] = useState();
    const [vendorOptions,setVendorOptions] = useState([])
    const [vendorForm,setVendorForm] = useState({
        name: "",
    address1: "",
    address2: "",
    city: "", 
    state: "", 
    zipCode: "", 
    contact: "", 
    phone: "",
    email: "",
    alternateVendors: null,
    isActive : true
    })

    const [initialVendorForm,setInitialVendorForm] = useState({})
    const [required, setRequired] = useState(["name"])
    const [editVendor,setEditVendor] = useState(null)
    const [statusData,setStatusData] = useState(true)
    // const [usStates,setUsStates] = useState()


    const statusOptions = [
        {label:"Active",value:true},
        {label:"InActive",value:false}
      ]

// const usStates = []
// console.log("state",State.getStatesOfCountry("US"))
// console.log("city",City.getCitiesOfState("US","AK"))
    // const usStates = Object.values(us.states).map((item)=>{return item.name})
    // console.log("usStates",us)
    console.log("form",vendorForm)

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
        dispatch(DeleteVendor(id)).then((data) => {
          if (data.success) {
            dispatch(getVendor());
          }
        });
      };
      
      const reject = () => { };

    const actionTemplate = (col) => {
        return (
          <>
            <div className="flex justify-content-end">
              <span onClick={() => setEditVendor(col)}>
                <i className="pi pi-pencil mr-3 cursor-pointer"></i>
              </span>
              <span onClick={() => deleteConfirm(col?._id)}>
                <i className="pi pi-trash cursor-pointer"></i>
              </span>
            </div>
          </>
        );
      };

      const discountTemplate = (col) => {
        return(
            <div>0.00</div>
        )
      }

      const alternateTemplate = (col) => {
        return (
            <div>
                {col?.alternateVendors?.name ? col?.alternateVendors?.name : "--"}
            </div>
        )
      }

      const alternateNumberTemplate = (col) => {
        return (
          <div>
            {col?.phone?.length>0 ? col?.phone : "--"}
          </div>
        )
      }

      const contactTemplate = (col) => {
        return (
          <div>
            {col?.contact?.length>0 ? col?.contact : "--"}
          </div>
        )
      }

      const VendorColumn = [
        {
          field: "name",
          header: "Vendor Name",
          id: "",
          index: "",
        },
        {
          field: "contact",
          header: "Phone no.",
          id: "",
          index: "",
          body:contactTemplate
        },
        {
          field: "phone",
          header: "Alternative no.",
          id: "",
          index: "",
          body:alternateNumberTemplate
        },
        {
          field: "Disconut",
          header: "Disconut",
          id: "",
          index: "",
          body:discountTemplate
        },
        {
          field: "AlternateVendor",
          header: "Alternate Vendor",
          id: "",
          index: "",
          body:alternateTemplate
        },
        {
          field: "",
          header: "",
          id: "",
          body: actionTemplate,
        },
      ];

const vendorHandleChange = ({name,value}) => {
    const formErrors = FormValidation(
        name,
        value,
        vendorForm,
        required,
        initialVendorForm
      );
    setVendorForm((prev)=>{
        return{
            ...prev,
            [name]:value,
            formErrors
        }
    })
}

const save = () => {
    if (
      showAllFormErrors(
        vendorForm,
        setVendorForm,
        required,
        initialVendorForm
      )
    ) {
    if(editVendor){
      dispatch(UpdateVendor(vendorForm)).then(
        (data) => {
          if (data.success) {
            dispatch(getVendor())
            setShowAddVendor(false);
            setVendorForm({ ...initialVendorForm });
          }
        }
      );
    }
    else{
      dispatch(addVendor(vendorForm)).then(
        (data) => {
          if (data.success) {
            dispatch(getVendor())
            setShowAddVendor(false);
            setVendorForm({ ...initialVendorForm });
          }
        }
      );
    }
  }
  else {
    dispatch(
      showToast({
        severity: "error",
        summary: "Please Fill All Required Fields",
      })
    );
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  }

  const Back = () => {
    setShowAddVendor((prev) => !prev);
    if (editVendor) {
      setEditVendor(null);
      setVendorForm({ ...initialVendorForm });
    }
  };

  useEffect(() => {
    if (editVendor) {
      let obj = {
        ...editVendor,
        isActive: editVendor?.isActive,
        name: editVendor?.name,
        address1: editVendor?.address1,
        address2: editVendor?.address2,
        city: editVendor?.city,
        state: editVendor?.state,
        zipCode: editVendor?.zipCode,
        contact: editVendor?.contact,
        phone: editVendor?.phone,
        email: editVendor?.email,
        alternateVendors: editVendor?.alternateVendors?._id,
        isActive: editVendor?.isActive,
      };
      
      setVendorForm(obj);
      setShowAddVendor(true);
      let filterVendorOption = AllVendorData?.filter((item)=>{return item?._id!==editVendor?._id&&item.isActive==true})
      setVendorOptions(filterVendorOption)
    }
  }, [editVendor]);

useEffect(() => {
    let active = AllVendorData.filter((item)=>{return item.isActive==true})
    setVendorOptions(active)
}, [AllVendorData])

useEffect(() => {
  console.log("vendorForm?.state?.length",vendorForm?.state?.length)
  if(vendorForm?.state?.length > 0){
    setRequired(["name","zipCode","city"])
  }
  else{
    setRequired(["name"])
    let formErrors = {...vendorForm.formErrors}
    delete formErrors.city
    delete formErrors.zipCode
    setVendorForm((prev)=>{
      return{
        ...prev,
        formErrors
      }
    })
  }
  
}, [vendorForm?.state])

console.log("required",required)


useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [showAddVendor])


useEffect(() => {
    dispatch(getVendor())
    setInitialVendorForm(vendorForm)
}, [])


      
  return{
    showAddVendor,
    setShowAddVendor,
    VendorColumn,
    AllVendorData,
    vendorOptions,
    vendorForm,
    vendorHandleChange,
    save,
    Back,
    statusOptions,
    statusData,
    setStatusData,
    State,
    City,
  }
}

export default VendorContainer