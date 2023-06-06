import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import itemsbackword from "../../../../assets/icons/itemsbackward.png";
import checkInData from "../../../../utils/checkInData";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import Buttons from "../../../../components/buttons/button";
import { PickList } from "primereact/picklist";

const CancelCode = () => {
  // const [source, setSource] = useState([]);
  // const [target, setTarget] = useState([]);
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
        <div className="my-3">
          <span className="font-bold text-900 text-xl">
            IN-Club Cancel Codes
          </span>
        </div>
        <div className="">
          <CardWithTitle title="Select Cancel Codes">
            <div className="p-3">
              {/* <span className="my-4 text-xs">Available</span> */}
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
      <div className="flex justify-content-end mt-3 p-2">
        <div className="mx-5">
          <Buttons label="Save" className="mx-3 btn-dark border-none"></Buttons>
        </div>
        <div className="">
          <Buttons label="Cancel" className="  btn-grey border-none"></Buttons>
        </div>
      </div>
      <div>
        <div className="bottom-0  mt-5">
          <RecentCheckIn data={checkInData}></RecentCheckIn>
        </div>
      </div>
    </>
  );
};

export default CancelCode;
