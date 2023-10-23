import React from 'react'
import { useState } from 'react';

const AgreementPromotionContainer = () => {
    const [addAgreementPromotions, setAgreementPromotions] = useState(false);

    const agreementPromotionsColumn = [
        {
          field: "code",
          header: "Code",
          id: "",
          index: "",
        },
        {
          field: "name",
          header: "Name",
          id: "",
          index: "",
        },
    
        {
          field: "startdate",
          header: "Start Date",
          id: "",
        },
        {
          field: "enddate",
          header: "End Date",
          id: "",
        },
      ];

      const [agreementPromotionsData, setAgreementPromotionsData] = useState([
        {
          code: "1Bf03",
          name: "Bf03",
          startdate: "March-14-2023",
          enddate: "March-14-2023",
        },
        {
          code: "1Bf03",
          name: "1Bf03",
          startdate: "March-14-2023",
          enddate: "March-14-2023",
        },
        {
          code: "1Bf03",
          name: "Bf03",
          startdate: "March-14-2023",
          enddate: "March-14-2023",
        },
        {
          code: "1Bf03",
          name: "Bf03",
          startdate: "March-14-2023",
          enddate: "March-14-2023",
        },
        {
          code: "1Bf03",
          name: "Bf03",
          startdate: "March-14-2023",
          enddate: "March-14-2023",
        },
      ]);

    const onClickChangePage = () => {
        setAgreementPromotions((prev) => !prev);
      };
  return {
    addAgreementPromotions,
    onClickChangePage,
    agreementPromotionsColumn,
    agreementPromotionsData
  }
}

export default AgreementPromotionContainer