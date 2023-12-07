import { PickList } from "primereact/picklist";
import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import itemsbackword from "../../../../assets/icons/itemsbackward.png";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import Input from "../../../../components/input/input";
import { Editor } from "primereact/editor";
import { useSelector } from "react-redux";
import TableData from "../../../../components/cards/dataTable/dataTable";
import MuliSelectDropDown from "../../../../components/dropdown/muliSelectDropDown";

const AddMembershipPlan = ({
  onClickChangePage,
  allAgreementCategoryData,
  handleChangeMember,
  membershipForm,
  subCategoryOption,
  allClubs,
  membershipTypeData,
  allAssessedFee,
  MemberPickerHandleChange,
  showAddMemberShipService,
  setShowAddMemberShipService,
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
}) => {
  const TemplateOption = useSelector(
    (state) => state.staticData.AgreementTemplate
  );
  const memberAutoPay = useSelector((state) => state.staticData.memberAutoPay);
  const memberOften = useSelector((state) => state.staticData.memberOften);
  const memberClientCharge = useSelector(
    (state) => state.staticData.memberClientCharge
  );
  const memberAfter6Month = useSelector(
    (state) => state.staticData.memberAfter6Month
  );
  const choiceType = useSelector((state) => state.staticData.choiceType);

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <div className="flex align-items-center gap-2">
            <span>{item?.label}</span>
          </div>
        </div>
      </div>
    );
  };

  const AddServices = () => {
    return (
      <>
        <div className="px-4">
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
                handleChangeMember({
                  name: "services",
                  value: selectedRow,
                });
                setShowAddMemberShipService(false);
              }}
              className="btn-dark mx-3   border-none"
            ></Buttons>
          </div>
          <div className="mt-3">
            <Buttons
              onClick={() => {
                setShowAddMemberShipService(false);
              }}
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </>
    );
  };

  const MainFunctionMemberShipPlan = () => {
    return (
      <>
        <div className="px-4">
          <div className=" flex align-items-center justify-content-between my-3">
            <span className="text-xl font-bold text-900">Add Membership Plan</span>
          </div>
          <div className="my-3">
            <CardWithTitle title="General">
              <div className="p-3">
                <div className="flex  ">
                  <div className="col">
                    <DropDown
                      title="Category"
                      options={allAgreementCategoryData}
                      name="category"
                      value={membershipForm.category}
                      onChange={(e) =>
                        handleChangeMember({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      }
                      state={membershipForm}
                    ></DropDown>
                  </div>
                  <div className="col">
                    <DropDown
                      title="Subcategory"
                      options={subCategoryOption}
                      name="subCategory"
                      value={membershipForm.subCategory}
                      onChange={(e) =>
                        handleChangeMember({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      }
                      state={membershipForm}
                    ></DropDown>
                  </div>
                  <div className="col">
                    <Input
                      title="Name"
                      name="name"
                      value={membershipForm.name}
                      onChange={(e) =>
                        handleChangeMember({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      }
                      state={membershipForm}
                    ></Input>
                  </div>
                </div>
                <div className="flex mt-2">
                  <div className="col">
                    <MuliSelectDropDown
                      title="Club"
                      options={allClubs}
                      name="clubs"
                      value={membershipForm.clubs}
                      onChange={(e) =>
                        handleChangeMember({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      }
                      state={membershipForm}
                    ></MuliSelectDropDown>
                  </div>
                  <div className="col">
                    <DropDown
                      title="Membership Type"
                      options={membershipTypeData}
                      name="membershipType"
                      value={membershipForm.membershipType}
                      onChange={(e) =>
                        handleChangeMember({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      }
                      state={membershipForm}
                    ></DropDown>
                  </div>
                  <div className="col">
                    <DropDown
                      title="Agreement Template"
                      options={TemplateOption}
                      name="agreementTemplate"
                      value={membershipForm.agreementTemplate}
                      onChange={(e) =>
                        handleChangeMember({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      }
                      state={membershipForm}
                    ></DropDown>
                  </div>
                </div>
              </div>
              <div className="p-3 ">
                <span className="font-semibold mx-3">Assessed Feed</span>
                <div className="card  ">
                  <PickList
                    source={allAssessedFee}
                    name="assessedFees"
                    target={membershipForm.assessedOption}
                    onChange={(e) =>
                      MemberPickerHandleChange({
                        name: "assessedOption",
                        value: e.target,
                        source: e.source,
                      })
                    }
                    itemTemplate={itemTemplate}
                    breakpoint=""
                    sourceHeader="Available"
                    targetHeader="Selected"
                    sourceStyle={{ height: "30rem" }}
                    targetStyle={{ height: "30rem" }}
                  />
                </div>
              </div>
            </CardWithTitle>
            <div
              className="text-danger"
              style={{ color: "red", marginTop: "0.8rem" }}
            >
              {membershipForm?.formErrors?.assessedFees}
            </div>
          </div>
          <div>
            <CardWithTitle title="Services">
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
                  {membershipForm?.services?.length > 0 ? (
                    <div className="w-7 align-items-center  p-2">
                      {membershipForm?.services?.map((child, childIndex) => {
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
                      })}
                    </div>
                  ) : (
                    <div className="col-9 flex justify-content-center align-items-center">
                      <span className="text-xs font-semibold text-dark-gray text-center ">
                        No Row To Show
                      </span>
                    </div>
                  )}
                  <div
                    className="col flex justify-content-center align-items-center  "
                    style={{ height: "180px" }}
                  >
                    <div className="flex flex-column ">
                      <div
                        className="my-3"
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          label="Add"
                          onClick={() => setShowAddMemberShipService(true)}
                          className="btn-dark border-none "
                        ></Buttons>
                      </div>
                      <div
                        className=""
                        style={{ width: "128px", height: "35px" }}
                      >
                        <Buttons
                          className="btn-dark border-none
                    l"
                          label="Remove"
                          onClick={removeAll}
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className="my-3">
            <CardWithTitle title="Contract Options">
              <div className="p-3">
                <div className="flex  flex-wrap">
                  <div className="col-4">
                    <DropDown
                      title="Autopay"
                      placeholder="Select"
                      options={memberAutoPay}
                      name="autoPay"
                      value={membershipForm.autoPay}
                      onChange={(e) =>
                        handleChangeMember({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      }
                      state={membershipForm}
                    ></DropDown>
                  </div>
                  <div className="col-4">
                    <DropDown
                      title="How often will clients be charged?"
                      placeholder="Select"
                      options={memberOften}
                      name="clientsChargeCycle"
                      value={membershipForm.clientsChargeCycle}
                      onChange={(e) =>
                        handleChangeMember({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      }
                      state={membershipForm}
                    ></DropDown>
                  </div>
                  {membershipForm.clientsChargeCycle ===
                  "Set Number of Autopays" ? (
                    <div className="col-4">
                      <Input
                        title="Numbers of autopays"
                        placeholder="6"
                        name="noOfAutoPays"
                        value={membershipForm.noOfAutoPays}
                        onChange={(e) =>
                          handleChangeMember({
                            name: e.target.name,
                            value: e.target.value,
                          })
                        }
                        state={membershipForm}
                      ></Input>
                    </div>
                  ) :  (
                    <div className="col-4">
                      <Input
                        title="Time Period (Month)"
                        placeholder="Enter"
                        name="timePeriod"
                        disabled={membershipForm.clientsChargeCycle === "Month-to-Month" ? false : true}
                        value={membershipForm.timePeriod}
                        onChange={(e) =>
                          handleChangeMember({
                            name: e.target.name,
                            value: e.target.value,
                          })
                        }
                        state={membershipForm}
                      ></Input>
                    </div>
                  ) }
                </div>
                <div className="flex flex-wrap mt-2">
                  <div className="col-4">
                    <DropDown
                      title="When will clients be charged?"
                      placeholder="Select"
                      options={memberClientCharge}
                      name="clientsChargeTime"
                      value={membershipForm.clientsChargeTime}
                      onChange={(e) =>
                        handleChangeMember({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      }
                      state={membershipForm}
                    ></DropDown>
                  </div>
                  {membershipForm.clientsChargeTime === "specific Date" ? (
                    <div className="col-4 Without-tile-inputheight">
                      <Input
                        title="Date"
                        placeholder="Select"
                        type="date"
                        name="date"
                        value={membershipForm.date}
                        onChange={(e) =>
                          handleChangeMember({
                            name: e.target.name,
                            value: e.target.value,
                          })
                        }
                        state={membershipForm}
                      ></Input>
                    </div>
                  ) : null}
                  <div className="col-4">
                    <DropDown
                      title="What happens after 6 payments?"
                      placeholder="Select"
                      options={memberAfter6Month}
                      name="resultAfterSixPayments"
                      value={membershipForm.resultAfterSixPayments}
                      onChange={(e) =>
                        handleChangeMember({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      }
                      state={membershipForm}
                    ></DropDown>
                  </div>
                  <div className="col-4">
                    <DropDown
                      title="Sell Online"
                      placeholder="Select"
                      options={choiceType}
                      name="sellOnline"
                      value={membershipForm.sellOnline}
                      onChange={(e) =>
                        handleChangeMember({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      }
                      state={membershipForm}
                    ></DropDown>
                  </div>
                </div>
                {/* <div className="flex mt-2">

                </div> */}
                {membershipForm.sellOnline == true ? (
                  <div className="card m-2 mt-5">
                    <div className="py-2 text-xs font-semibold text-dark-gray">
                      Online Description
                    </div>
                    <Editor
                      name="onlineDescription"
                      value={membershipForm.onlineDescription}
                      onTextChange={(e) =>
                        handleChangeMember({
                          name: "onlineDescription",
                          value: e.htmlValue,
                        })
                      }
                      style={{ height: "320px" }}
                    />
                  </div>
                ) : null}
              </div>
            </CardWithTitle>
          </div>

          <div className="flex justify-content-end mt-4">
            <div className="flex mx-2 ">
              <div className="mx-4">
                <Buttons
                  label="Save"
                  onClick={submit}
                  className="btn-dark mx-3 border-none "
                />
              </div>
              <div className="">
                <Buttons
                  onClick={onClickChangePage}
                  label="Cancel"
                  className="btn-grey  border-none "
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div>
        {showAddMemberShipService
          ? AddServices()
          : MainFunctionMemberShipPlan()}
      </div>
    </>
  );
};

export default AddMembershipPlan;
