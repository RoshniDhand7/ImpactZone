import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import greenplus from "../../../../assets/icons/greenplus.png";
import greenminus from "../../../../assets/icons/greenminus.png";
import Buttons from "../../../../components/buttons/button";

const AddAgreementCategories = ({
  onClickChangePage,
  handleChangeAgreement,
  agreementCategoryForm,
  addSubCategory,
  handleChangeSubCategory,
  handleChangeSubCategoryDelete,
  save,
}) => {
  return (
    <>
      <div className="px-4">
        <div className="my-4">
          <Checkbox
            title="Active"
            name="isActive"
            value={agreementCategoryForm.isActive}
            onChange={(e) =>
              handleChangeAgreement({ name: "isActive", value: e.value })
            }
          ></Checkbox>
        </div>
        <div>
          <CardWithTitle title="Add Agreement Category ">
            <div className="p-3">
              <div className="flex">
                <div className="col-4">
                  <Input
                    title="Name"
                    placeholder="Traning"
                    name="name"
                    state={agreementCategoryForm}
                    value={agreementCategoryForm.name}
                    onChange={(e) =>
                      handleChangeAgreement({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                  ></Input>
                </div>
                {/* <div className="col-4">
                  <DropDown title="Plan Type" placeholder="Select" name="planType" state={agreementCategoryForm} value={agreementCategoryForm.planType} onChange={(e)=>handleChangeAgreement({name:e.target.name,value:e.value})}></DropDown>
                </div> */}
              </div>
              {agreementCategoryForm?.subCategories?.map((item, i) => {
                return (
                  <div className="flex align-items-center ">
                    <div className="col-4 mt-3 ">
                      <Input
                        title="Subcategory"
                        name="subCategories"
                        state={agreementCategoryForm}
                        value={item}
                        onChange={(e) =>
                          handleChangeSubCategory({
                            index: i,
                            value: e.target.value,
                          })
                        }
                      ></Input>
                    </div>
                    <div
                      className="mt-5"
                      style={{ width: "25px", height: "25px", display: "flex" }}
                    >
                      {i == 0 ? (
                        <img
                          src={greenplus}
                          alt=""
                          onClick={addSubCategory}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <img
                          src={greenminus}
                          alt=""
                          onClick={() => handleChangeSubCategoryDelete(i)}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
              {/* <div className="flex align-items-center ">
                <div className="col-4 mt-3 ">
                  <Input title="Subcategory"></Input>
                </div>
                <div className="mt-5" style={{ width: "25px", height: "25px" }}>
                  <img src={greenminus} alt="" onClick={handleChangeSubCategoryDelete}/>
                </div>
              </div> */}
            </div>
          </CardWithTitle>
        </div>
        <div className="flex justify-content-end mt-3 ">
          <div className="flex justify-content-end ">
            <div className="flex  p-2">
              <div className="mx-4">
                <Buttons
                  label="Save"
                  className="btn-dark mx-3 border-none "
                  onClick={save}
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
      </div>
    </>
  );
};

export default AddAgreementCategories;
