import React, { useEffect } from "react";
import { useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { getAllCatalogItems } from "../../../../redux/actions/CatalogItemsAction";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../../../redux/actions/employeesAction";
import { getAllCommissionGroup } from "../../../../redux/actions/commissionGroupAction";

const ComissionGroupContainer = () => {
  const dispatch = useDispatch();
  const allCatalogItemsData = useSelector(
    (state) => state.CatalogItemsReducer.allCatalogItems
  ).map((item) => {
    return {
      name: item.name,
      _id: item._id,
      UPC: item.UPC,
      unitPrice: item.unitPrice,
    };
  });
  const allEmployeeData = useSelector((state) => state.employees.employees).map(
    (item) => {
      return {
        firstName: item.firstName,
        lastName: item.lastName,
        _id: item._id,
      };
    }
  );
  const allCommissionData = useSelector(
    (state) => state.CommissionGroupReducer.allCommissionGroup
  );
  const [showAddCommissionGroup, setShowAddCommissionGroup] = useState();

  const [statusData, setStatusData] = useState("Products");
  const [activeStatusData, setActiveStatusData] = useState(true);

  const [commissionGroupForm, setCommissionGroupForm] = useState({
    isActive: true,
    commissionGroup: "",
    type: "",
    catalogItems: [],
    assignedEmployees: [],
  });

  console.log("commissionGroupForm", commissionGroupForm);
  console.log("allCommissionData", allCommissionData);
  const [showCatalogItem, setShowCatalogItem] = useState(false);
  const [showAssignItem, setShowAssignItem] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [assignedSelectedRow, setAssignedSelectedRow] = useState([]);

  const statusOptions = [
    { label: "Products", value: "Products" },
    { label: "Services", value: "Services" },
    { label: "Agreement", value: "Agreement" },
  ];

  const activeStatusOptions = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

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

  const CommissionGroupColumn = [
    {
      field: "CommissionGroup",
      header: "Commission Group",
      id: "",
      index: "",
    },
    {
      field: "ItemsinGroup",
      header: "Items in Group",
      id: "",
      index: "",
    },

    {
      field: "EmployeesAssign",
      header: "Employees Assign",
      id: "",
      index: "",
    },
    {
      field: "",
      header: "",
      id: "",
      body: actionTemplate,
    },
  ];

  const [CommissionGroupData, setCommissionGroupData] = useState([
    {
      CommissionGroup: "Shakes",
      ItemsinGroup: "",
      EmployeesAssign: "",
    },
    {
      CommissionGroup: "Drinks",
      ItemsinGroup: "-",
      EmployeesAssign: "",
    },
    {
      CommissionGroup: "Bars",
      ItemsinGroup: "-",
      EmployeesAssign: "",
    },
    {
      CommissionGroup: "Supplements",
      ItemsinGroup: "",
      EmployeesAssign: "",
    },
    {
      CommissionGroup: "Shakes",
      ItemsinGroup: "",
      EmployeesAssign: "",
    },
  ]);

  const UPCTemplate = (col) => {
    return <div>{col?.UPC ? col?.UPC : "--"}</div>;
  };

  const CatalogPriceTemplate = (col) => {
    return <div>{col?.unitPrice ? col?.unitPrice : "--"}</div>;
  };

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
      body: UPCTemplate,
    },
    {
      field: "unitPrice",
      header: "Price",
      id: "",
      index: "",
      sorting: true,
      body: CatalogPriceTemplate,
    },
  ];

  const AssignEmployeeColumn = [
    {},
    {
      field: "firstName",
      header: "First Name",
      sorting: true,
    },
    {
      field: "lastName",
      header: "Last Name",
      sorting: true,
    },
  ];

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = ({ value }) => {
    // const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  console.log("globalFilterValue", globalFilterValue);

  const removeAll = () => {
    setCommissionGroupForm((prev) => {
      return {
        ...prev,
        catalogItems: [],
      };
    });
    delete commissionGroupForm?.formErrors?.catalogItems;
    setSelectedRow([]);
  };

  const removeAllAssign = () => {
    setCommissionGroupForm((prev) => {
      return {
        ...prev,
        assignedEmployees: [],
      };
    });
    delete commissionGroupForm?.formErrors?.assignedEmployees;
    setAssignedSelectedRow([]);
  };

  const CommissionHandleChange = ({ name, value }) => {
    setCommissionGroupForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [showAddCommissionGroup, showCatalogItem]);

  useEffect(() => {
    dispatch(getAllCatalogItems());
    dispatch(getEmployees());
    dispatch(getAllCommissionGroup());
  }, []);

  return {
    showAddCommissionGroup,
    setShowAddCommissionGroup,
    statusData,
    setStatusData,
    statusOptions,
    CommissionGroupColumn,
    CommissionGroupData,
    commissionGroupForm,
    CommissionHandleChange,
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
    assignedSelectedRow,
    setAssignedSelectedRow,
    showAssignItem,
    setShowAssignItem,
    removeAllAssign,
    allEmployeeData,
    AssignEmployeeColumn,
    activeStatusOptions,
    activeStatusData,
    setActiveStatusData,
  };
};

export default ComissionGroupContainer;
