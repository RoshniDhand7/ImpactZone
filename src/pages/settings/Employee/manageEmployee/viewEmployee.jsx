import React from "react";
import JohnWick from "../../../../assets/images/john.jpg";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";

const ViewEmployee = () => {
  return (
    <div className="mx-3 mt-3">
      <div className="mx-2">
        <div className=" ">
          <div className="bg-lightest-blue  flex  border-round">
            <div className=" col-6 p-3 flex justify-content-between ">
              <div className="flex p-2">
                <div
                  id="Image"
                  className=" relative flex flex-column justify-content-end algin-content-center"
                >
                  <img
                    id="showImage"
                    style={{ width: "154px", height: "161px" }}
                    className="border-round"
                    src={JohnWick}
                    alt=""
                  />
                  <div className="absolute w-full text-center -mb-2  flex justify-content-center algin-content-bottom ">
                    {/* <img
                  className="mt-3"
                  style={{ width: "24px", height: "24px" }}
                  src={Camera}
                  alt=""
                /> */}

                    {/* <div class="image-upload">
                      <label for="file-input">
                        <img
                          style={{ width: "24px", height: "24px" }}
                          // src={Camera}
                          alt=""
                        />
                      </label>
                      <input
                        id="file-input"
                        // onChange={getImage}
                        name="file-input"
                        type="file"
                      />
                    </div> */}
                  </div>
                </div>

                <div className=" mx-3 mt-3  flex flex-column">
                  <span className=" text-xxl font-semibold">John Wick</span>
                  <span className="text-base">Barcode:45677654</span>
                  <span className=" text-base font-semibold">
                    Acces Code:2703
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex ">
        <div className="col mt-3">
          <CardWithTitle title="Security Details ">
            <div className="card-fixed-height flex justify-content-between p-3">
              <div className="font-semibold text-sm flex flex-column ">
                <span>Time Zone</span>
                <span>Date of Birth</span>
                <span>Social Security#</span>
                <span>Email</span>
                <span>Multi-Club Clock In/Out</span>
                <span>Available</span>
                <span>Selected</span>
              </div>
              <div className="flex flex-column justify-content-between"></div>
            </div>
          </CardWithTitle>
        </div>
        <div className="col mt-3">
          <CardWithTitle title="General Details">
            <div className="card-fixed-height flex justify-content-between p-3">
              <div className="font-semibold text-sm flex flex-column justify-content-between">
                <span>Hire Date</span>
                <span>ADP ID</span>
                <span>Primary Phone</span>
                <span>Work Phone</span>
                <span>Mobile Phone</span>
                <span>Fax Phone</span>
                <span>Emergency Phone</span>
                <span>Street Address</span>
                <span>City</span>
                <span>State</span>
                <span>Zip Code</span>
                <span>Email Updates</span>
                <span>User Name</span>
                <span>Notes</span>
                <span>Departments</span>
              </div>
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className="flex ">
        <div className="col mt-3">
          <CardWithTitle title="Clubs Details">
            <div className="card-fixed-height flex justify-content-between p-3">
              <div className="font-semibold text-sm flex flex-column  ">
                <span>Available</span>
                <span>Selected</span>
              </div>
              <div className="flex flex-column justify-content-between"></div>
            </div>
          </CardWithTitle>
        </div>
        <div className="col mt-3">
          <CardWithTitle title="Time Sheet Details">
            <div className="card-fixed-height flex justify-content-between p-3">
              <div className="font-semibold text-sm flex flex-column justify-content-between">
                <span>Club</span>
                <span>Department</span>
                <span>Clock In</span>
                <span>Clock Out</span>
                <span>Duration</span>
                <span>Modified On</span>
              </div>
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className="flex ">
        <div className="col mt-3">
          <CardWithTitle title="Notes Details">
            <div className="card-fixed-height flex justify-content-between p-3">
              <div className="font-semibold text-sm flex flex-column">
                <span>Taken By</span>
                <span>Date/ Time</span>
                <span>Note</span>
              </div>
              <div className="flex flex-column justify-content-between"></div>
            </div>
          </CardWithTitle>
        </div>
        <div className="col mt-3">
          <CardWithTitle title="Certification Details">
            <div className="card-fixed-height flex justify-content-between p-3">
              <div className="font-semibold text-sm flex flex-column ">
                <span>Name</span>
                <span>Certificate Number</span>
                <span>Description</span>
                <span>Issuer</span>
                <span>Acquired Date</span>
                <span>Expiration Date</span>
              </div>
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className="mt-3 flex justify-content-center align-items-center cursor-pointer">
        <i className="pi pi-chevron-circle-left"></i>
        <div
          className="bg-blue-300 border-round-md p-2 mx-2 align-content-center justify-content-center"
          style={{
            width: "36px",
            height: "36px",
          }}
        >
          <span className="ml-1"> 1</span>
        </div>
        <span>of</span>
        <div
          className="border-round-md p-2 mx-2 align-content-center justify-content-center"
          style={{
            background: "#EEF2F5",
            width: "36px",
            height: "36px",
          }}
        >
          <span className="ml-1"> 2</span>
        </div>
        <div className="">
          <i className="pi pi-chevron-circle-right"></i>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
