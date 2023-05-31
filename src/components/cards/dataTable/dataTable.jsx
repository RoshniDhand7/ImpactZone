import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TableData = ({ data, columns }) => {
  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body ? col.body : null}
      />
    );
  });

  return (
    <div>
      <div className="card ">
        <DataTable value={data} responsiveLayout="scroll">
          {dynamicColumns}
        </DataTable>
      </div>
    </div>
  );
};
export default TableData;
