import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import itemsbackword from "../../../../assets/icons/itembackward.png";
import { InputTextarea } from "primereact/inputtextarea";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import { PickList } from "primereact/picklist";
import { useSelector } from "react-redux";
import TableData from "../../../../components/cards/dataTable/dataTable";
import { Dialog } from "primereact/dialog";
import MuliSelectDropDown from "../../../../components/dropdown/muliSelectDropDown";

const AddMembershipType = ({
  showAddMemebershipTypeScreen,
  memberShipTypeForm,
  memberTypeHandleChange,
  clubs,
  memberTypePickerHandleChange,
  membershipTypeData,
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
  accessSchedules,
}) => {
  const choiceTypeOptions = useSelector((state) => state.staticData.choiceType);
  const discountOptions = useSelector(
    (state) => state.staticData.discountMember
  );
  const restrictionOption = useSelector((state) => state.staticData.memberAge);
  const optionmembershipTypeData = membershipTypeData.map((item) => {
    return { label: item.name, value: item._id };
  });

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="">{item.name}</span>
        </div>
      </div>
    );
  };

  const AddServices = () => {
    return (
      <>
        <div>
          <div className="flex justify-content-between">
            <p className="text-xl font-bold my-3 text-900 ">Add Service</p>
            <Input
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Search"
              icon="pi pi-search"
            ></Input>
          </div>
          <div>
            <TableData
              filters={filters}
              sorting
              paginator
              rows={5}
              // selected={addEventData.services.detail}
              selected={selectedRow}
              // changeSelection={(e)=>serviceHandleChange(e)}
              changeSelection={(e) => {
                setSelectedRow(e.value);
              }}
              selectionMode="checkbox"
              columns={memberShipAddColumn}
              data={memberShipAddData}
            ></TableData>
          </div>
        </div>
        <div className=" m-2  flex justify-content-end">
          <div className="mt-3 mx-4">
            <Buttons
              label="Add"
              onClick={(e) => {
                memberTypeHandleChange({
                  name: "services",
                  value: selectedRow,
                });
                setShowAddMemberService(false);
              }}
              className="btn-dark mx-3   border-none"
            ></Buttons>
          </div>
          <div className="mt-3">
            <Buttons
              onClick={() => {
                setShowAddMemberService(false);
              }}
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </>
    );
  };

  const AddMemberShipTypeMain = () => {
    return (
      <>
        <div>
          {" "}
          <div className="my-3">
            <span className="text-xl font-bold text-900 ">
              Add Membership Type
            </span>
          </div>
          <div className="">
            <Checkbox
              title="Active"
              className="text-900 font-semibold"
              name="isActive"
              value={memberShipTypeForm?.isActive}
              onChange={memberTypeHandleChange}
            ></Checkbox>
          </div>
          <div className="mt-3">
            <CardWithTitle title="General ">
              <div className=" p-3">
                <div className="flex ">
                  <div className="col">
                    <Input
                      title="Name"
                      name="name"
                      value={memberShipTypeForm.name}
                      onChange={memberTypeHandleChange}
                      state={memberShipTypeForm}
                    ></Input>
                  </div>
                  <div className="col">
                    <Input
                      title="Description"
                      name="description"
                      value={memberShipTypeForm.description}
                      onChange={memberTypeHandleChange}
                      state={memberShipTypeForm}
                    ></Input>
                  </div>
                  <div className="col">
                    <DropDown
                      title="Discount Type"
                      name="discountType"
                      options={discountOptions}
                      value={memberShipTypeForm.discountType}
                      onChange={memberTypeHandleChange}
                      state={memberShipTypeForm}
                    ></DropDown>
                  </div>
                </div>
                <div className="flex my-3">
                  <div className="col">
                    <DropDown
                      title="Access Restriction"
                      options={choiceTypeOptions}
                      optionLabel="label"
                      name="accessRestriction"
                      value={memberShipTypeForm.accessRestriction}
                      onChange={memberTypeHandleChange}
                      state={memberShipTypeForm}
                    ></DropDown>
                  </div>
                  <div
                    className="col"
                    // style={
                    //   memberShipTypeForm.accessRestriction == true
                    //     ? {}
                    //     : { pointerEvents: "none",opacity:"0.5" }
                    // }
                  >
                    <DropDown
                      title="Select Access Schedule"
                      disabled={
                        memberShipTypeForm.accessRestriction === true
                          ? false
                          : true
                      }
                      options={accessSchedules}
                      name="accessSchedule"
                      optionLabel="name"
                      value={memberShipTypeForm.accessSchedule}
                      onChange={memberTypeHandleChange}
                      state={memberShipTypeForm}
                    ></DropDown>
                  </div>
                  <div className="col">
                    <DropDown
                      title="Allow Remote CheckIn"
                      options={choiceTypeOptions}
                      optionLabel="label"
                      name="allowRemoteCheckIn"
                      value={memberShipTypeForm.allowRemoteCheckIn}
                      onChange={memberTypeHandleChange}
                      state={memberShipTypeForm}
                    ></DropDown>
                  </div>
                </div>
                <div className="flex ">
                  <div className="col">
                    <DropDown
                      title="Transfer to another Type"
                      options={optionmembershipTypeData}
                      // disabled={memberShipTypeForm.isActive === true ? true : false}
                      optionLabel="label"
                      name="transferToAnotherType"
                      value={memberShipTypeForm.transferToAnotherType}
                      onChange={memberTypeHandleChange}
                      state={memberShipTypeForm}
                    ></DropDown>
                  </div>
                  <div className="col">
                    <Input
                      title="Club Credit Amount"
                      name="clubCreditAmount"
                      value={memberShipTypeForm.clubCreditAmount}
                      onChange={memberTypeHandleChange}
                      state={memberShipTypeForm}
                    ></Input>
                  </div>
                  <div className="col-4">
                    <MuliSelectDropDown
                      title="Special Restriction"
                      options={restrictionOption}
                      name="specialRestriction"
                      value={memberShipTypeForm.specialRestriction}
                      onChange={memberTypeHandleChange}
                      state={memberShipTypeForm}
                    ></MuliSelectDropDown>
                  </div>
                </div>
                <div>
                  <div className=" flex flex-wrap my-3 ">
                    {memberShipTypeForm.specialRestriction.includes(
                      "By Age"
                    ) ? (
                      <>
                        <div className="col-4">
                          <Input
                            title="Minimum Age Allowed"
                            name="minimumAgeAllowed"
                            value={memberShipTypeForm.minimumAgeAllowed}
                            onChange={memberTypeHandleChange}
                            state={memberShipTypeForm}
                            keyfilter="num"
                          ></Input>
                        </div>
                        <div className="col-4">
                          <Input
                            title="Maximum Age Allowed"
                            name="maximumAgeAllowed"
                            value={memberShipTypeForm.maximumAgeAllowed}
                            onChange={memberTypeHandleChange}
                            state={memberShipTypeForm}
                            keyfilter="num"
                          ></Input>
                        </div>
                      </>
                    ) : null}
                    {memberShipTypeForm.specialRestriction.includes(
                      "By Days"
                    ) ? (
                      <div className="col-4">
                        <Input
                          title="Maximum Days Allowed"
                          name="maximumDaysAllowed"
                          value={memberShipTypeForm.maximumDaysAllowed}
                          onChange={memberTypeHandleChange}
                          state={memberShipTypeForm}
                          keyfilter="num"
                        ></Input>
                      </div>
                    ) : null}
                    {memberShipTypeForm.specialRestriction.includes(
                      "By Location"
                    ) ? (
                      <div className="col-4">
                        <Input
                          title="Maximum Distance Allowed"
                          name="maximumDistanceAllowed"
                          value={memberShipTypeForm.maximumDistanceAllowed}
                          onChange={memberTypeHandleChange}
                          state={memberShipTypeForm}
                          keyfilter="num"
                          overlappingText="/Miles"
                        ></Input>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className="my-3">
            <CardWithTitle title="Clubs">
              <div className="card p-3 ">
                <PickList
                  source={clubs}
                  name="clubsOption"
                  target={memberShipTypeForm.clubsOption}
                  onChange={(e) =>
                    memberTypePickerHandleChange({
                      name: "clubsOption",
                      value: e.target,
                      source: e.source,
                    })
                  }
                  itemTemplate={itemTemplate}
                  breakpoint=""
                  sourceHeader="Available"
                  targetHeader="Selected"
                  sourceStyle={{ height: "10rem" }}
                  targetStyle={{ height: "10rem" }}
                />
              </div>
            </CardWithTitle>
            <div
              className="text-danger"
              style={{ color: "red", marginTop: "0.8rem" }}
            >
              {memberShipTypeForm?.formErrors?.clubs}
            </div>
          </div>
          <div className="my-2">
            <div className=" p-2 mt-4 bg-lightest-blue border-round-md shadow-3">
              <span>
                <i
                  className="pi pi-info-circle  mx-3"
                  style={{ color: " rgba(50, 155, 234, 1)" }}
                ></i>
              </span>
              <span
                className="mx-3  "
                style={{ color: " rgba(50, 155, 234, 1)" }}
              >
                To inactivate Membership Type move all the clubs to ‘Available’
                section.
              </span>
            </div>
          </div>
          <div className="mt-4">
            <CardWithTitle titlee="Add Services">
              <div className="p-3">
                <div className="flex justify-content-between align-items-center  w-7  py-2 pl-4 pr-3">
                  <span className="text-xs font-semibold text-gray-600 w-6rem">
                    Catalog Price
                  </span>
                  <span className="text-xs font-semibold text-gray-600 w-6rem ">
                    Name
                  </span>
                  <span className="text-xs font-semibold text-gray-600 w-6rem ">
                    Size
                  </span>
                  <span className="text-xs font-semibold text-gray-600 w-6rem">
                    Status
                  </span>
                </div>

                <div className="bg-white m-2 border-round-lg flex ">
                  {memberShipTypeForm?.services?.length > 0 ? (
                    <div className="w-7 align-items-center  p-2">
                      {memberShipTypeForm?.services?.map(
                        (child, childIndex) => {
                          return (
                            <div className="flex justify-content-between  p-2  ">
                              <span className="text-xs font-semibold text-gray-600 w-6rem">
                                {child.catelogPrice}
                              </span>
                              <span className="text-xs font-semibold text-gray-600 w-6rem">
                                {child.name}
                              </span>
                              <span className="text-xs font-semibold text-gray-600 w-6rem">
                                {child.size}
                              </span>
                              <span className="text-xs font-semibold text-gray-600 w-6rem">
                                {child.status == true ? "Active" : "Inactive"}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div className="col-9 flex justify-content-center align-items-center">
                      <span className="text-xs font-semibold text-gray-600 text-center ">
                        No Row To Show
                      </span>
                    </div>
                  )}

                  <div
                    className="col flex justify-content-end align-items-center pr-7 "
                    style={{ height: "290px" }}
                  >
                    <div className="flex flex-column ">
                      <div
                        className="my-3"
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          label="Add"
                          onClick={() => setShowAddMemberService(true)}
                          className="btn-dark border-none "
                        ></Buttons>
                      </div>

                      <div
                        className="my-3"
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none"
                          label="Remove All"
                          onClick={removeAll}
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div
            className="text-danger"
            style={{ color: "red", marginTop: "0.8rem" }}
          >
            {memberShipTypeForm?.formErrors?.services}
          </div>
          <div className=" m-2 mt-3 flex justify-content-end">
            {editMemberType ? (
              <div className="" style={{ width: "105px" }}>
                <Buttons
                  label="Copy"
                  className="btn-dark border-none"
                  onClick={() => setVisible(true)}
                ></Buttons>
              </div>
            ) : null}
            {/* <div className="" style={{ width: "105px" }}>
              <Buttons label="Copy" className="btn-dark border-none" onClick={() => setVisible(true)}></Buttons>
            </div> */}
            <div className="mx-3" style={{ width: "105px" }}>
              <Buttons
                label="Save"
                className="btn-dark border-none"
                onClick={submit}
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                onClick={showAddMemebershipTypeScreen}
                label="Cancel"
                className="btn-grey   border-none"
              ></Buttons>
            </div>
          </div>
        </div>
        <div>
          <RecentCheckIn data={checkInData}></RecentCheckIn>
        </div>
        <Dialog
          header="Create Membership Type"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
          footer={footerContent}
        >
          <div className="p-3 ">
            <div className="flex justify-content-between ">
              <div className="col">
                <Input
                  title="Name"
                  value={newName}
                  onChange={newNameHandle}
                  name="name"
                  state={memberShipTypeForm}
                ></Input>
              </div>
            </div>
          </div>
        </Dialog>
      </>
    );
  };

  return (
    <>
      {" "}
      {showAddMemberService ? AddServices() : AddMemberShipTypeMain()}
      {/* <div>
        {" "}
        <div className="my-3">
          <span className="text-xl font-bold text-900 ">
            Add Membership Type
          </span>
        </div>
        <div className="">
          <Checkbox
            title="Active"
            className="text-900 font-semibold"
            value={memberShipTypeForm?.isActive}
            onChange={memberTypeHandleChange}
          ></Checkbox>
        </div>
        <div className="mt-3">
          <CardWithTitle title="General ">
            <div className=" p-3">
              <div className="flex ">
                <div className="col">
                  <Input
                    title="Name"
                    name="name"
                    value={memberShipTypeForm.name}
                    onChange={memberTypeHandleChange}
                    state={memberShipTypeForm}
                  ></Input>
                </div>
                <div className="col">
                  <Input
                    title="Description"
                    name="description"
                    value={memberShipTypeForm.description}
                    onChange={memberTypeHandleChange}
                    state={memberShipTypeForm}
                  ></Input>
                </div>
                <div className="col">
                  <DropDown
                    title="Discount Type"
                    name="discountType"
                    options={discountOptions}
                    value={memberShipTypeForm.discountType}
                    onChange={memberTypeHandleChange}
                    state={memberShipTypeForm}
                  ></DropDown>
                </div>
              </div>
              <div className="flex my-3">
                <div className="col">
                  <DropDown
                    title="Access Restriction"
                    options={choiceTypeOptions}
                    optionLabel="label"
                    name="accessRestriction"
                    value={memberShipTypeForm.accessRestriction}
                    onChange={memberTypeHandleChange}
                    state={memberShipTypeForm}
                  ></DropDown>
                </div>
                <div
                  className="col"
                  style={
                    memberShipTypeForm.accessRestriction == true
                      ? {}
                      : { pointerEvents: "none" }
                  }
                >
                  <DropDown
                    title="Select Access Schedule"
                    options={scheduleOptions}
                    name="accessSchedule"
                    value={memberShipTypeForm.accessSchedule}
                    onChange={memberTypeHandleChange}
                    state={memberShipTypeForm}
                  ></DropDown>
                </div>
                <div className="col">
                  <DropDown
                    title="Allow Remote CheckIn"
                    options={choiceTypeOptions}
                    optionLabel="label"
                    name="allowRemoteCheckIn"
                    value={memberShipTypeForm.allowRemoteCheckIn}
                    onChange={memberTypeHandleChange}
                    state={memberShipTypeForm}
                  ></DropDown>
                </div>
              </div>
              <div className="flex ">
                <div className="col">
                  <DropDown
                    title="Transfer to another Type"
                    options={membershipTypeData}
                    optionLabel="name"
                    name="transferToAnotherType"
                    value={memberShipTypeForm.transferToAnotherType}
                    onChange={memberTypeHandleChange}
                    state={memberShipTypeForm}
                  ></DropDown>
                </div>
                <div className="col">
                  <Input
                    title="Club Credit Amount"
                    name="clubCreditAmount"
                    value={memberShipTypeForm.clubCreditAmount}
                    onChange={memberTypeHandleChange}
                    state={memberShipTypeForm}
                  ></Input>
                </div>
                <div className="col-4">
                  <DropDown
                    title="Special Restriction"
                    options={restrictionOption}
                    name="specialRestriction"
                    value={memberShipTypeForm.specialRestriction}
                    onChange={memberTypeHandleChange}
                    state={memberShipTypeForm}
                  ></DropDown>
                </div>
                
              </div>
              <div>
                <div className=" flex my-3 ">
                  {memberShipTypeForm.specialRestriction == "By Age" ? (
                    <>
                      <div className="col-4">
                        <Input
                          title="Minimum Age Allowed"
                          name="minimumAgeAllowed"
                          value={memberShipTypeForm.minimumAgeAllowed}
                          onChange={memberTypeHandleChange}
                          state={memberShipTypeForm}
                        ></Input>
                      </div>
                      <div className="col-4">
                        <Input
                          title="Maximum Age Allowed"
                          name="maximumAgeAllowed"
                          value={memberShipTypeForm.maximumAgeAllowed}
                          onChange={memberTypeHandleChange}
                          state={memberShipTypeForm}
                        ></Input>
                      </div>
                    </>
                  ) : null}
                  {memberShipTypeForm.specialRestriction == "By Days" ? (
                    <div className="col-4">
                      <Input
                        title="Maximum Days Allowed"
                        name="maximumDaysAllowed"
                        value={memberShipTypeForm.maximumDaysAllowed}
                        onChange={memberTypeHandleChange}
                        state={memberShipTypeForm}
                      ></Input>
                    </div>
                  ) : null}
                  {memberShipTypeForm.specialRestriction == "By Location" ? (
                    <div className="col-4">
                      <Input title="Maximum Distance Allowed"></Input>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-3">
          <CardWithTitle title="Clubs">
            <div className="card p-3 ">
              <PickList
                source={clubs}
                name="clubsOption"
                target={memberShipTypeForm.clubsOption}
                onChange={(e) =>
                  memberTypePickerHandleChange({
                    name: "clubsOption",
                    value: e.target,
                    source: e.source,
                  })
                }
                itemTemplate={itemTemplate}
                breakpoint=""
                sourceHeader="Available"
                targetHeader="Selected"
                sourceStyle={{ height: "10rem" }}
                targetStyle={{ height: "10rem" }}
              />
            </div>
          </CardWithTitle>
        </div>
        <div className="my-2">
          <div className=" p-2 mt-4 bg-lightest-blue border-round-md shadow-3">
            <span>
              <i
                className="pi pi-info-circle  mx-3"
                style={{ color: " rgba(50, 155, 234, 1)" }}
              ></i>
            </span>
            <span
              className="mx-3  "
              style={{ color: " rgba(50, 155, 234, 1)" }}
            >
              To inactivate Membership Type move all the clubs to ‘Available’
              section.
            </span>
          </div>
        </div>
        <div className="mt-4">
                <CardWithTitle titlee="Add Services">
                  <div className="p-3">
                    <div className="flex justify-content-between align-items-center  w-7  py-2 pl-4 pr-3">
                      <span className="text-xs font-semibold text-gray-600 w-6rem">
                        Catalog Price
                      </span>
                      <span className="text-xs font-semibold text-gray-600 w-6rem ">
                        Name
                      </span>
                      <span className="text-xs font-semibold text-gray-600 w-6rem ">
                        Size
                      </span>
                      <span className="text-xs font-semibold text-gray-600 w-6rem">
                        Status
                      </span>
                    </div>

                    <div className="bg-white m-2 border-round-lg flex ">
                      {memberShipTypeForm.services.length > 0 ? (
                        <div className="w-7 align-items-center  p-2">
                          {memberShipTypeForm.services.map((child, childIndex) => {
                            return (
                              <div
                                className="flex justify-content-between  p-2  "
                              >
                                <span className="text-xs font-semibold text-gray-600 w-6rem">
                                  {child.catelogPrice}
                                </span>
                                <span className="text-xs font-semibold text-gray-600 w-6rem">
                                  {child.name}
                                </span>
                                <span className="text-xs font-semibold text-gray-600 w-6rem">
                                  {child.size}
                                </span>
                                <span className="text-xs font-semibold text-gray-600 w-6rem">
                                  {child.status == true ? "Active" : "Inactive"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="col-9 flex justify-content-center align-items-center">
                          <span className="text-xs font-semibold text-gray-600 text-center ">
                            No Row To Show
                          </span>
                        </div>
                      )}

                      <div
                        className="col flex justify-content-end align-items-center pr-7 "
                        style={{ height: "290px" }}
                      >
                        <div className="flex flex-column ">
                          
                          <div
                            className="my-3"
                            style={{ width: "128px", height: "35px" }}
                          >
                            <Buttons
                              label="Add"
                              className="btn-dark border-none "
                            ></Buttons>
                          </div>
                          
                          <div
                            className="my-3"
                            style={{ width: "128px", height: "35px" }}
                          >
                            <Buttons
                              className="btn-dark border-none"
                              label="Remove All"
                            ></Buttons>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </CardWithTitle>
                
              </div>
              <div className="text-danger" style={{ color: "red",marginTop:'0.8rem' }}>
                  {memberShipTypeForm?.formErrors?.services}
                </div>

        <div className=" m-2 mt-3 flex justify-content-end">
          <div className="" style={{ width: "105px" }}>
            <Buttons label="Copy" className="btn-dark border-none"></Buttons>
          </div>
          <div className="mx-3" style={{ width: "105px" }}>
            <Buttons label="Save" className="btn-dark border-none"></Buttons>
          </div>
          <div className="">
            <Buttons
              onClick={showAddMemebershipTypeScreen}
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div> */}
    </>
  );
};

export default AddMembershipType;
