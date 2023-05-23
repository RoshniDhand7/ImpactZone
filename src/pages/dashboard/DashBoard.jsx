import React from "react";
import HightLightCard from "../../components/cards/hightlightcard";
import Graphcard from "../../components/cards/graphcards/graphcard";

import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../components/cards/graphcards/activemember";
import MemberStatus from "../../components/cards/graphcards/memberstatusbymonth";
import NewRegistration from "../../components/cards/graphcards/newregistrationbymonth";
import RevenueActiveMembers from "../../components/cards/graphcards/Revenue&ActiveMember";

const DashBoard = () => {
  return (
    <>
      <div className=" mt-3 p-3">
        <div className=" flex justify-content-between ">
          <HightLightCard
            className=""
            title="hello"
            icon="hello"
            number="231"
          />
        </div>
        <div className=" m-0  ">
          <div className="grid m-0 justify-content-evenly ">
            <div className=" col-6 ">
              <Graphcard>
                <div className="mx-5 font-bold text-lg mt-3">
                  {" "}
                  % Active Members Checked-In
                </div>
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="pie"
                  height={350}
                />
              </Graphcard>
            </div>
            <div className=" col-6 ">
              <Graphcard>
                <div className="mx-5 font-bold text-lg mt-3">
                  Members Status by Month
                </div>
                <ReactApexChart
                  options={MemberStatus.options}
                  series={MemberStatus.series}
                  type="donut"
                  height={350}
                />
              </Graphcard>
            </div>
          </div>
          <div className="grid justify-content-between m-auto ">
            <div className="col-6 ">
              <Graphcard>
                <div className="mx-5 font-bold text-lg mt-3">
                  Revenue & Active Members Trend
                </div>
                <ReactApexChart
                  options={RevenueActiveMembers.options}
                  series={RevenueActiveMembers.series}
                  type="line"
                  height={350}
                />
              </Graphcard>
            </div>
            <div className=" col-6">
              <Graphcard>
                <div className="mx-5 font-bold text-lg mt-3">
                  New Registration by Month
                </div>
                <ReactApexChart
                  options={NewRegistration.options}
                  series={NewRegistration.series}
                  type="bar"
                  height={350}
                />
              </Graphcard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
