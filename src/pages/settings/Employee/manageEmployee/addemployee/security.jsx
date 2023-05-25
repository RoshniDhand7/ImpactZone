import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../components/input/input";
import DropDown from "../../../../../components/dropdown/dropdown";
import { PickList } from "primereact/picklist";
import itemsbackword from "../../../../../assets/icons/itemsbackward.png";
import Buttons from "../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../utils/checkInData";

const Security = () => {
  //   const [source, setSource] = useState([]);
  //   const [target, setTarget] = useState([]);
  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <img
          className="w-4rem shadow-2 flex-shrink-0 border-round"
          src={itemsbackword}
          alt={item.name}
        />
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{item.category}</span>
          </div>
        </div>
        <span className="font-bold text-900">${item.price}</span>
      </div>
    );
  };
  return (
    <>
      <div>
        <div>
          <CardWithTitle title="System">
            <div className="p-3">
              <div className="flex ">
                <div className="col-4">
                  <Input title="Barcode"></Input>
                </div>
                <div className="col-4">
                  <Input title="User Name"></Input>
                </div>
                <div className="col-4">
                  <Input title="Password"></Input>
                </div>
              </div>
              <div className="flex">
                <div className="col-4">
                  <Input title="Re-enter Password"></Input>
                </div>
                <div className="col-4">
                  <Input title="Access Code"></Input>
                </div>
                <div className="col-4">
                  <DropDown title="Multi-Club Clock In/Out"></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div>
          <CardWithTitle title="Select Roles">
            <div className="p-3">
              <div className="card  ">
                <PickList
                  // source={source}
                  // target={target}
                  // onChange={onChange}
                  itemTemplate={itemTemplate}
                  breakpoint=""
                  sourceHeader="Available"
                  targetHeader="Selected"
                  sourceStyle={{ height: "30rem" }}
                  targetStyle={{ height: "30rem" }}
                />
              </div>
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className="flex justify-content-end pt-2 ">
        <div className="col-2 flex  ">
          <Buttons
            label="Save"
            className="btn-dark p-3 mx-2  border-none"
          ></Buttons>
          <Buttons label="Cancel" className="btn-grey border-none"></Buttons>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default Security;
