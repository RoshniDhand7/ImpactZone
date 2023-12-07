import React, { useEffect } from "react";
import { useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { getAllCatalogItems } from "../../../../redux/actions/CatalogItemsAction";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../../../redux/actions/employeesAction";
import {
  DeleteCommissionGroup,
  UpdateCommissionGroup,
  addCommissionGroup,
  getAllCommissionGroup,
} from "../../../../redux/actions/commissionGroupAction";
import { showAllFormErrors } from "../../../../utils/commonFunctions";
import FormValidation from "../../../../utils/AllFormValidation";
import { showToast } from "../../../../redux/actions/toastAction";
import { confirmDialog } from "primereact/confirmdialog";

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

  const [statusData, setStatusData] = useState("All");
  const [activeStatusData, setActiveStatusData] = useState(true);

  const [commissionGroupForm, setCommissionGroupForm] = useState({
    isActive: true,
    commissionGroup: "",
    type: "",
    catalogItems: [],
    assignedEmployees: [],
  });

  const [initialCommissionGroup, setInitialCommissionGroup] = useState({});
  const [required, setRequired] = useState(["commissionGroup", "type"]);
  const [editCommission, setEditCommission] = useState(null);

  console.log("commissionGroupForm", commissionGroupForm);
  console.log("allCommissionData", allCommissionData);
  const [showCatalogItem, setShowCatalogItem] = useState(false);
  const [showAssignItem, setShowAssignItem] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [assignedSelectedRow, setAssignedSelectedRow] = useState([]);

  const statusOptions = [
    { label: "All", value: "All" },
    { label: "Products", value: "Products" },
    { label: "Services", value: "Services" },
    { label: "Agreement", value: "Agreement" },
  ];

  const AddstatusOptions = [
    { label: "Products", value: "Products" },
    { label: "Services", value: "Services" },
    { label: "Agreement", value: "Agreement" },
  ];

  const activeStatusOptions = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
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
    dispatch(DeleteCommissionGroup(id)).then((data) => {
      if (data.success) {
        let params;
        if (statusData !== "All") {
          params = {
            type: statusData,
            isActive: activeStatusData,
          };
        } else {
          params = {
            isActive: activeStatusData,
          };
        }
        dispatch(getAllCommissionGroup(params));
      }
    });
  };

  const reject = () => {};

  const actionTemplate = (col) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span onClick={() => setEditCommission(col)}>
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
      <div>{col?.catalogItems?.length > 0 ? col?.catalogItems?.length : 0}</div>
    );
  };

  const AssignTemplate = (col) => {
    return (
      <div>
        {col?.assignedEmployees?.length > 0
          ? col?.assignedEmployees?.length
          : 0}
      </div>
    );
  };

  const CommissionGroupColumn = [
    {
      field: "commissionGroup",
      header: "Commission Group Name",
      id: "",
      index: "",
    },
    {
      field: "ItemsinGroup",
      header: "Items in Group",
      id: "",
      index: "",
      body: catalogTemplate,
    },

    {
      field: "EmployeesAssign",
      header: "Employees Assign",
      id: "",
      index: "",
      body: AssignTemplate,
    },
    {
      field: "",
      header: "",
      id: "",
      body: actionTemplate,
    },
  ];

  // const [CommissionGroupData, setCommissionGroupData] = useState([
  //   {
  //     CommissionGroup: "Shakes",
  //     ItemsinGroup: "",
  //     EmployeesAssign: "",
  //   },
  //   {
  //     CommissionGroup: "Drinks",
  //     ItemsinGroup: "-",
  //     EmployeesAssign: "",
  //   },
  //   {
  //     CommissionGroup: "Bars",
  //     ItemsinGroup: "-",
  //     EmployeesAssign: "",
  //   },
  //   {
  //     CommissionGroup: "Supplements",
  //     ItemsinGroup: "",
  //     EmployeesAssign: "",
  //   },
  //   {
  //     CommissionGroup: "Shakes",
  //     ItemsinGroup: "",
  //     EmployeesAssign: "",
  //   },
  // ]);

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
    const formErrors = FormValidation(
      name,
      value,
      commissionGroupForm,
      required,
      initialCommissionGroup
    );
    setCommissionGroupForm((prev) => {
      return {
        ...prev,
        [name]: value,
        formErrors,
      };
    });
  };

  const save = () => {
    if (
      showAllFormErrors(
        commissionGroupForm,
        setCommissionGroupForm,
        required,
        initialCommissionGroup
      )
    ) {
      if (editCommission) {
        dispatch(UpdateCommissionGroup(commissionGroupForm)).then((data) => {
          if (data.success) {
            let params;
            if (statusData !== "All") {
              params = {
                type: statusData,
                isActive: activeStatusData,
              };
            } else {
              params = {
                isActive: activeStatusData,
              };
            }
            dispatch(getAllCommissionGroup(params));
            setShowAddCommissionGroup(false);
            setCommissionGroupForm({ ...initialCommissionGroup });
          }
        });
      } else {
        dispatch(addCommissionGroup(commissionGroupForm)).then((data) => {
          if (data.success) {
            let params;
            if (statusData !== "All") {
              params = {
                type: statusData,
                isActive: activeStatusData,
              };
            } else {
              params = {
                isActive: activeStatusData,
              };
            }
            dispatch(getAllCommissionGroup(params));
            setShowAddCommissionGroup(false);
            setCommissionGroupForm({ ...initialCommissionGroup });
          }
        });
      }
    } else {
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
  };

  const Back = () => {
    setShowAddCommissionGroup((prev) => !prev);
    if (editCommission) {
      setEditCommission(null);
      setCommissionGroupForm({ ...initialCommissionGroup });
    }
  };

  // const filterFunction = (e) => {
  //   setStatusData(e.value)
  //   let params = {}
  //   if(e.value!=="All"){
  //     params = {
  //       type:e.value
  //     }
  //   }

  //   dispatch(getAllCommissionGroup(params));
  // }

  useEffect(() => {
    let params;
    if (statusData !== "All") {
      params = {
        type: statusData,
        isActive: activeStatusData,
      };
    } else {
      params = {
        isActive: activeStatusData,
      };
    }
    dispatch(getAllCommissionGroup(params));
  }, [statusData, activeStatusData]);

  useEffect(() => {
    if (editCommission) {
      let obj = {
        ...editCommission,
        isActive: editCommission.isActive,
        commissionGroup: editCommission.commissionGroup,
        type: editCommission.type,
        catalogItems: editCommission?.catalogItems.map((item) => {
          return {
            name: item.name,
            _id: item._id,
            UPC: item.UPC,
            unitPrice: item.unitPrice,
          };
        }),
        assignedEmployees: editCommission?.assignedEmployees.map((item) => {
          return {
            firstName: item.firstName,
            lastName: item.lastName,
            _id: item._id,
          };
        }),
      };
      setCommissionGroupForm(obj);
      setShowAddCommissionGroup(true);
      setSelectedRow(editCommission.catalogItems);
    }
  }, [editCommission]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [showAddCommissionGroup, showCatalogItem, showAssignItem]);

  useEffect(() => {
    dispatch(getAllCatalogItems());
    dispatch(getEmployees());
    // dispatch(getAllCommissionGroup());
    setInitialCommissionGroup(commissionGroupForm);
  }, []);

  return {
    showAddCommissionGroup,
    setShowAddCommissionGroup,
    statusData,
    setStatusData,
    statusOptions,
    CommissionGroupColumn,
    allCommissionData,
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
    save,
    Back,
    AddstatusOptions,
  };
};

export default ComissionGroupContainer;
