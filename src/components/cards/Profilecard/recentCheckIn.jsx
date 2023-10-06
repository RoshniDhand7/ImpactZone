import Search from "../../search/search";
import Filter from "../../../assets/icons/filter.png";
import threedots from "../../../assets/icons/threedots.png";
import Input from "../../input/input";

const RecentCheckIn = ({ data }) => {
  // dragElement(document.getElementById("mydiv"));

  // function dragElement(elmnt) {
  //   var pos1 = 0,
  //     pos2 = 0,
  //     pos3 = 0,
  //     pos4 = 0;
  //   if (document.getElementById(elmnt.id + "header")) {
  //     /* if present, the header is where you move the DIV from:*/
  //     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  //   } else {
  //     /* otherwise, move the DIV from anywhere inside the DIV:*/
  //     elmnt.onmousedown = dragMouseDown;
  //   }

  //   function dragMouseDown(e) {
  //     e = e || window.event;
  //     e.preventDefault();
  //     // get the mouse cursor position at startup:
  //     pos3 = e.clientX;
  //     pos4 = e.clientY;
  //     document.onmouseup = closeDragElement;
  //     // call a function whenever the cursor moves:
  //     document.onmousemove = elementDrag;
  //   }

  //   function elementDrag(e) {
  //     e = e || window.event;
  //     e.preventDefault();
  //     // calculate the new cursor position:
  //     pos1 = pos3 - e.clientX;
  //     pos2 = pos4 - e.clientY;
  //     pos3 = e.clientX;
  //     pos4 = e.clientY;
  //     // set the element's new position:
  //     elmnt.style.top = elmnt.offsetTop - pos2 + "px";
  //     elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  //   }

  //   function closeDragElement() {
  //     /* stop moving when mouse button is released:*/
  //     document.onmouseup = null;
  //     document.onmousemove = null;
  //   }
  // }

  return (
    <>
      <div className="w-100">
        <div className="">
          <div>
            <h3 className="text-900">Recent Check-Ins</h3>
          </div>
          <div className="flex mt-3 justify-content-between align-items-center">
            <div className="flex mb-3">
              <span className="text-sm text-900 font-bold text-center mt-3 mx-2">
                Check-In
              </span>
              <Input
                icon="pi pi-search"
                type="search"
                placeholder="Search by barcode/member"
              ></Input>
              <div className="flex  ">
                <div className="flex">
                  <div
                    className="opacity-50 mt-3 mx-4"
                    style={{ width: "3px", height: "10px" }}
                  >
                    <img src={threedots} alt="" />
                  </div>

                  {/* <span className="mx-3 text-900 mt-3 opacity-50 font-bold">
                    : <span>.</span>
                  </span> */}
                </div>

                <div
                  className="flex text-center mt-3  "
                  style={{ width: "19px", height: "19px" }}
                >
                  <img className="" src={Filter} alt="" />
                  <span className="text-sm text-900 font-bold text-center mx-2">
                    Filter
                  </span>
                </div>
              </div>
              <div className="mx-6">
                <Search placeholder="Search by filter"></Search>
              </div>
            </div>
            <div className="">
              <button className=" btn-more text-black bg-white border-1 border-round cursor-pointer">
                More
              </button>
            </div>
          </div>
        </div>

        <div className="flex overflow-auto">
          {data?.map((card, index) => {
            return (
              <div
                className={
                  "m-2 mt-3 p-2  flex flex-column align-items-center  " +
                  (card.isActive && !card.paymentDue
                    ? "profileactive"
                    : card.isActive && card.paymentDue
                    ? "profilepending"
                    : "profileexpire")
                }
              >
                <div
                  className="border-circle   "
                  style={{ width: "79px", height: "73px" }}
                >
                  <img className="border-circle" src={card.image} alt="" />
                </div>
                <div className="flex flex-column align-items-center justify-content-between">
                  <span className="text-small font-semibold mt-2 ">
                    {card.title}
                  </span>
                  <span className="text-small font-medium mt-2 ">
                    {card.isActive ? (
                      card.membershipType
                    ) : (
                      <span className="text-small font-medium  font-red  ">
                        Membership <br />
                        &nbsp; &nbsp; cancelled
                      </span>
                    )}
                  </span>
                  <span className="text-xsmall font-semibold text-blue-500">
                    {card.isActive ? (
                      card.time
                    ) : (
                      <span className="text-small font-medium  font-red  ">
                        {card.date}
                      </span>
                    )}
                  </span>
                  <span className="text-xsmall ">
                    {card.isActive ? (
                      card.checkInBefore + "m from Now"
                    ) : (
                      <span className="text-xsmall font-red">Cancel</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default RecentCheckIn;
