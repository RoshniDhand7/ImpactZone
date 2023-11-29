import React from 'react'
import { useEffect } from 'react';
import { DeleteProfitCenter, UpdateProfitCenter, addProfitCenter, getProfitCenter } from '../../../../redux/actions/profitCenterAction';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Tag } from 'primereact/tag';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { confirmDialog } from "primereact/confirmdialog";
import FormValidation from '../../../../utils/AllFormValidation';
import { showToast } from '../../../../redux/actions/toastAction';
import { showAllFormErrors } from '../../../../utils/commonFunctions';

const ProfitCenterContainer = () => {
const dispatch = useDispatch()

const allProfitCenterData = useSelector((state)=>state.profitCenter.allProfitCenter)


    const [showAddProfileType, setShowAddProfileType] = useState();
    const [showCatalogItem,setShowCatalogItem] = useState(false)
    const [selectedRow, setSelectedRow] = useState([]);
    const [initialProfitCenter,setInitialProfitCenter] = useState({})
    const [editProfitCenter,setEditProfitCenter] = useState(null)
    const [statusData,setStatusData] = useState(true)
    const [required, setRequired] = useState(["name","glCode"])
    const [availableProfitState,setAvailableProfitState] = useState([])
    const [parentProfitState,setParentProfitState] = useState([])

    const statusOptions = [
      {label:"Active",value:true},
      {label:"InActive",value:false}
    ]

    

const [profitCenterForm,setProfitCenterForm] = useState({
    isActive: true,
    name: "",
    glCode: "",
    availableProfitCenter: null,
    parentProfitCenter: null,
    description: "",
    catelogItems: [],
    profitCenterCode: null,
    earningsCode: null
})

// console.log("profitCenterForm",profitCenterForm)

const profitCenterHandler = ({name,value}) => {
  const formErrors = FormValidation(
    name,
    value,
    profitCenterForm,
    required,
    initialProfitCenter
  );
    setProfitCenterForm((prev)=>{
        return{
            ...prev,
            [name]:value,
            formErrors
        }
    })
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
  dispatch(DeleteProfitCenter(id)).then((data) => {
    if (data.success) {
      dispatch(getProfitCenter());
    }
  });
};

const reject = () => { };

    const actionTemplate = (col) => {
      return (
        <>
          <div className="flex justify-content-end">
            <span onClick={() => setEditProfitCenter(col)}>
              <i className="pi pi-pencil mr-3 cursor-pointer"></i>
            </span>
            <span onClick={() => deleteConfirm(col?._id)}>
              <i className="pi pi-trash cursor-pointer"></i>
            </span>
          </div>
        </>
      );
    };

    const catalogTemplate = (col) => {
return (
    <div>
         {col?.catelogItems?.length>0 ? col?.catelogItems?.map((item)=>{return <Tag style={{margin:"0px 2px"}} value={item.name}></Tag>}) : "--"}
    </div>
)
    }

    const descriptionTemplate = (col) => {
        return(
        <div>
          {col.description.length >0 ? (col?.description?.length >= 100 ? col?.description.slice(0, 100)+"..." : col?.description) : "--"}
        </div>
        )
        
      }
  
    const ProfileTypesColumn = [
      {
        field: "name",
        header: "Profit Center Name",
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
        field: "CatalogItemsAssigned",
        header: "Catalog Items Assigned",
        id: "",
        index: "",
        body: catalogTemplate
      },
      {
        field: "glCode",
        header: "GL Code",
        id: "",
        index: "",
      },
      {
        field: "isActive",
        header: "status",
        id: "",
        index: "",
        hidden:true
      },
      {
        field: "",
        header: "",
        id: "",
        body: actionTemplate,
      },
    ];

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

    const [catalogItemAddData, setCatalogItemAddData] = useState([
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
      setProfitCenterForm((prev) => {
        return {
          ...prev,
          catelogItems: [],
        };
      });
      delete profitCenterForm?.formErrors?.catelogItems;
      setSelectedRow([]);
    };

    const save = () => {
      if (
        showAllFormErrors(
          profitCenterForm,
          setProfitCenterForm,
          required,
          initialProfitCenter
        )
      ) {
      if(editProfitCenter){
        dispatch(UpdateProfitCenter(profitCenterForm)).then(
          (data) => {
            if (data.success) {
              dispatch(getProfitCenter())
              setShowAddProfileType(false);
              setProfitCenterForm({ ...initialProfitCenter });
            }
          }
        );
      }
      else{
        dispatch(addProfitCenter(profitCenterForm)).then(
          (data) => {
            if (data.success) {
              dispatch(getProfitCenter())
              setShowAddProfileType(false);
              setProfitCenterForm({ ...initialProfitCenter });
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
        top: 250,
        left: 0,
        behavior: "smooth",
      });
    }
    }

    const Back = () => {
      setShowAddProfileType((prev) => !prev);
      if (editProfitCenter) {
        setEditProfitCenter(null);
        setProfitCenterForm({ ...initialProfitCenter });
      }
    };

    useEffect(() => {
      if (editProfitCenter) {
        let obj = {
          ...editProfitCenter,
          isActive: editProfitCenter?.isActive,
    name: editProfitCenter?.name,
    glCode: editProfitCenter?.glCode,
    availableProfitCenter: editProfitCenter?.availableProfitCenter ? editProfitCenter?.availableProfitCenter?._id : null,
    parentProfitCenter: editProfitCenter?.parentProfitCenter?._id,
    description: editProfitCenter?.description,
    catelogItems: editProfitCenter?.catelogItems,
    profitCenterCode: editProfitCenter?.profitCenterCode ? editProfitCenter?.profitCenterCode : null,
    earningsCode: editProfitCenter?.earningsCode
        };
        
        setProfitCenterForm(obj);
        setShowAddProfileType(true);
        setSelectedRow(editProfitCenter?.catelogItems);
        let filterAvailableProfit = allProfitCenterData?.filter((item)=>{return item?._id!==editProfitCenter?._id&&item.isActive==true})
        let parentProfit = allProfitCenterData?.filter((child)=>{return child?._id!==editProfitCenter?._id&&child.isActive==true})
        setAvailableProfitState(filterAvailableProfit)
        setParentProfitState(parentProfit)
      }
    }, [editProfitCenter]);

useEffect(() => {
  let active = allProfitCenterData.filter((item)=>{return item.isActive==true})
  setAvailableProfitState(active)
  setParentProfitState(active)
}, [allProfitCenterData])

useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
}, [showAddProfileType])



    useEffect(() => {
     dispatch(getProfitCenter())
     setInitialProfitCenter(profitCenterForm)
    }, [])
    
  return {
    showAddProfileType,
    setShowAddProfileType,
    ProfileTypesColumn,
    allProfitCenterData,
    profitCenterForm,
    profitCenterHandler,
    showCatalogItem,
    setShowCatalogItem,
    globalFilterValue,
    setGlobalFilterValue,
    filters,
    onGlobalFilterChange,
    catalogItemAddColumn,
    catalogItemAddData,
    selectedRow,
    setSelectedRow,
    removeAll,
    save,
    Back,
    statusData,
    setStatusData,
    statusOptions,
    availableProfitState,
    parentProfitState
  }
}

export default ProfitCenterContainer