import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteMemberShipTypeAction,
  UpdateMemberShipTypeAction,
  addMemberShipType,
  getMemberShipType,
} from "../../../../redux/actions/memberShipTypesAction";
import { useEffect } from "react";
import { getClubs } from "../../../../redux/actions/clubsActions";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { showAllFormErrors } from "../../../../utils/commonFunctions";
import { showToast } from "../../../../redux/actions/toastAction";
import FormValidation from "../../../../utils/AllFormValidation";
import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { getAccessSchedules } from "../../../../redux/actions/accessSchedulesAction";

const MemberShipContainer = () => {
  const dispatch = useDispatch();
  const membershipTypeData = useSelector(
    (state) => state.memberShip.membershipType
  );
  const allClubs = useSelector((state) => state.clubs.clubs);
  let { accessSchedules } = useSelector((state) => state?.accessSchedules);

  const [clubs, setClubs] = useState([]);
  const [showAddMemberService, setShowAddMemberService] = useState(false);
  const [showAddMemebershipType, setAddMemebershipType] = useState(false);
  const [initialMemberType, setInitialMemberType] = useState({});
  const [required, setRequired] = useState([
    "name",
    "description",
    "discountType",
    "allowRemoteCheckIn",
    "clubCreditAmount",
    "services",
    "clubs",
  ]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [editMemberType, setEditMemberType] = useState(null);
  const [visible, setVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [memberShipTypeForm, setMemberShipTypeForm] = useState({
    isActive: true,
    name: "",
    description: "",
    discountType: "None",
    accessRestriction: null,
    accessSchedule: "",
    allowRemoteCheckIn: null,
    clubCreditAmount: "",
    transferToAnotherType: null,
    specialRestriction: [],
    minimumAgeAllowed: "",
    maximumAgeAllowed: "",
    maximumDaysAllowed: "",
    maximumDistanceAllowed: "",
    clubs: [],
    clubsOption: [],
    services: [],
  });

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
    dispatch(DeleteMemberShipTypeAction(id)).then((data) => {
      if (data.success) {
        dispatch(getMemberShipType());
      }
    });
  };

  const reject = () => { };

  const actionTemplate = (col) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span onClick={() => setEditMemberType(col)}>
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
    return (
      <div>
        {col.description.length >= 100
          ? col.description.slice(0, 100) + "..."
          : col.description}
      </div>
    );
  };

  const ManageMembershipTypesColumn = [
    {
      field: "name",
      header: "Name",
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
      field: "discountType",
      header: "Discount Type",
      id: "",
      index: "",
    },
    {
      field: "members",
      header: "# Members",
      id: "",
      index: "",
    },
    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];

  const showAddMemebershipTypeScreen = () => {
    setAddMemebershipType((prev) => !prev);
    if (editMemberType) {
      setEditMemberType(null);
      setMemberShipTypeForm({ ...initialMemberType });
    }
  };

  const memberTypeHandleChange = ({ name, value }) => {
    const formErrors = FormValidation(
      name,
      value,
      memberShipTypeForm,
      required,
      initialMemberType
    );

    // if(name == "isActive" && value == true){
    //   setMemberShipTypeForm((prev) => {
    //     return {
    //       ...prev,
    //       [name]: value,
    //       transferToAnotherType: null,
    //       formErrors
    //     };
    //   });
    // }

    if (name == "accessRestriction" && value == false) {
      setMemberShipTypeForm((prev) => {
        return {
          ...prev,
          [name]: value,
          accessSchedule: "",
          formErrors,
        };
      });
    } else if (name == "specialRestriction" && !value.includes("By Age")) {
      setMemberShipTypeForm((prev) => {
        return {
          ...prev,
          [name]: value,
          minimumAgeAllowed: "",
          maximumAgeAllowed: "",
          formErrors,
        };
      });
    } else if (name == "specialRestriction" && !value.includes("By Location")) {
      setMemberShipTypeForm((prev) => {
        return {
          ...prev,
          [name]: value,
          maximumDistanceAllowed: "",
          formErrors,
        };
      });
    } else if (name == "specialRestriction" && !value.includes("By Days")) {
      setMemberShipTypeForm((prev) => {
        return {
          ...prev,
          [name]: value,
          maximumDaysAllowed: "",
          formErrors,
        };
      });
    } else {
      setMemberShipTypeForm((prev) => {
        return {
          ...prev,
          [name]: value,
          formErrors,
        };
      });
    }
  };

  const memberTypePickerHandleChange = ({ name, value, source }) => {
    const formErrors = FormValidation(
      "clubs",
      value,
      memberShipTypeForm,
      required,
      initialMemberType
    );
    let clubsNew = value.map((item) => {
      return item._id;
    });
    setMemberShipTypeForm((prev) => {
      return {
        ...prev,
        [name]: value,
        clubs: clubsNew,
        formErrors,
      };
    });
    setClubs(source);
  };

  const memberShipAddColumn = [
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
  const [memberShipAddData, setMemberShipAddData] = useState([
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
    setMemberShipTypeForm((prev) => {
      return {
        ...prev,
        services: [],
      };
    });
    delete memberShipTypeForm?.formErrors?.services;
    setSelectedRow([]);
  };

  const submitNewName = () => {
    let payload = {
      ...memberShipTypeForm,
      name: newName,
      _id: null,
    };
    if (
      showAllFormErrors(
        memberShipTypeForm,
        setMemberShipTypeForm,
        required,
        initialMemberType
      )
    ) {
      setVisible(false);
      dispatch(addMemberShipType(payload)).then((data) => {
        if (data.success) {
          dispatch(getMemberShipType());
          const myTimeout = setTimeout(() => {
            // setVisible(false);
            setNewName("");
            setAddMemebershipType(false);
            setMemberShipTypeForm({ ...initialMemberType });
          }, 1000);
        }
      });
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon=""
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Create Membership Type"
        icon=""
        onClick={() => submitNewName()}
        autoFocus
      />
    </div>
  );

  const newNameHandle = (e) => {
    const { name, value } = e.target;
    setNewName(value);
  };

  const submit = () => {
    if (
      showAllFormErrors(
        memberShipTypeForm,
        setMemberShipTypeForm,
        required,
        initialMemberType
      )
    ) {
      if (editMemberType) {
        dispatch(UpdateMemberShipTypeAction(memberShipTypeForm)).then(
          (data) => {
            if (data.success) {
              dispatch(getMemberShipType());
              setAddMemebershipType(false);
              setMemberShipTypeForm({ ...initialMemberType });
            }
          }
        );
      } else {
        dispatch(addMemberShipType(memberShipTypeForm)).then((data) => {
          if (data.success) {
            dispatch(getMemberShipType());
            setAddMemebershipType(false);
            setMemberShipTypeForm({ ...initialMemberType });
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
        top: 250,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setInitialMemberType(memberShipTypeForm);
    dispatch(getMemberShipType());
    dispatch(getClubs());
  }, []);

  useEffect(() => {
    setClubs(allClubs);
    dispatch(getAccessSchedules());
  }, [allClubs]);

  useEffect(() => {
    if (editMemberType) {
      let obj = {
        ...editMemberType,
        isActive: editMemberType.isActive,
        name: editMemberType.name,
        description: editMemberType.description,
        discountType: editMemberType.discountType,
        accessRestriction: editMemberType.accessRestriction,
        accessSchedule: editMemberType.accessSchedule,
        allowRemoteCheckIn: editMemberType.allowRemoteCheckIn,
        clubCreditAmount: editMemberType.clubCreditAmount,
        transferToAnotherType: editMemberType.transferToAnotherType?._id,
        specialRestriction: editMemberType.specialRestriction,
        minimumAgeAllowed: editMemberType.minimumAgeAllowed,
        maximumAgeAllowed: editMemberType.maximumAgeAllowed,
        maximumDaysAllowed: editMemberType.maximumDaysAllowed,
        maximumDistanceAllowed: editMemberType.maximumDistanceAllowed,
        clubs: editMemberType.clubs?.map((item) => {
          return item._id;
        }),
        clubsOption: editMemberType.clubs,
        services: editMemberType.services,
      };
      setMemberShipTypeForm(obj);
      setAddMemebershipType(true);
      setSelectedRow(editMemberType.services);
      let clubSource = clubs.filter((item) => {
        return !editMemberType.clubs.find((child) => {
          return item._id == child._id;
        });
      });
      setClubs(clubSource);
    }
  }, [editMemberType]);

  return {
    showAddMemebershipType,
    showAddMemebershipTypeScreen,
    ManageMembershipTypesColumn,
    membershipTypeData,
    memberTypeHandleChange,
    memberShipTypeForm,
    clubs,
    memberTypePickerHandleChange,
    showAddMemberService,
    setShowAddMemberService,
    globalFilterValue,
    setGlobalFilterValue,
    filters,
    onGlobalFilterChange,
    memberShipAddColumn,
    memberShipAddData,
    selectedRow,
    setSelectedRow,
    removeAll,
    submit,
    visible,
    setVisible,
    footerContent,
    newName,
    newNameHandle,
    editMemberType,
    accessSchedules
  };
};

export default MemberShipContainer;
