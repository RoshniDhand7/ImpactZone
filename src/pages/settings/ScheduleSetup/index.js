import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addLocation,
  addLocationType,
  getLocations,
  getLocationTypes,
  updateLocation,
  updateLocationType,
} from "../../../redux/actions/locationsActions";
import {
  showAllFormErrors,
  showFormErrors,
} from "../../../utils/commonFunctions";
import { allValidations } from "../../../utils/formValidations";
import {
  filterOneArrayFromAnother,
  stringToBoolean,
} from "../../../utils/javascript";
import { getClubs } from "../../../redux/actions/clubsActions";
import {
  addEventCategory,
  getEventCategories,
  getEventsByType,
  updateEventCategory,
} from "../../../redux/actions/eventsActions";
import { getEmployees } from "../../../redux/actions/employeesAction";
import {
  addClassSchedule,
  getClassSchedules,
  updateClassSchedule,
} from "../../../redux/actions/classSchedulesAction";
import { getEvents } from "../../../redux/actions/eventActions";
import { showToast } from "../../../redux/actions/toastAction";
import FormValidation from "../../../utils/AllFormValidation";

export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [location, setLocation] = useState({
    isActive: true,
    name: "",
    locationType: "",
    clubs: [],
  });

  const [locationType, setLocationType] = useState({
    isActive: true,
    name: "",
    allowOverBooking: "",
  });

  const [schedules, setSchedules] = useState([
    {
      startTime: null,
      days: [],
    },
  ]);

  const [assistants, setAssistants] = useState([
    {
      assistant: null,
      assistantPay: null,
    },
  ]);

  const [eventCategory, setEventCategory] = useState({
    isActive: true,
    name: "",
    events: [],
  });

  const [classes, setClasses] = useState({
    event: null,
    scheduleType: "",
    classLocation: "",
    startDate: null,
    endDate: null,
    indefinite: false,
    schedule: [],
    staff: "",
    pay: "",
    assistants: {
      assistant: "",
      assistantPay: "",
    },
    totalCapacity: null,
    waitListCapacity: null,
    onLineSignUp: false,
    onLineCapacity: null,
    allowSignUpAndPaylater: false,
    attendForFree: false,
  });

  console.log("classes", classes);

  const [weekDays, setWeekDays] = useState([
    { name: "Sunday", disabled: false },
    { name: "Monday", disabled: false },
    { name: "Tuesday", disabled: false },
    { name: "Wednesday", disabled: false },
    { name: "Thursday", disabled: false },
    { name: "Friday", disabled: false },
    { name: "Saturday", disabled: false },
  ]);

  const [locationFilters, setLocationFilters] = useState({});
  const [required, setRequired] = useState(["name", "allowOverBooking"]);
  const [locationRequired, setLocationRequired] = useState([
    "name",
    "locationType",
    "clubs",
  ]);
  const [categoryRequired, setCategoryRequired] = useState(["name", "events"]);
  const [classRequired, setClassRequired] = useState([
    "event",
    "scheduleType",
    "classLocation",
    "startDate",
    "endDate",
    "schedule",
    "staff",
    "totalCapacity",
    "waitListCapacity",
  ]);
  const [initialData, setInitialData] = useState({});
  const [initialLocationData, setInitialLocationData] = useState({});
  const [initialCategoryData, setInitialCategoryData] = useState({});
  const [initialClassData, setInitialClassData] = useState({});

  let { locations } = useSelector((state) => state?.locations);
  let { locationTypes } = useSelector((state) => state?.locations);
  let { clubs } = useSelector((state) => state?.clubs);
  let { employees } = useSelector((state) => state?.employees);
  let { eventsByType } = useSelector((state) => state?.events);
  let { classSchedules } = useSelector((state) => state?.classSchedules);
  let { events } = useSelector((state) => state?.events);
  let { eventCategories } = useSelector((state) => state?.events);

  let assistantsList = employees;

  const [categoryPicklist, setCategoryPickList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLocationType, setshowLocationType] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState(false);

  const [id, setId] = useState("");
  const [deleteRow, setDeleteRow] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [showAddClasses, setAddClasses] = useState();
  const [showEventCategories, setShowEventCategories] = useState(true);

  useEffect(() => {
    dispatch(getLocationTypes(setLoading));
    dispatch(getLocations(setLoading));
    dispatch(getClubs(setLoading));
    dispatch(getEmployees(setLoading));
    dispatch(getEventsByType(setLoading, "Classes"));
    dispatch(getClassSchedules(setLoading));
    dispatch(getEvents(setLoading));
    dispatch(getEventCategories(setLoading));
  }, [dispatch]);

  useEffect(() => {
    events = events.map((event) => ({ _id: event._id, name: event.name }));
    setCategoryPickList([...events]);
  }, [events]);

  const handleLocationTypeChange = ({ name, value }) => {
    const formErrors = FormValidation(
      name,
      value,
      locationType,
      required,
      initialData
    );
    if (name === "allowOverBooking") value = stringToBoolean(value);
    setLocationType((prev) => ({ ...prev, [name]: value, formErrors }));
  };

  const handleLocationChange = ({ name, value }) => {
    // const formErrors = allValidations(name, value, location);
    const formErrors = FormValidation(
      name,
      value,
      location,
      locationRequired,
      initialLocationData
    );
    setLocation((prev) => ({ ...prev, [name]: value, formErrors }));
  };
  console.log("location", location);
  const handleClasseSchedulesChange = ({ name, value, index }) => {
    // const formErrors = allValidations(name, value, schedules);
    const formErrors = FormValidation(
      "schedule",
      value,
      classes,
      classRequired,
      initialClassData
    );
    schedules[index] = {
      ...schedules[index],
      [name]: value,
    };
    setSchedules([...schedules]);

    setClasses((prev) => ({ ...prev, formErrors }));
    // if (name === 'days') {
    //     disableEnableWeekDays();
    // }
  };

  const handleAssistantChange = ({ name, value, index }) => {
    // const formErrors = allValidations(name, value, schedules);
    assistants[index] = {
      ...assistants[index],
      [name]: value,
    };
    if (name === "assistant") setPayOptions(index);
    setAssistants([...assistants]);
  };

  const disableEnableWeekDays = () => {
    const allSelectedDays = [];
    schedules.map((item) => {
      allSelectedDays.push(...item.days.map((item) => item.name));
    });

    return setWeekDays(
      weekDays.map((day) => {
        if (allSelectedDays.includes(day.name)) {
          day.disabled = true;
        } else {
          day.disabled = false;
        }
        return day;
      })
    );
  };

  const handleClassesChange = ({ name, value }) => {
    // console.log(name, value)
    // const formErrors = allValidations(name, value, classes);
    let formErrors = FormValidation(
      name,
      value,
      classes,
      classRequired,
      initialClassData
    );
    if (name === "staff") {
      classes.pay = value.payments[value.defaultPay - 1];
    }
    if (name === "event") {
      classes.totalCapacity = value?.defaulatMaxAttendees;
      classes.waitListCapacity = value?.maxWaitList;
      delete formErrors.totalCapacity;
      delete formErrors.waitListCapacity;
    }
    if (name === "indefinite" && value) {classes.endDate = ""; delete formErrors.endDate;}
    if(name === "onLineSignUp" && value == false){
        delete formErrors.onLineCapacity;
        // formErrors = {
        //     ...classes.formErrors,
        //     onLineCapacity:"",
        // }
    }

    setClasses((prev) => ({ ...prev, [name]: value, formErrors }));
  };

  console.log("classesrequired", classRequired);

  const onAddLocationType = () => {
    if (
      showAllFormErrors(locationType, setLocationType, required, initialData)
    ) {
      if (id) {
        dispatch(updateLocationType(id, locationType, setLoading, null));
        setId("");
      } else {
        dispatch(addLocationType(locationType, setLoading, null));
      }
      setshowLocationType(false);
      return setLocationType({
        isActive: true,
        name: "",
        allowOverBooking: "",
      });
    } else {
      dispatch(
        showToast({
          severity: "error",
          summary: "Please Fill All Required Fields",
        })
      );
    }
  };

  const onSaveLocation = () => {
    if (
      showAllFormErrors(
        location,
        setLocation,
        locationRequired,
        initialLocationData
      )
    ) {
      if (id) {
        dispatch(updateLocation(id, location, setLoading, null));
        setId("");
      } else {
        dispatch(addLocation(location, setLoading, null));
      }
      setShowAddLocation(false);
      return setLocation({
        isActive: true,
        name: "",
        locationType: "",
        clubs: [],
      });
    } else {
      dispatch(
        showToast({
          severity: "error",
          summary: "Please Fill All Required Fields",
        })
      );
    }
  };

  const onSaveEventCatgory = () => {
    if (
      showAllFormErrors(
        eventCategory,
        setEventCategory,
        categoryRequired,
        initialCategoryData
      )
    ) {
      eventCategory.events = eventCategory.events.map((event) => event._id);
      setEventCategory(eventCategory);
      if (id) {
        dispatch(updateEventCategory(id, eventCategory, setLoading, null));
        setId("");
      } else {
        dispatch(addEventCategory(eventCategory, setLoading, null));
      }
      setShowEventCategories(true);
      return setEventCategory({
        isActive: true,
        name: "",
        events: [],
      });
    } else {
      dispatch(
        showToast({
          severity: "error",
          summary: "Please Fill All Required Fields",
        })
      );
    }
  };

  const handleEventCategoriestChange = ({ name, value }) => {
    // const formErrors = allValidations(name, value, eventCategory);
    const formErrors = FormValidation(
      name,
      value,
      eventCategory,
      categoryRequired,
      initialCategoryData
    );
    setEventCategory((prev) => ({ ...prev, [name]: value, formErrors }));
  };

  const onEditLocationType = (data) => {
    setId(data._id);
    setLocationType({ ...data });
    return setshowLocationType(true);
  };

  const onEditLocation = (data) => {
    setId(data._id);
    setLocation({ ...data });
    return setShowAddLocation(true);
  };

  const onEditEventCategory = (data) => {
    setId(data._id);
    setCategoryPickList([
      ...filterOneArrayFromAnother([...categoryPicklist], [...data.events]),
    ]);
    setEventCategory({ ...data });
    return setShowEventCategories(false);
  };

  const onEditClassSchedule = (data) => {
    console.log("data", data);
    let obj = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    };
    setId(data._id);
    // setClasses({ ...data });
    setClasses(obj);
    setAssistants([...data.assistants]);
    setSchedules([
      ...data.schedule.map((sc) => ({
        startTime: sc.startTime,
        days: sc.days.map((day) => ({ name: day, disabled: false })),
      })),
    ]);
    return setAddClasses(true);
  };

  const handleLocationFilters = ({ name, value }) => {
    if (value) {
      if (name === "status") value = value === "Active" ? true : false;
      setLocationFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onAddNewSchedule = () => {
    setSchedules([
      ...schedules,
      {
        startTime: null,
        days: [],
      },
    ]);
  };

  const onAddNewAssistant = () => {
    setAssistants([
      ...assistants,
      {
        assistant: null,
        assistantPay: null,
      },
    ]);
  };

  const onCickSearch = () => {
    if (Object.values(locationFilters)) {
      // dispatch(getLocations(setLoading, `?filters=${locationFilters.toString()}`))
    }
  };

  const onRemoveSchedule = (index) => {
    let classSchedulesClone = schedules.splice(index, 1);
    setSchedules([...schedules]);
    disableEnableWeekDays();
  };

  const onRemoveAssistant = (index) => {
    let assistantsClone = assistants.splice(index, 1);
    setAssistants([...assistants]);
    // disableEnableWeekDays();
  };

  const setPayOptions = (index) => {
    assistants[index].assistantPay =
      assistants[index].assistant.payments[
        assistants[index].assistant.defaultPay - 1
      ];
  };

  const onSaveClass = () => {
    if (
      schedules[0]?.startTime?.length != null ||
      schedules[0]?.days?.length != 0
    ) {
      classes.schedule = [
        ...schedules.map((item) => ({
          startTime: item.startTime,
          days: item.days.map((day) => day.name),
        })),
      ];
    }
    classes.assistants = [...assistants];
    setClasses({ ...classes });
    if (
      showAllFormErrors(classes, setClasses, classRequired, initialClassData)
    ) {
      if (id) {
        dispatch(updateClassSchedule(id, classes, setLoading, null));
        setId("");
      } else {
        dispatch(addClassSchedule(classes, setLoading, null));
      }
      setAddClasses(false);
      return setClasses({
        event: null,
        scheduleType: "",
        classLocation: "",
        startDate: null,
        endDate: null,
        indefinite: false,
        schedule: [],
        staff: "",
        pay: "",
        assistants: {
          assistant: "",
          assistantPay: "",
        },
        totalCapacity: null,
        waitListCapacity: null,
        onLineSignUp: false,
        onLineCapacity: null,
        allowSignUpAndPaylater: false,
        attendForFree: false,
      });
    } else {
      dispatch(
        showToast({
          severity: "error",
          summary: "Please Fill All Required Fields",
        })
      );
      window.scrollTo({
        top: 250,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (classes.onLineSignUp == true) {
      setClassRequired([
        "event",
        "scheduleType",
        "classLocation",
        "startDate",
        "endDate",
        "schedule",
        "staff",
        "totalCapacity",
        "waitListCapacity",
        "onLineCapacity",
      ]);
    } else {
      setClassRequired([
        "event",
        "scheduleType",
        "classLocation",
        "startDate",
        "endDate",
        "schedule",
        "staff",
        "totalCapacity",
        "waitListCapacity",
      ]);
    }
  }, [classes]);

  useEffect(() => {
    setInitialClassData(classes);
    setInitialData(locationType);
    setInitialLocationData(location);
    setInitialCategoryData(eventCategory);
  }, []);

  return {
    locationTypes,
    loading,
    location,
    setLocation,
    locationType,
    setLocationType,
    navigate,
    handleLocationTypeChange,
    onAddLocationType,
    showLocationType,
    setshowLocationType,
    onEditLocationType,
    id,
    setId,
    deleteRow,
    setDeleteRow,
    showDelete,
    setShowDelete,
    setLoading,
    locations,
    clubs,
    handleLocationChange,
    onSaveLocation,
    showAddLocation,
    setShowAddLocation,
    onEditLocation,
    locationFilters,
    handleLocationFilters,
    onCickSearch,
    eventsByType,
    classes,
    setClasses,
    handleClassesChange,
    weekDays,
    schedules,
    handleClasseSchedulesChange,
    onAddNewSchedule,
    onRemoveSchedule,
    employees,
    assistants,
    assistantsList,
    onAddNewAssistant,
    onRemoveAssistant,
    setPayOptions,
    handleAssistantChange,
    onSaveClass,
    classSchedules,
    showAddClasses,
    setAddClasses,
    onEditClassSchedule,
    events,
    eventCategory,
    handleEventCategoriestChange,
    categoryPicklist,
    setCategoryPickList,
    eventCategories,
    onSaveEventCatgory,
    showEventCategories,
    setShowEventCategories,
    onEditEventCategory,
    setEventCategory,
  };
}
