import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/icons/Navlogo.png";
import Profile from "../assets/icons/profilepic.png";
import addtask from "../assets/icons/addtask.png";
import PopUp from "../components/popup/popup";
import mytask from "../pages/popups/mytask";
import { useState } from "react";
import searchBar from "../pages/popups/searchBar";
import EmployeeClockIn from "../pages/popups/EmployeeClockIn";
import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

export default function TopBar({
  setIsActive,
  isActive,
  isLogged,
  setIsLogged,
}) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    setIsLogged(false);
    navigate("/login");
  };

  const [popUp, setPopUp] = useState({
    title: "",
    show: null,
  });

  // const popup = useSelector((state) => state.popup);
  // const dispatch = useDispatch();
  // console.log(popup);

  const showPopUp = async (title, data) => {
    // dispatch({ type: "SHOW_POPUP", payload: "my payload" });
    // useDispatch("SHOW_POPUP", {
    //   isVisible: true,
    //   title: title,
    //   show: data,
    // });
    setPopUp({
      title: title,
      show: data,
    });
    setIsActive(true);
  };
  useEffect(() => {}, []);

  return (
    <>
      <div className="topposition ">
        <div className="bgcolor  grid m-0 px-3 justify-content-between  ">
          <div className=" col-5 cursor-pointer md:col-7 flex align-items-center justify-content-between">
            <div style={{ width: "74px", height: "69px" }} className=" col-4">
              <img src={logo} alt="" />
            </div>
            <NavLink to={"/"}>
              <div className="textcolor ">Dashboard</div>
            </NavLink>
            <NavLink to={"/user-member"}>
              <div className="textcolor">Check-In</div>
            </NavLink>
            <NavLink to={"/members"}>
              <div className="textcolor">Members</div>
            </NavLink>
            <NavLink to={"/calendar"}>
              <div className="textcolor">Calendar</div>
            </NavLink>
            <NavLink to={"/pointofsale"}>
              <div className="textcolor">Point of Sale</div>
            </NavLink>
            <NavLink to={"/plan"}>
              <div className="textcolor">Plans</div>
            </NavLink>
            <div>
              <div className="dropdown textcolor">
                <button className="dropbtn ">
                  Report
                  <i className="pi pi-chevron-down mx-2"></i>
                </button>
                <div className="dropdown-content">
                  <div className="p-3">
                    <div className="text-black p-2 cursor-pointer">Link</div>
                    <hr />
                    <div className="text-black p-2 cursor-pointer">Link</div>
                    <hr />
                    <div className="text-black p-2 cursor-pointer">Link</div>
                  </div>
                </div>
              </div>
            </div>

            <NavLink to={"/more"}>
              <div className="textcolor">More</div>
            </NavLink>
          </div>
          <div className="col-4 flex align-items-center justify-content-between ">
            <div onClick={() => showPopUp("", searchBar)}>
              <i
                className="pi pi-search icon-size"
                style={{ color: "black" }}
              ></i>
            </div>
            <NavLink to="/fastadd">
              <div>
                <i
                  className="pi pi-plus-circle icon-size"
                  style={{ color: "black" }}
                ></i>
              </div>
            </NavLink>
            <div onClick={() => showPopUp("My Tasks", mytask)}>
              <img className="icon-size" src={addtask} alt="" />
            </div>
            <div
              onClick={() =>
                showPopUp("Employee Clock In/Out", EmployeeClockIn)
              }
            >
              <i
                className="pi pi-clock icon-size"
                style={{ color: "black" }}
              ></i>
            </div>
            <NavLink to="/settings">
              <div>
                <i
                  className="pi pi-cog icon-size"
                  style={{ color: "black" }}
                ></i>
              </div>
            </NavLink>
            <div>
              <div className="dropdown textcolor">
                <button className="dropbtn ">
                  <i
                    className="pi pi-question-circle"
                    style={{ color: "black" }}
                  ></i>
                  <i className="pi pi-chevron-down mx-2"></i>
                </button>
                <div className="dropdown-content">
                  <div className="p-3">
                    <div className="text-black p-2 cursor-pointer">Link</div>
                    <hr />
                    <div className="text-black p-2 cursor-pointer">Link</div>
                    <hr />
                    <div className="text-black p-2 cursor-pointer">Link</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown textcolor">
              <button className="dropbtn flex text-center ">
                <div style={{ width: "43px", height: "43px" }}>
                  <img src={Profile} alt="" />
                </div>
                <span
                  style={{ width: "100px" }}
                  className="font-semibold flex text-base m-2 "
                >
                  {localStorage.getItem("firstName") || "User"} &nbsp;
                  {localStorage.getItem("lastName") || ""}
                </span>
                <i className="pi pi-chevron-down mt-2"></i>
              </button>
              <div className="dropdown-content border-round">
                <div className="p-3">
                  <Link to={""}>
                    <div className="text-black  cursor-pointer">
                      Switch User
                    </div>
                  </Link>
                  <hr />
                  <Link to="/forgotpassword">
                    <div className="text-black cursor-pointer">
                      Forgot Password
                    </div>
                  </Link>
                  <hr />
                  <Link to={""}>
                    <div
                      onClick={logout}
                      className="text-black  cursor-pointer"
                    >
                      Log Out
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {/* <div style={{ width: "43px", height: "43px" }}>
              <img src={Profile} alt="" />
            </div>
            <span className="font-semibold text-base">Mike Puglisi</span> */}
          </div>
        </div>
      </div>
      <PopUp
        setIsActive={setIsActive}
        title={popUp.title}
        isActive={isActive}
        data={popUp.show ? popUp.show() : null}
      />
    </>
  );
}
