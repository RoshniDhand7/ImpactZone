import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import DeleteDailog from "../../popup/deleteDailog";

const TableData = ({
  data,
  columns,
  selectionMode,
  delRow,
  selected,
  changeSelection,
  key,
  checked,
  rows,
  setRows,
  first,
  setFirst,
  count,
  paginator,
  filters,

  setCurrentPage,
}) => {
  const ActionEditDelete = () => {
    return (
      <>
        <div className="flex justify-content-end">
          <span className="mx-2">
            <i className="pi pi-pencil"></i>
          </span>

          <span>
            <i className="pi pi-trash"></i>
          </span>
        </div>
      </>
    );
  };
  const SampleText = (rowData) => {
    return (
      <>
        <div className="flex ">
          <div
            className="border-1 border-300 font-grey-200 text-xs p-2 border-round "
            style={{
              backgroundColor: `${rowData?.pendingColor?.boxColor}`,
              color: `${rowData?.pendingColor?.textColor}`,
            }}
          >
            Sample Text
          </div>
        </div>
      </>
    );
  };

  const onPageChangeEvent = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(event.page + 1);
  };

  const dynamicColumns = columns.map((col, i) => {
    return selectionMode && i === 0 ? (
      <Column
        selectionMode="multiple"
        headerStyle={{ width: "3rem" }}
        style={{ textAlign: "center" }}
      ></Column>
    ) : (
      <Column
        key={col.field}
        field={col.field}
        sortable={col.sorting ? true : false}
        header={col.header}
        hidden={col.hidden ? col.hidden : false}
        body={col.body ? eval(col.body) : null}
        style={{ paddingLeft: " 50px", paddingRight: "50px" }}
      />
    );
  });
  return (
    <div>
      <div className="card shadow-4">
        <DataTable
          value={data}
          paginator={paginator ? true : false}
          filters={filters ? filters : null}
          rows={rows ? rows : null}
          responsiveLayout="scroll"
          selectionMode={!selectionMode ? false : "checkbox"}
          delRow={delRow}
          selection={selected ? selected : null}
          onSelectionChange={changeSelection ? changeSelection : null}
          dataKey={key}
          checked={checked}
        >
          {dynamicColumns}
        </DataTable>
      </div>
      {count > rows && (
        <div className="card mt-2">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={count}
            rowsPerPageOptions={[5, 10, 20, 30]}
            onPageChange={(e) => onPageChangeEvent(e)}
          />
        </div>
      )}
    </div>
  );
};
export default TableData;
