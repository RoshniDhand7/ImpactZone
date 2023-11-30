import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRefferalGroup } from '../../../../redux/actions/RefferalGroupAction';
import { useEffect } from 'react';
import { Tag } from 'primereact/tag';
import { FilterMatchMode, FilterOperator } from "primereact/api";

const RefferalGroupContainer = () => {
    const dispatch = useDispatch()

    const allRefferalGroupData = useSelector((state)=>state.RefferalGroupReducer.allRefferalGroup)
    const [showAddReferralGroup, setShowAddReferralGroup] = useState();
    const [showCatalogItem,setShowCatalogItem] = useState(false)
    const [selectedRow, setSelectedRow] = useState([]);
    const [refferalGroupForm,setRefferalGroupForm] = useState({
        isActive: true,
        name: "",
        amount: "",
        catelogItems: []
    })

    console.log("refferalGroupForm",refferalGroupForm)

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

      const catalogItemTemplate = (col) => {
        return(
            <div>
                {col?.catelogItems?.length>0 ? col?.catelogItems?.map((item)=>{return <Tag style={{margin:"0px 2px"}} value={item.name}></Tag>}) : "--"}
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
        },
        {
          field: "No.ofCatalog Items",
          header: "No. of CatalogItems",
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
    setRefferalGroupForm((prev)=>{
        return{
            ...prev,
            [name]:value
        }
    })
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
    setRefferalGroupForm((prev) => {
    return {
      ...prev,
      catelogItems: [],
    };
  });
  delete refferalGroupForm?.formErrors?.catelogItems;
  setSelectedRow([]);
};

useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [showAddReferralGroup])


useEffect(() => {
dispatch(getAllRefferalGroup())
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
    catalogItemAddData,
    selectedRow,
    setSelectedRow,
    removeAll,
  }
}

export default RefferalGroupContainer