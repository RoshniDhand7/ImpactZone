import Input from "../../components/input/input";
import DropDown from "../../components/dropdown/dropdown";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import dummyData from "../../utils/dummyData";

const QuickEnroll = () => {
  const { TimeSheetsData } = dummyData();

  return (
    <>
      <div>
        <div className=" flex">
          <div className="col">
            <Input
              title="Member"
              placeholder="Joshua Lim"
              type="search"
            ></Input>
          </div>
          <div className="col">
            <Input title="Member" placeholder="Joshua Lim" type="date"></Input>
          </div>
          <div className="col">
            <DropDown
              title="Member"
              placeholder="Classes Only"
              type="search"
            ></DropDown>
          </div>
        </div>
        <div className="mt-3 ">
          <DataTable
            // value={TimeSheetsData}
            // selection={selectedPos}
            // onSelectionChange={(e) => setSelectedPos(e.value)}
            dataKey="id"
            tableStyle={{ minWidth: "50rem" }}
          >
            {/* <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column> */}
            <Column field="Event" header="Event"></Column>
            <Column field="Level" header="Level"></Column>
            <Column field="Time" header="Time"></Column>
            <Column field="Location" header="Location"></Column>
            <Column field="Employee" header="Employee"></Column>
            <Column field="Enrollment" header="Enrollment"></Column>
            <Column field="Available" header="Available"></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default QuickEnroll;
