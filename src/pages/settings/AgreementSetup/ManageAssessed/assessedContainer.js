import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAssessed } from '../../../../redux/actions/assessedAction';
import { useEffect } from 'react';

const AssessedContainer = () => {
    const disaptch = useDispatch()
    const [addAssessedFees, setAddAssessedFee] = useState(false);

    const allAssessedData = useSelector((state)=>state.Assessed.AllAssessed)

    const dateBodyTemplate = (rowData) => {
        let start_data = new Date(rowData.createdAt).toLocaleDateString()
return (
    <div>
        {start_data}
    </div>
        
)
    }

    const assessedColumn = [
        {
          field: "name",
          header: "Name",
          id: "",
          index: "",
        },
        {
          field: "profitCenter",
          header: "Profit Center",
          id: "",
          index: "",
        },
        {
          field: "amount",
          header: "Amount",
          id: "",
          index: "",
        },
        {
          field: "startdate",
          header: "Start Date",
          id: "",
          index: "",
          body:dateBodyTemplate
        },
        {
          field: "clubs",
          header: "Clubs",
          id: "",
          index: "",
        },
      ];

      const onClickAddFees = () => {
        setAddAssessedFee((prev) => !prev);
      };


useEffect(() => {
    disaptch(getAssessed())
}, [])


  return {
    assessedColumn,
    allAssessedData,
    onClickAddFees,
    addAssessedFees
  }
}

export default AssessedContainer