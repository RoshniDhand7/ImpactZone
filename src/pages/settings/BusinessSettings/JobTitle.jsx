import React, { useEffect } from "react";
import Buttons from "../../../components/buttons/button";
import DropDown from "../../../components/dropdown/dropdown";
import TableData from "../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import api from "../../../services/api";
import constants from "../../../utils/constants";
import {
  hideLoaderAction,
  showLoaderAction,
} from "../../../redux/actions/loaderAction";
import { useDispatch } from "react-redux";
import { showToast } from "../../../redux/actions/toastAction";
import Checkbox from "../../../components/checkbox/checkbox";

const JobTitle = () => {
  const [isError, setIsError] = useState("");
  //use for changing pages
  const [showAddJobTitle, setAddJobTitle] = useState("");
  const JobTitleData = [
    {
      name: "Amenities",
      discription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      name: "Classes",
      discription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      name: "Gym Floor",
      discription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      name: "Sports",
      discription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ];
  //Api data store
  const [jobTitle, setJobTitle] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  // check for edit title //
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const ActionEditDelete = (col) => {
    return (
      <>
        <div className="border-none bg-lightest-blue flex justify-content-end ">
          <span onClick={() => onClickEdit(col)}>
            <i className="pi pi-pencil mx-3" style={{ color: "#708090" }}></i>
          </span>
          <span onClick={() => deleteTitle(col._id)}>
            <i className="pi pi-trash" style={{ color: "#708090" }}></i>
          </span>
        </div>
      </>
    );
  };

  const onClickEdit = (row) => {
    setIsEdit(true);
    setData({ ...row });
    setAddJobTitle(true);
  };

  const updateTitle = async (id) => {
    const res = await api("put", constants.endPoints.TitleUpdate + id, {
      title: data.title,
      description: data.description,
    });
    if (res.success) {
      dispatch(showToast({ severity: "success", summary: res.message }));
      setIsEdit(false);
      setData({
        title: "",
        description: "",
      });
      setAddJobTitle(false);
      fetchJobTitle();
    } else {
      dispatch(showToast({ severity: "error", summary: res.message }));
    }
  };

  const JobTitleColumns = [
    {
      field: "title",
      header: "Name",
    },
    {
      field: "description",
      header: "Description",
    },
    {
      field: "",
      header: "",
      body: ActionEditDelete,
    },
  ];

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value || e.value });
  };
  console.log(data);

  const fetchJobTitle = async () => {
    dispatch(showLoaderAction());
    const res = await api("get", constants.endPoints.JobTitle);
    if (res.success) {
      setJobTitle(res.data);
      dispatch(hideLoaderAction());
    } else {
      console.log(res);
    }
  };
  useEffect(() => {
    fetchJobTitle();
  }, []);

  const CreateJobTitle = async () => {
    if (data.title === "") {
      setIsError({ title: "Title is Required" });
    } else {
      const res = await api("post", constants.endPoints.CreateJobTitle, data);

      if (res.success) {
        setData(res.data);
        setIsError(true);
        dispatch(showToast({ severity: "success", summary: res.message }));
        setAddJobTitle(false);
      } else {
        dispatch(showToast({ severity: "error", summary: res.message }));
        console.log(res);
      }
    }
  };

  const hitApiButton = () => {
    if (isEdit) {
      updateTitle(data._id);
    } else {
      CreateJobTitle();
    }
    fetchJobTitle();
  };

  const deleteTitle = async (id) => {
    const res = await api("put", constants.endPoints.DeleteTitle + id);
    console.log(res, "delete");
    if (res.success) {
      dispatch(showToast({ severity: "success", summary: res.message }));
      fetchJobTitle();
    } else {
      dispatch(showToast({ severity: "error", summary: res.message }));
    }
  };

  const AddJobTitle = () => {
    return (
      <>
        <div>
          <div className="my-3">
            <Checkbox
              value={data.isActive}
              onclick={() => {
                setData({ ...data, isActive: !data.isActive });
              }}
              title="Active "
              className="text-xs font-semibold text-900"
            >
              Active
            </Checkbox>
          </div>
          <CardWithTitle title="Job Title">
            <div className="p-3">
              <div>
                <Input
                  title="Job Title"
                  placeholder="Gym Floor"
                  value={data.title}
                  onChange={handleChange("title")}
                ></Input>
                {isError.title && (
                  <p className="text-red-600 text-xs mt-1">{isError.title}</p>
                )}
              </div>
              <div className="mt-4" style={{ Width: "100%" }}>
                <div className="flex flex-column gap-2">
                  <label
                    htmlFor=""
                    className="text-xs text-dark-gray font-semibold"
                  >
                    Description ({data?.description?.length || 0}/500)
                  </label>
                  <InputTextarea
                    value={data.description}
                    onChange={handleChange("description")}
                    style={{ height: "150px" }}
                  />
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="flex justify-content-end mt-3 p-2">
          <div className="mx-3">
            <Buttons
              onClick={hitApiButton}
              label="Save"
              className="btn-dark border-none"
              style={{ height: "40px" }}
            ></Buttons>
          </div>
          <div className="">
            <Buttons
              onClick={() => {
                setAddJobTitle(false);
                setData({
                  title: "",
                  description: "",
                });
                setIsEdit(false);
              }}
              label="Cancel "
              className="btn-grey border-none"
              style={{ height: "40px" }}
            ></Buttons>
          </div>
        </div>
        <div className="mt-5">
          <RecentCheckIn data={checkInData}></RecentCheckIn>
        </div>
      </>
    );
  };

  return (
    <>
      {showAddJobTitle ? (
        AddJobTitle()
      ) : (
        <>
          <div>
            <div className="bg-lightest-blue border-round-lg p-2 ">
              <div className="flex justify-content-between align-items-center ">
                <div className="col-4">
                  <DropDown title="Status" placeholder="Active"></DropDown>
                </div>
                <div className="mr-3">
                  <Buttons
                    onClick={() => setAddJobTitle(true)}
                    className="btn-dark border-none mt-3"
                    icon="pi pi-plus-circle"
                    label="Add Job Title"
                    style={{ height: "38px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                value={jobTitle}
                data={jobTitle}
                columns={JobTitleColumns}
              ></TableData>
            </div>
          </div>
          <div className="mt-5">
            <RecentCheckIn data={checkInData}></RecentCheckIn>
          </div>
        </>
      )}
    </>
  );
};

export default JobTitle;
