import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TableData = ({ data, columns, selectionMode, delRow }) => {
  const dynamicColumns = columns.map((col, i) => {
    console.log(col.sorting, "SORTING");
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
        body={col.body ? col.body : null}
        style={{ paddingLeft: " 50px", paddingRight: "50px" }}
      />
    );
  });
  return (
    <div>
      <div className="card">
        <DataTable value={data} responsiveLayout="scroll" delRow={delRow}>
          {dynamicColumns}
        </DataTable>
      </div>
    </div>
  );
};
export default TableData;
