import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMemberShipType } from "../../../../redux/actions/memberShipTypesAction";
import { useEffect } from "react";

const MemberShipContainer = () => {
  const dispatch = useDispatch();
  const membershipTypeData = useSelector(
    (state) => state.memberShip.membershipType
  );
  const [showAddMemebershipType, setAddMemebershipType] = useState(false);
  const [memberShipTypeForm, setMemberShipTypeForm] = useState({
    name: "",
    description: "",
    discountType: "",
    accessRestriction: null,
    accessSchedule: "",
    allowRemoteCheckIn: null,
    availableTypes: "",
    clubCreditAmount: "",
    specialRestriction: "",
    minimumAgeAllowed: "",
    maximumAgeAllowed: "",
    clubs: "",
    services: [],
  });

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
    },
    {
      field: "discount Type",
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
  };

  const memberTypeHandleChange = ({name,value}) => {
setMemberShipTypeForm((prev)=>{
    return{
        ...prev,
        [name]:value,
    }
})
  }

  useEffect(() => {
    dispatch(getMemberShipType());
  }, []);

  return {
    showAddMemebershipType,
    showAddMemebershipTypeScreen,
    ManageMembershipTypesColumn,
    membershipTypeData,
    memberTypeHandleChange,
  };
};

export default MemberShipContainer;
