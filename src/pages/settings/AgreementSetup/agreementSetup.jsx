import { TabPanel, TabView } from "primereact/tabview";
import React from "react";
import { useState } from "react";
import ManageAssessedFees from "./ManageAssessed/manageassessedFees";
import ManageAgreementTemplate from "./AgreementTemplate/manageAgreementTemplate";
import ManagePaymentPlans from "./MembershipPlans/managePaymentPlans";
import AgreementCategories from "./AgreementCategoriesScreens/agreementCategories";
import AgreementPromotions from "./AgreementPromotions/agreementPromotions";

const AgreementSetup = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="my-2 mx-3">
        <div className="p-3">
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
      </div>
    </>
  );
};

export default AgreementSetup;
