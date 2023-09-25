import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addLocation, addLocationType, getLocations, getLocationTypes, updateLocation, updateLocationType } from "../../../redux/actions/locationsActions";
import { showFormErrors } from "../../../utils/commonFunctions";
import { allValidations } from "../../../utils/formValidations";
import { filterOneArrayFromAnother, stringToBoolean } from "../../../utils/javascript";
import { getClubs } from "../../../redux/actions/clubsActions";
import { addEventCategory, getEventCategories, getEventsByType, updateEventCategory } from "../../../redux/actions/eventsActions";
import { getEmployees } from "../../../redux/actions/employeesAction";
import { addClassSchedule, getClassSchedules, updateClassSchedule } from "../../../redux/actions/classSchedulesAction";
import { getEvents } from "../../../redux/actions/eventActions";

export default function Index() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [location, setLocation] = useState({
        isActive: true,
        name: "",
        locationType: "",
        clubs: []
    });

    const [locationType, setLocationType] = useState({
        isActive: true,
        name: "",
        allowOverBooking: ""
    });

    const [schedules, setSchedules] = useState([{
        startTime: null,
        days: []
    }]);

    const [assistants, setAssistants] = useState([{
        assistant: null,
        assistantPay: null
    }]);

    const [eventCategory, setEventCategory] = useState({
        isActive: true,
        name: "",
        events: []
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
            assistantPay: ""
        },
        totalCapacity: null,
        waitListCapacity: null,
        onLineSignUp: false,
        onLineCapacity: null,
        allowSignUpAndPaylater: false,
        attendForFree: false,
    });

    const [weekDays, setWeekDays] = useState([{ name: "Sunday", disabled: false }, { name: "Monday", disabled: false }, { name: "Tuesday", disabled: false }, { name: "Wednesday", disabled: false }, { name: "Thursday", disabled: false }, { name: "Friday", disabled: false }, { name: "Saturday", disabled: false }]);

    const [locationFilters, setLocationFilters] = useState({});

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

    const [id, setId] = useState("")
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
        events = events.map(event => ({ _id: event._id, name: event.name }));
        setCategoryPickList([...events]);
    }, [events])

    const handleLocationTypeChange = ({ name, value }) => {
        const formErrors = allValidations(name, value, locationType);
        if (name === "allowOverBooking") value = stringToBoolean(value);
        setLocationType((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleLocationChange = ({ name, value }) => {
        const formErrors = allValidations(name, value, location);
        setLocation((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleClasseSchedulesChange = ({ name, value, index }) => {
        // const formErrors = allValidations(name, value, schedules);
        schedules[index] = {
            ...schedules[index],
            [name]: value
        };
        setSchedules([...schedules]);

        // if (name === 'days') {
        //     disableEnableWeekDays();
        // }
    };

    const handleAssistantChange = ({ name, value, index }) => {
        // const formErrors = allValidations(name, value, schedules);
        assistants[index] = {
            ...assistants[index],
            [name]: value
        };
        if (name === 'assistant') setPayOptions(index);
        setAssistants([...assistants]);
    };

    const disableEnableWeekDays = () => {
        const allSelectedDays = [];
        schedules.map(item => {
            allSelectedDays.push(...item.days.map(item => item.name));
        });

        return setWeekDays(weekDays.map(day => {
            if (allSelectedDays.includes(day.name)) {
                day.disabled = true;
            } else {
                day.disabled = false;
            }
            return day;
        }));
    }

    const handleClassesChange = ({ name, value }) => {
        // console.log(name, value)
        const formErrors = allValidations(name, value, classes);
        if (name === "staff") {
            classes.pay = value.payments[value.defaultPay - 1];
        }
        if (name === 'event') {
            classes.totalCapacity = value?.defaulatMaxAttendees;
            classes.waitListCapacity = value?.maxWaitList;
        }
        if (name === "indefinite" && value) classes.endDate = "";

        setClasses((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onAddLocationType = () => {
        if (!showFormErrors(locationType, setLocationType)) {
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
                allowOverBooking: ""
            });
        }
    };

    const onSaveLocation = () => {
        if (!showFormErrors(location, setLocation)) {
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
        }
    };

    const onSaveEventCatgory = () => {
        if (!showFormErrors(eventCategory, setEventCategory)) {
            eventCategory.events = eventCategory.events.map(event => event._id)
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
        }
    };

    const handleEventCategoriestChange = ({ name, value }) => {
        const formErrors = allValidations(name, value, eventCategory);
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
        setId(data._id);
        setClasses({ ...data });
        setAssistants([...data.assistants]);
        setSchedules([...data.schedule.map(sc => ({ startTime: sc.startTime, days: sc.days.map(day => ({ name: day, disabled: false })) }))]);
        return setAddClasses(true);
    };

    const handleLocationFilters = ({ name, value }) => {
        if (value) {
            if (name === "status") value = value === 'Active' ? true : false;
            setLocationFilters((prev) => ({ ...prev, [name]: value }));
        }
    };

    const onAddNewSchedule = () => {
        setSchedules([...schedules, {
            startTime: null,
            days: []
        }]);
    };

    const onAddNewAssistant = () => {
        setAssistants([...assistants, {
            assistant: null,
            assistantPay: null
        }])
    }

    const onCickSearch = () => {
        if (Object.values(locationFilters)) {
            // dispatch(getLocations(setLoading, `?filters=${locationFilters.toString()}`))
        }
    };

    const onRemoveSchedule = (index) => {
        let classSchedulesClone = schedules.splice(index, 1)
        setSchedules([...schedules]);
        disableEnableWeekDays();
    };

    const onRemoveAssistant = (index) => {
        let assistantsClone = assistants.splice(index, 1)
        setAssistants([...assistants]);
        // disableEnableWeekDays();
    };

    const setPayOptions = (index) => {
        assistants[index].assistantPay = assistants[index].assistant.payments[assistants[index].assistant.defaultPay - 1];
    };

    const onSaveClass = () => {
        if (!showFormErrors(classes, setClasses)) {
            classes.schedule = [...schedules.map(item => ({ startTime: item.startTime, days: item.days.map(day => day.name) }))];
            classes.assistants = [...assistants];
            setClasses({ ...classes });
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
                    assistantPay: ""
                },
                totalCapacity: null,
                waitListCapacity: null,
                onLineSignUp: false,
                onLineCapacity: null,
                allowSignUpAndPaylater: false,
                attendForFree: false,
            });
        }
    }

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
        setEventCategory
    };
}