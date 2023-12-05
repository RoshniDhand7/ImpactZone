import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteVendor, UpdateVendor, addVendor, getVendor } from '../../../../redux/actions/VendorAction';
import { useEffect } from 'react';
import { showToast } from '../../../../redux/actions/toastAction';
import { showAllFormErrors } from '../../../../utils/commonFunctions';
import FormValidation from '../../../../utils/AllFormValidation';
import { confirmDialog } from "primereact/confirmdialog";

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
    const [required, setRequired] = useState(["name","contact","phone","email"])
    const [editVendor,setEditVendor] = useState(null)
    const [statusData,setStatusData] = useState(true)


    const statusOptions = [
        {label:"Active",value:true},
        {label:"InActive",value:false}
      ]

    const usStates = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
        'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
        'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
        'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
        'Wisconsin', 'Wyoming'
      ];

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

      const VendorColumn = [
        {
          field: "name",
          header: "Vendor Name",
          id: "",
          index: "",
        },
        {
          field: "phone",
          header: "Phone",
          id: "",
          index: "",
        },
    
        {
          field: "contact",
          header: "Contact",
          id: "",
          index: "",
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
        alternateVendors: editVendor?.alternateVendors._id,
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
    usStates,
    vendorOptions,
    vendorForm,
    vendorHandleChange,
    save,
    Back,
    statusOptions,
    statusData,
    setStatusData
  }
}

export default VendorContainer