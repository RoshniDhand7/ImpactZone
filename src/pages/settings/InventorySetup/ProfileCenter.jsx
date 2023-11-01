// import React, { useState } from "react";
// import DropDown from "../../../components/dropdown/dropdown";
// import Buttons from "../../../components/buttons/button";
// import TableData from "../../../components/cards/dataTable/dataTable";
// import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
// import checkInData from "../../../utils/checkInData";
// import Checkbox from "../../../components/checkbox/checkbox";
// import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
// import Input from "../../../components/input/input";
// import Index from ".";
// import { booleanToString } from "../../../utils/javascript";
// import DeleteDailog from "../../../components/popup/deleteDailog";
// import { deleteLocationType } from "../../../redux/actions/locationsActions";

// const ProfileTypes = () => {
//     // const[showLocationType,setShowLocationType]=useState
//   const actionTemplate = (col) => {
//     // console.log(col._id, "collllll");
//     return (
//       <>
//         <div className="flex justify-content-end">
//           <span>
//             <i className="pi pi-pencil mr-3 cursor-pointer"></i>
//           </span>
//           <span>
//             <i className="pi pi-trash cursor-pointer"></i>
//           </span>
//         </div>
//       </>
//     );
//   };

//   const ProfileTypesColumn = [
//     {
//       field: "ProfitCenterName",
//       header: "Profit Center Name",
//       id: "",
//       index: "",
//     },
//     {
//       field: "Description",
//       header: "Description",
//       id: "",
//       index: "",
//     },
//     {
//       field: "CatalogItemsAssigned",
//       header: "Catalog Items Assigned",
//       id: "",
//       index: "",
//     },
//     {
//       field: "GLCode",
//       header: "GL Code",
//       id: "",
//       index: "",
//     },
//     {
//       field: "",
//       header: "",
//       id: "",
//       body: actionTemplate,
//     },
//   ];
//   const [ProfileTypesData, setProfileTypesData] = useState([
//     {
//       ItemName: "Annual Fee",
//       ItemUPC: "Annual Fee",
//       Price: "$49.99",
//       Plans: "Premium",
//     },
//     {
//       ItemName: "Late Fee",
//       ItemUPC: "-",
//       Price: "$49.99",
//       Plans: "Premium",
//     },
//     {
//       ItemName: "Decline Fee",
//       ItemUPC: "-",
//       Price: "$49.99",
//       Plans: "Premium",
//     },
//     {
//       ItemName: "No Show Fee",
//       ItemUPC: "GymAccess",
//       Price: "$49.99",
//       Plans: "Premium",
//     },
//     {
//       ItemName: "Freeze Fee",
//       ItemUPC: "Unassigned",
//       Price: "$49.99",
//       Plans: "Premium",
//     },
//   ]);

//   const AddLocationType = () => {
//     return (
//       <>
//         <div>
//           <div className="my-3">
//             <Checkbox
//               title="Active"
//               className="text-900 text-sm font-semibold"
//               name="isActive"
//               value={locationType.isActive}
//               onChange={handleLocationTypeChange}
//             ></Checkbox>
//           </div>
//           <div>
//             <CardWithTitle title="Add Location Type">
//               <div className="flex p-2">
//                 <div className="col-4 mx-3">
//                   <Input
//                     value={locationType.name}
//                     title="Name"
//                     name="name"
//                     onChange={handleLocationTypeChange}
//                     state={locationType}
//                   ></Input>
//                 </div>
//                 <div className="col-4">
//                   <DropDown
//                     title="Allow OverBooking"
//                     value={booleanToString(locationType.allowOverBooking)}
//                     name="allowOverBooking"
//                     placeholder="Select Over Booking"
//                     options={["Yes", "No"]}
//                     onChange={handleLocationTypeChange}
//                     state={locationType}
//                   ></DropDown>
//                 </div>
//               </div>
//             </CardWithTitle>
//           </div>
//           <div className=" m-2 mt-3 flex justify-content-end">
//             <div className="mx-4">
//               <Buttons
//                 label="Save"
//                 className="btn-dark  mx-3  border-none"
//                 onClick={onAddLocationType}
//               ></Buttons>
//             </div>
//             <div className="">
//               <Buttons
//                 onClick={() => {
//                   setshowLocationType(false);
//                   setLocationType({
//                     isActive: null,
//                     name: "",
//                     allowOverBooking: "",
//                   });
//                 }}
//                 label="Cancel"
//                 className="btn-grey   border-none"
//               ></Buttons>
//             </div>
//           </div>
//         </div>
//         <div className="mt-5">
//           <RecentCheckIn data={checkInData}></RecentCheckIn>
//         </div>
//       </>
//     );
//   };

//   return (
//     <>
//       {showLocationType ? (
//         AddLocationType()
//       ) : (
//         <>
//           <div>
//             <div className="bg-lightest-blue border-round-lg py-2 px-3 flex justify-content-between align-items-center ">
//               <div className="col-3 ">
//                 <DropDown title="Status" placeholder={"Active"}></DropDown>
//               </div>

//               <div className="mr-5">
//                 <div className="">
//                   <Buttons
//                     onClick={() => {
//                       setshowLocationType(true);
//                     }}
//                     label="Add Profit Center"
//                     className="btn-dark mx-4 border-none  "
//                     style={{ height: "36px", top: "10px" }}
//                   ></Buttons>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-2">
//               <TableData
//                 data={locationTypes}
//                 columns={locationTypesTable}
//               ></TableData>
//             </div>
//             <div className=" m-2 mt-3 flex justify-content-end">
//               <div className="">
//                 <Buttons
//                   label="Scheduling Options"
//                   className="btn-dark   border-none"
//                 ></Buttons>
//               </div>
//             </div>
//           </div>
//           <div className="mt-5">
//             <RecentCheckIn data={checkInData} />
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default ProfileTypes;
