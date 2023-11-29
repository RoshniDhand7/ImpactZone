import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteInventoryCategory, UpdateInventoryCategory, addInventoryCategory, getInventoryCategory } from '../../../../redux/actions/inventoryCategoryAction';
import { useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { confirmDialog } from "primereact/confirmdialog";
import { showAllFormErrors } from '../../../../utils/commonFunctions';
import { showToast } from '../../../../redux/actions/toastAction';
import FormValidation from '../../../../utils/AllFormValidation';

const CategoriesContainer = () => {
const dispatch = useDispatch()

const CategoryData = useSelector((state)=>state.InventoryCategory.allInventoryCategory)

    const [showAddCategory, setShowAddCategory] = useState();
    const [showCatalogItem,setShowCatalogItem] = useState(false)
    const [selectedRow, setSelectedRow] = useState([]);
    const [initialCategory,setInitialCategory] = useState({})
    const [required,setRequired] = useState(["name"])
    const [editCategory,setEditCategory] = useState(null)
    const [categoryOption,setCategoryOption] = useState([])
    const [statusData,setStatusData] = useState("")
    const [categoryForm,setCategoryForm] = useState({
        isActive:true,
    name: "",
    displayInPOS: null,
    posButtonLabel: "",
    availableCategories: null,
    description: "",
    catelogItems: []
    })

    const statusOptions = [
      {label:"All",value:null},
      {label:"Active",value:false},
      {label:"InActive",value:true}
    ]

console.log("categoryForm",categoryForm)
    const categoryHandle = ({name,value}) => {
        const formErrors = FormValidation(
            name,
            value,
            categoryForm,
            required,
            initialCategory
          );
        setCategoryForm((prev)=>{
            return {
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
        dispatch(DeleteInventoryCategory(id)).then((data) => {
          if (data.success) {
            dispatch(getInventoryCategory());
          }
        });
      };
      
      const reject = () => { };


    const actionTemplate = (col) => {
      return (
        <>
          <div className="flex justify-content-end">
            <span onClick={() => setEditCategory(col)}>
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
          {col?.description?.length >0 ? (col?.description?.length >= 100 ? col?.description?.slice(0, 100)+"..." : col?.description) : "--"}
        </div>
        )
        
      }

    const displayTemplate = (col) => {
      console.log("colindispaly",col.displayInPOS)
      return(
        <div>
          {col?.displayInPOS!==null ? col.displayInPOS==true ? "true" : "false" : "--"}
        </div>
      )
    }
  
    const CategoryColumn = [
      {
        field: "name",
        header: "Category",
        id: "",
        index: "",
      },
      {
        field: "displayInPOS",
        header: "Displays in POS",
        id: "",
        index: "",
        body:displayTemplate
      },
  
      {
        field: "description",
        header: "Description",
        id: "",
        index: "",
        body:descriptionTemplate
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
        setCategoryForm((prev) => {
        return {
          ...prev,
          catelogItems: [],
        };
      });
      delete categoryForm?.formErrors?.catelogItems;
      setSelectedRow([]);
    };

    const save = () => {
        if (
          showAllFormErrors(
            categoryForm,
            setCategoryForm,
            required,
            initialCategory
          )
        ) {
        if(editCategory){
          dispatch(UpdateInventoryCategory(categoryForm)).then(
            (data) => {
              if (data.success) {
                dispatch(getInventoryCategory())
                setShowAddCategory(false);
                setCategoryForm({ ...initialCategory });
              }
            }
          );
        }
        else{
          dispatch(addInventoryCategory(categoryForm)).then(
            (data) => {
              if (data.success) {
                dispatch(getInventoryCategory())
                setShowAddCategory(false);
                setCategoryForm({ ...initialCategory });
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


const back = () => {
    setShowAddCategory((prev) => !prev)
    if (editCategory) {
        setEditCategory(null);
        setCategoryForm({ ...initialCategory });
      }
}


useEffect(() => {
    if (editCategory) {
      let obj = {
        ...editCategory,
        isActive: editCategory.isActive,
  name: editCategory.name,
  displayInPOS: editCategory.displayInPOS,
  posButtonLabel: editCategory.posButtonLabel,
  availableCategories: editCategory.availableCategories ? editCategory.availableCategories._id : null,
  description: editCategory.description,
  catelogItems: editCategory.catelogItems
      };
      setCategoryForm(obj);
      setShowAddCategory(true);
      setSelectedRow(editCategory.catelogItems);
      let filterCategoryOption = CategoryData.filter((item)=>{return item._id!==editCategory._id})
      setCategoryOption(filterCategoryOption)
    }
  }, [editCategory]);

useEffect(() => {
  setCategoryOption(CategoryData)
}, [CategoryData])

useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
}, [showAddCategory])



useEffect(() => {
    dispatch(getInventoryCategory())
    setInitialCategory(categoryForm)
}, [])




  return {
    showAddCategory,
    setShowAddCategory,
    CategoryColumn,
    CategoryData,
    back,
    categoryForm,
    categoryHandle,
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
    categoryOption,
    statusData,
    setStatusData,
    statusOptions,
  }
}

export default CategoriesContainer