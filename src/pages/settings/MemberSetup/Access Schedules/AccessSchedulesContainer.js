import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showAllFormErrors } from "../../../../utils/commonFunctions";
import { showToast } from "../../../../redux/actions/toastAction";
import FormValidation from "../../../../utils/AllFormValidation";
import { confirmDialog } from 'primereact/confirmdialog';
import { addAccessSchedule, deleteAccessSchedul, getAccessSchedules, updateAccessSchedule } from "../../../../redux/actions/accessSchedulesAction";
import constants from "../../../../utils/constants";
import moment from "moment";

const AccessSchedulesContainer = () => {
    const dispatch = useDispatch();
    let { accessSchedules } = useSelector((state) => state?.accessSchedules);

    const [showAccessSchedules, setShowAccessSchedules] = useState(true);
    const [initialAccessSchedules, setInitialAccessSchedules] = useState({});
    const [required, setRequired] = useState(["name", "color", "schedule"]);
    const [editAccessSchedule, setEditAccessSchedule] = useState(false);
    const [accessSchedulesForm, setAccessSchedulesForm] = useState({
        isActive: true,
        name: "",
        shortName: "",
        color: "",
        description: null,
        schedule: []
    });

    const deleteConfirm = (id) => {
        confirmDialog({
            message: "Do you want to delete this record?",
            header: "Delete Confirmation",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            rejectClassName: "cancel-button",
            accept: () => acceptFunc(id),
            reject,
        });
    };

    const durations = [15, 30, 60];
    const [duration, setDuration] = useState(30);

    const acceptFunc = (id) => {
        dispatch(deleteAccessSchedul(id)).then((data) => {
            if (data.success) {
                dispatch(getAccessSchedules());
            }
        });
    };

    const reject = () => { };

    const onEditAccessScheduleForm = (row) => {
        setAccessSchedulesForm({ ...row });
        setShowAccessSchedules(false);
        setEditAccessSchedule(true);
    };

    const actionTemplate = (col) => {
        return (
            <>
                <div className="flex justify-content-end">
                    <span onClick={() => onEditAccessScheduleForm(col)}>
                        <i className="pi pi-pencil mr-3 cursor-pointer"></i>
                    </span>
                    <span onClick={() => deleteConfirm(col?._id)}>
                        <i className="pi pi-trash cursor-pointer"></i>
                    </span>
                </div>
            </>
        );
    };

    const descriptionTemplate = (col) => {
        return (
            <div>
                {col.description.length >= 100 ? col.description.slice(0, 100) + "..." : col.description}
            </div>
        )
    }

    const AccessSchedulesColumn = [
        {
            field: "name",
            header: "Name",
            id: "",
            index: "",
        },
        {
            field: "description",
            header: "Description",
            id: "",
            index: "",
            body: descriptionTemplate
        },
        {
            field: "shortName",
            header: "Short Name",
            id: "",
            index: "",
        },
        { field: "", header: "", body: actionTemplate, id: "", index: "" },
    ];

    const onDurationChange = (event) => {
        setDuration(event.value);
    }

    const handleAccessSchedulesChange = ({ name, value }) => {
        const formErrors = FormValidation(
            name,
            value,
            accessSchedulesForm,
            required,
            initialAccessSchedules
        );
        setAccessSchedulesForm((prev) => {
            return {
                ...prev,
                [name]: value,
                formErrors
            };
        });
    };

    const submit = () => {
        if (
            showAllFormErrors(accessSchedulesForm, setAccessSchedulesForm, required, initialAccessSchedules)
        ) {
            if (editAccessSchedule) {
                dispatch(updateAccessSchedule(accessSchedulesForm)).then((data) => { if (data.success) { dispatch(getAccessSchedules()); setShowAccessSchedules(true); setEditAccessSchedule(false); } })
            } else {
                dispatch(addAccessSchedule(accessSchedulesForm)).then((data) => { if (data.success) { dispatch(getAccessSchedules()); setShowAccessSchedules(true) } })
            }
            resetForm();
        }
        else {
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

    const resetForm = () => {
        setAccessSchedulesForm({
            isActive: true,
            name: "",
            shortName: "",
            color: "",
            description: null,
            schedule: []
        });
    }

    const onClickAllAccess = () => {
        accessSchedulesForm.schedule = [];
        setAccessSchedulesForm({ ...accessSchedulesForm });
        for (let i = 0; i < 7; i++) {
            accessSchedulesForm.schedule.push({
                day: moment(constants.calendarDefaultWeek.start).add(i, 'days').format("dddd"),
                shortName: moment(constants.calendarDefaultWeek.start).add(i, 'days').format("dddd").substring(0, 3),
                startTime: moment(constants.calendarDefaultWeek.start).add(i, 'days').startOf('day').format(),
                endTime: moment(constants.calendarDefaultWeek.start).add(i, 'days').endOf('day').format()
            });
        }
        return setAccessSchedulesForm({ ...accessSchedulesForm });
    };

    useEffect(() => {
        setInitialAccessSchedules({ ...accessSchedulesForm });
        dispatch(getAccessSchedules());
    }, []);

    return {
        showAccessSchedules,
        setShowAccessSchedules,
        AccessSchedulesColumn,
        accessSchedules,
        handleAccessSchedulesChange,
        accessSchedulesForm,
        setAccessSchedulesForm,
        durations,
        duration,
        onDurationChange,
        onClickAllAccess,
        onEditAccessScheduleForm,
        submit
    };
};

export default AccessSchedulesContainer;
