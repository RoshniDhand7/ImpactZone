import { TabPanel, TabView } from "primereact/tabview";
import React from "react";
import { useState } from "react";
import ManageAssessedFees from "./ManageAssessed/manageassessedFees";
import ManageAgreementTemplate from "./AgreementTemplate/manageAgreementTemplate";
import ManagePaymentPlans from "./MembershipPlans/managePaymentPlans";
import AgreementCategories from "./AgreementCategoriesScreens/agreementCategories";
import AgreementPromotions from "./AgreementPromotions/agreementPromotions";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";

const AgreementSetup = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="">
        <div className="agreement-tabview-margin">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="Assessed Fees">
              <ManageAssessedFees />
            </TabPanel>
            <TabPanel header="Agreement Template">
              <ManageAgreementTemplate></ManageAgreementTemplate>
            </TabPanel>
            <TabPanel header="Membership Plan">
              <ManagePaymentPlans />
            </TabPanel>
            <TabPanel header="Agreement Categories">
              <AgreementCategories />
            </TabPanel>
            <TabPanel header="Agreement Promotions">
              <AgreementPromotions />
            </TabPanel>
          </TabView>
        </div>
        <div className="mt-8 px-4">
          <RecentCheckIn data={checkInData} />
        </div>
      </div>
    </>
  );
};

export default AgreementSetup;
