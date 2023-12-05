import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteRefferalGroup, UpdateRefferalGroup, addRefferalGroup, getAllRefferalGroup } from '../../../../redux/actions/RefferalGroupAction';
import { useEffect } from 'react';
import { Tag } from 'primereact/tag';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { showAllFormErrors } from '../../../../utils/commonFunctions';
import FormValidation from '../../../../utils/AllFormValidation';
import { showToast } from '../../../../redux/actions/toastAction';
import { confirmDialog } from "primereact/confirmdialog";
import { getAllCatalogItems } from '../../../../redux/actions/CatalogItemsAction';

const RefferalGroupContainer = () => {
    const dispatch = useDispatch()

    const allRefferalGroupData = useSelector((state)=>state.RefferalGroupReducer.allRefferalGroup)
    const allCatalogItemsData = useSelector((state)=>state.CatalogItemsReducer.allCatalogItems).map((item)=>{return {name:item.name,_id:item._id,UPC:item.UPC,unitPrice:item.unitPrice}})
    const [showAddReferralGroup, setShowAddReferralGroup] = useState();
    const [showCatalogItem,setShowCatalogItem] = useState(false)
    const [selectedRow, setSelectedRow] = useState([]);
    const [required,setRequired] = useState(["name","amount"])
    const [initialRefferalGroup,setInitialRefferalGroup] = useState({})
    const [editRefferalGroup,setEditRefferalGroup] = useState(null)
    const [statusData,setStatusData] = useState(true)
    const [refferalGroupForm,setRefferalGroupForm] = useState({
        isActive: true,
        name: "",
        amount: "",
        catalogItems: [],
        isPayTypeDollar: true
    })

    const statusOptions = [
      {label:"Active",value:true},
      {label:"InActive",value:false}
    ]

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
      dispatch(DeleteRefferalGroup(id)).then((data) => {
        if (data.success) {
          dispatch(getAllRefferalGroup());
        }
      });
    };
    
    const reject = () => { };

    const actionTemplate = (col) => {
        return (
          <>
            <div className="flex justify-content-end">
              <span onClick={() => setEditRefferalGroup(col)}>
                <i className="pi pi-pencil mr-3 cursor-pointer"></i>
              </span>
              <span onClick={() => deleteConfirm(col?._id)}>
                <i className="pi pi-trash cursor-pointer"></i>
              </span>
            </div>
          </>
        );
      };

      const catalogItemTemplate = (col) => {
        return(
            <div>
                {col?.catalogItems?.length>0 ? col?.catalogItems?.length : 0}
            </div>
        )
      }

      const amountTemplate = (col) => {
        return(
          <div>
            {col?.amount ? col?.isPayTypeDollar==true ? "$"+col?.amount : "%"+col?.amount : "--"}
          </div>
        )
      }

      const ReferralGroupColumn = [
        {
          field: "name",
          header: "Name",
          id: "",
          index: "",
        },
        {
          field: "amount",
          header: "Amount",
          id: "",
          index: "",
          body:amountTemplate
        },
        {
          field: "No.ofCatalog Items",
          header: "No. of Catalog Items",
          id: "",
          index: "",
          body:catalogItemTemplate
        },
    
        {
          field: "",
          header: "",
          id: "",
          body: actionTemplate,
        },
      ];

const refferalGroupHandleChange = ({name,value}) => {
  const formErrors = FormValidation(
    name,
    value,
    refferalGroupForm,
    required,
    initialRefferalGroup
  );
    setRefferalGroupForm((prev)=>{
        return{
            ...prev,
            [name]:value,
            formErrors
        }
    })
}


const UPCTemplate = (col) => {
  return (
    <div>{col?.UPC ? col?.UPC : "--"}</div>
  )
}

const CatalogPriceTemplate = (col) => {
  return (
    <div>
      {col?.unitPrice ? col?.unitPrice : "--"}
    </div>
  )
}

const catalogItemAddColumn = [
    {},
    {
      field: "name",
      header: "Item Name",
      id: "",
      index: "",
      sorting: true,
    },
    {
      field: "UPC",
      header: "Item UPC",
      id: "",
      index: "",
      sorting: true,
      body:UPCTemplate
    },
    {
      field: "unitPrice",
      header: "Price",
      id: "",
      index: "",
      sorting: true,
      body:CatalogPriceTemplate
    },
  ];

const [globalFilterValue, setGlobalFilterValue] = useState("");
const [filters, setFilters] = useState({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const onGlobalFilterChange = (e) => {
  const value = e.target.value;
  let _filters = { ...filters };

  _filters["global"].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
};

const removeAll = () => {
    setRefferalGroupForm((prev) => {
    return {
      ...prev,
      catalogItems: [],
    };
  });
  delete refferalGroupForm?.formErrors?.catalogItems;
  setSelectedRow([]);
};


const save = () => {
  if (
    showAllFormErrors(
      refferalGroupForm,
      setRefferalGroupForm,
      required,
      initialRefferalGroup
    )
  ) {
    let payload = {...refferalGroupForm,catalogItems:refferalGroupForm?.catalogItems?.map((item)=>{return item._id})}
  if(editRefferalGroup){
    dispatch(UpdateRefferalGroup(payload)).then(
      (data) => {
        if (data.success) {
          dispatch(getAllRefferalGroup())
          setShowAddReferralGroup(false);
          setRefferalGroupForm({ ...initialRefferalGroup });
        }
      }
    );
  }
  else{
    dispatch(addRefferalGroup(payload)).then(
      (data) => {
        if (data.success) {
          dispatch(getAllRefferalGroup())
          setShowAddReferralGroup(false);
          setRefferalGroupForm({ ...initialRefferalGroup });
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
  setShowAddReferralGroup((prev) => !prev);
  if (editRefferalGroup) {
    setEditRefferalGroup(null);
    setRefferalGroupForm({ ...initialRefferalGroup });
  }
};

useEffect(() => {
  if (editRefferalGroup) {
    let obj = {
      ...editRefferalGroup,
      isActive: editRefferalGroup?.isActive,
      name: editRefferalGroup?.name,
      amount: editRefferalGroup?.amount,
      isPayTypeDollar: editRefferalGroup?.isPayTypeDollar,
      catalogItems: editRefferalGroup?.catalogItems.map((item)=>{return {name:item.name,_id:item._id,UPC:item.UPC,unitPrice:item.unitPrice}}),
    };
    
    setRefferalGroupForm(obj);
    setShowAddReferralGroup(true);
    setSelectedRow(editRefferalGroup?.catalogItems.map((item)=>{return {name:item.name,_id:item._id,UPC:item.UPC,unitPrice:item.unitPrice}}));
  }
}, [editRefferalGroup]);

console.log("test",refferalGroupForm)

useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [showAddReferralGroup,showCatalogItem])


useEffect(() => {
dispatch(getAllRefferalGroup())
dispatch(getAllCatalogItems())
setInitialRefferalGroup(refferalGroupForm)
}, [])


  return {
    showAddReferralGroup,
    setShowAddReferralGroup,
    ReferralGroupColumn,
    allRefferalGroupData,
    refferalGroupForm,
    refferalGroupHandleChange,
    showCatalogItem,
    setShowCatalogItem,
    globalFilterValue,
    setGlobalFilterValue,
    filters,
    onGlobalFilterChange,
    catalogItemAddColumn,
    allCatalogItemsData,
    selectedRow,
    setSelectedRow,
    removeAll,
    save,
    Back,
    statusData,
    setStatusData,
    statusOptions
  }
}

export default RefferalGroupContainer