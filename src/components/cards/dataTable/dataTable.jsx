import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TableData = ({ data, columns, selectionMode, delRow }) => {
  const dynamicColumns = columns.map((col, i) => {
    return selectionMode && i === 0 ? (
      <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}></Column>
    ) : (
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
        <DataTable value={data} responsiveLayout="scroll" delRow={delRow}>
          {dynamicColumns}
        </DataTable>
      </div>
    </div>
  );
};
export default TableData;
