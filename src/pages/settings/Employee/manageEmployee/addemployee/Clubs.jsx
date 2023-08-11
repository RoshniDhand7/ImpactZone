import React, { useEffect, useState } from "react";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import { PickList } from "primereact/picklist";
import Buttons from "../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../utils/checkInData";
import constants from "../../../../../utils/constants";
import api from "../../../../../services/api";
import { Navigate, useNavigate } from "react-router-dom";

const Clubs = ({ setData, data, createEmployee }) => {
  const [reportDataSource, setReportDataSource] = useState([]);
  const [clubSource, setClubSource] = useState([]);
  const [reportDatatarget, setreportDataTarget] = useState([]);
  const [clubTarget, setClubTarget] = useState([]);
  const navigate = useNavigate();

  const getClubs = async () => {
    const res = await api("get", constants.endPoints.GetClubs);
    if (res.success) {
      setreportDataTarget(res.data.filter(item => data.reportDataAccess.includes(item._id)));
      setReportDataSource(res.data.filter(item => !data.reportDataAccess.includes(item._id)));
      setClubSource(res.data);
      setClubSource(res.data.filter(item => !data.clubs.includes(item._id)));
      setClubTarget(res.data.filter(item => data.clubs.includes(item._id)));

    } else {
      console.log(res);
    }
  };

  const onReportChange = (event) => {
    setReportDataSource(event.source);
    setreportDataTarget(event.target);
    setData(() => {
      return {
        ...data,
        reportDataAccess: event.target.map(item => item._id)
      }
    })
  };

  const onClubChange = (event) => {
    setClubSource(event.source);
    setClubTarget(event.target);
    setData(() => {
      return {
        ...data,
        clubs: event.target.map(item => item._id)
      }
    })
  };

  useEffect(() => {
    getClubs();
  }, []);
  const showEmployee = () => {
    navigate("/employee");
  };

  // const createDeparment = async () => {
  //   setData(() => {
  //     return {
  //       ...data,
  //       departments: departments.map((dept) => dept._id),
  //     };
  //   });
  //   const res = await api("post", constants.endPoints.CreateEmployee, data);
  //   console.log(res, "club");
  //   if (res.success) {
  //   } else {
  //     console.log(res);
  //   }
  // };

  const itemTemplate = (data) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{data.name}</span>
          <div className="flex align-items-center gap-2"></div>
        </div>
      </div>
    );
  };
  const itemTemplates = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name}</span>
          <div className="flex align-items-center gap-2"></div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div>
        <div className="">
          <CardWithTitle title="Report Data Access">
            <div className="card p-3 ">
              <PickList
                source={reportDataSource}
                target={reportDatatarget}
                onChange={onReportChange}
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
        <div className="mt-3">
          <CardWithTitle title="Clubs">
            <div className="card p-3 ">
              <PickList
                source={clubSource}
                target={clubTarget}
                onChange={onClubChange}
                itemTemplate={itemTemplates}
                breakpoint=""
                sourceHeader="Available"
                targetHeader="Selected"
                sourceStyle={{ height: "20rem" }}
                targetStyle={{ height: "20rem" }}
              />
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className="flex justify-content-end p-2 ">
        <div className=" mt-3 flex  ">
          <div className="mx-4">
            <Buttons
              onClick={createEmployee}
              label="Save"
              className="btn-dark  mx-3 border-none"
            ></Buttons>
          </div>
          <div className=" ">
            <Buttons label="Cancel" className="btn-grey  border-none"></Buttons>
          </div>
        </div>
      </div>
      <div>
        <div>
          <RecentCheckIn data={checkInData}></RecentCheckIn>
        </div>
      </div>
    </>
  );
};

export default Clubs;
