import React from "react";
import Buttons from "../../../../../components/buttons/button";
import DropDown from "../../../../../components/dropdown/dropdown";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../components/input/input";
import johnsmith from "../../../../../assets/images/image.png";
import Camera from "../../../../../assets/icons/camera.png";
import { PickList } from "primereact/picklist";
import itemsbackword from "../../../../../assets/icons/itemsbackward.png";

const AddCatelogGeneral = ({ openaddcatalogtab }) => {
  const getImage = (el) => {
    var input = document.getElementById("file-input");
    document.getElementById("showImage").hidden = false;
    document.getElementById("showImage").src = URL.createObjectURL(
      input.files[0]
    );
  };
  const itemTemplate = (item) => {
    return (
      <div className=" flex flex-wrap p-2 align-items-center gap-3">
        <img
          className="w-4rem shadow-2 flex-shrink-0 border-round"
          src={itemsbackword}
          alt={item.name}
        />
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{item.category}</span>
          </div>
        </div>
        <span className="font-bold text-900">${item.price}</span>
      </div>
    );
  };
  return (
    <>
      <div>
        <div>
          <CardWithTitle title="General">
            <div className="flex p-4">
              <div
                id="Image"
                className=" relative flex flex-column justify-content-end algin-content-center"
              >
                <img
                  id="showImage"
                  style={{ width: "154px", height: "161px" }}
                  className="border-round"
                  src={johnsmith}
                  alt=""
                />
                <div className="absolute w-full text-center -mb-2  flex justify-content-center algin-content-bottom ">
                  <div class="image-upload">
                    <label for="file-input">
                      <img
                        style={{ width: "24px", height: "24px" }}
                        src={Camera}
                        alt=""
                      />
                    </label>
                    <input
                      id="file-input"
                      onChange={getImage}
                      name="file-input"
                      type="file"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="flex  ">
                <div className="col-4">
                  <DropDown
                    title="Type"
                    name="Available Profit Center"
                    placeholder="Type"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <Input title="Name" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <Input title="UPC" name="name"></Input>
                </div>
              </div>
              <div className="flex ">
                <div className="col-4 ">
                  <DropDown
                    title="Profit Center"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <DropDown
                    title="Category"
                    placeholder="None"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <Input title="Item Caption" name="name"></Input>
                </div>
              </div>
              <div className="flex ">
                <div className="col-4 ">
                  <DropDown
                    title="How is this item sold?"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <DropDown
                    title="Is this item recurring"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <DropDown
                    title="Can this item only be purchased 1 time?"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
              </div>
              <div className="flex ">
                <div className="col-4 ">
                  <DropDown
                    title="Can this item be redeemed at a later date?"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <DropDown
                    title="Is this item sold Online"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-3">
          <CardWithTitle title="Product Settings">
            <div className="flex p-2">
              <div className="col-4">
                <DropDown
                  title="Profit Type"
                  name=" "
                  placeholder="Select one"
                  options={["Yes", "No"]}
                ></DropDown>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-3">
          <CardWithTitle title="Report Data Access">
            <div className=" p-3 ">
              <PickList
                // source={source}
                // target={target}
                // onChange={onChange}
                itemTemplate={itemTemplate}
                breakpoint=""
                sourceHeader="Available"
                targetHeader="Selected"
                sourceStyle={{ height: "20rem" }}
                targetStyle={{ height: "20rem" }}
              />
            </div>
          </CardWithTitle>
        </div>
        <div className="my-3">
          <CardWithTitle title="Taxes">
            <div className=" p-3 ">
              <PickList
                itemTemplate={itemTemplate}
                breakpoint=""
                sourceHeader="Available"
                targetHeader="Selected"
                sourceStyle={{ height: "20rem" }}
                targetStyle={{ height: "20rem" }}
              />
            </div>
          </CardWithTitle>
        </div>

        <div className="my-3 ">
          <CardWithTitle
            title="Item"
            title2="Value"
            title3="Fixed"
            title2className="pl-8"
            title3className={"mr-5"}
          >
            <div className="p-3 flex justify-content-between align-items-center ">
              <div className="w-2 text-gray-300 text-sm">Unit scadvcass</div>
              <div className="">
                <Input></Input>
              </div>
              <div className="">
                <DropDown></DropDown>
              </div>
            </div>
          </CardWithTitle>
        </div>

        <div>
          <CardWithTitle title="Details">
            <div className="p-3">
              <div className="flex  ">
                <div className="col-4">
                  <DropDown
                    title="Type"
                    name="Allow Unlimited"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <Input title="Minimum Quantity" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Maximum Quantity" name="name"></Input>
                </div>
              </div>
              <div className="flex ">
                <div className="col-4 ">
                  <Input title="Default Quantity" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <Input title="Default Price" name="name"></Input>
                </div>
                <div className="col-4 ">
                  <DropDown
                    title="Stockable"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
              </div>
              <div className="flex ">
                <div className="col-4 ">
                  <DropDown
                    title="When will item start?"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 ">
                  <DropDown
                    title="Expiration"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col-4 flex">
                  <div className="col py-0 pl-0 ">
                    <DropDown
                      title="Days"
                      placeholder="Select"
                      options={["1", "2"]}
                    ></DropDown>
                  </div>
                  <div className="col py-0 pr-0">
                    <DropDown
                      title="Month"
                      placeholder="Select"
                      options={["1", "2"]}
                    ></DropDown>
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Dynamic Pricing  ">
            <div className="p-3">
              <div className="flex  ">
                <div className="col">
                  <DropDown
                    title="More than"
                    name="Allow Unlimited"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col ">
                  <Input title="Unit Price" name="name"></Input>
                  <div className="flex justify-content-center">
                    <small className="text-gray-400 text-sm">
                      Markup: <span className="text-green-500">15% </span>
                    </small>
                  </div>
                </div>
                <div className="col">
                  <DropDown
                    title="More than"
                    name="Allow Unlimited"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col ">
                  <Input title="Unit Price" name="name"></Input>
                  <div className="flex justify-content-center">
                    <small className="text-gray-400 text-sm">
                      Markup: <span className="text-green-500">15% </span>
                    </small>
                  </div>
                </div>
                <div className="col">
                  <DropDown
                    title="More than"
                    name="Allow Unlimited"
                    placeholder="Select one"
                    options={["Yes", "No"]}
                  ></DropDown>
                </div>
                <div className="col ">
                  <Input title="Unit Price" name="name"></Input>
                  <div className="flex justify-content-center">
                    <small className="text-gray-400 text-sm">
                      Markup: <span className="text-green-500">15% </span>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className=" m-2 mt-3 flex justify-content-end">
          <div className="mx-4">
            <Buttons
              label="Save"
              className="btn-dark  mx-3  border-none"
            ></Buttons>
          </div>
          <div className="">
            <Buttons
              onClick={() => openaddcatalogtab()}
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCatelogGeneral;
