import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getClubs } from "../../../../redux/actions/clubsActions";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { showAllFormErrors } from "../../../../utils/commonFunctions";
import { showToast } from "../../../../redux/actions/toastAction";
import FormValidation from "../../../../utils/AllFormValidation";
import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from "primereact/button";
import { getAccessSchedules } from "../../../../redux/actions/accessSchedulesAction";

const AccessSchedulesContainer = () => {
    const dispatch = useDispatch();
    let { accessSchedules } = useSelector((state) => state?.accessSchedules);

    const allClubs = useSelector((state) => state.clubs.clubs);
    const [clubs, setClubs] = useState([])
    const [showAccessShedules, setShowAccessShedules] = useState(true)
    const [initialAccessSchedules, setInitialAccessSchedules] = useState({})
    const [required, setRequired] = useState(["name", "color", "schedule"])
    const [selectedRow, setSelectedRow] = useState([])
    const [editMemberType, setEditMemberType] = useState(null)
    const [visible, setVisible] = useState(false);
    const [newName, setNewName] = useState("");
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

    const acceptFunc = (id) => {
        // dispatch(DeleteMemberShipTypeAction(id)).then((data) => {
        //     if (data.success) {
        //         dispatch(getAccessSchedules());
        //     }
        // });
    };

    const reject = () => { };

    const actionTemplate = (col) => {
        return (
            <>
                <div className="flex justify-content-end">
                    <span onClick={() => setEditMemberType(col)}>
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

    const showAddMemebershipTypeScreen = () => {
        setShowAccessShedules((prev) => !prev);
        if (editMemberType) {
            setEditMemberType(null)
            setAccessSchedulesForm({
                isActive: true,
                name: "",
                description: "",
                discountType: "",
                accessRestriction: null,
                accessSchedule: "",
                allowRemoteCheckIn: null,
                clubCreditAmount: "",
                transferToAnotherType: "",
                specialRestriction: "",
                minimumAgeAllowed: "",
                maximumAgeAllowed: "",
                maximumDaysAllowed: "",
                maximumDistanceAllowed: "",
                clubs: [],
                clubsOption: [],
                services: [],
            })
        }
    };

    const memberTypeHandleChange = ({ name, value }) => {
        const formErrors = FormValidation(
            name,
            value,
            accessSchedulesForm,
            required,
            initialAccessSchedules
        );
        if (name == "accessRestriction" && value == false) {
            setAccessSchedulesForm((prev) => {
                return {
                    ...prev,
                    [name]: value,
                    accessSchedule: "",
                    formErrors
                };
            });
        }
        else if (name == "specialRestriction" && value == "By Age") {
            setAccessSchedulesForm((prev) => {
                return {
                    ...prev,
                    [name]: value,
                    maximumDaysAllowed: "",
                    maximumDistanceAllowed: "",
                    formErrors,
                };
            });
        }
        else if (name == "specialRestriction" && value == "By Location") {
            setAccessSchedulesForm((prev) => {
                return {
                    ...prev,
                    [name]: value,
                    minimumAgeAllowed: "",
                    maximumAgeAllowed: "",
                    maximumDaysAllowed: "",
                    formErrors
                };
            });
        }
        else if (name == "specialRestriction" && value == "By Days") {
            setAccessSchedulesForm((prev) => {
                return {
                    ...prev,
                    [name]: value,
                    minimumAgeAllowed: "",
                    maximumAgeAllowed: "",
                    maximumDistanceAllowed: "",
                    formErrors
                };
            });
        }
        else {
            setAccessSchedulesForm((prev) => {
                return {
                    ...prev,
                    [name]: value,
                    formErrors
                };
            });
        }

    };

    const memberTypePickerHandleChange = ({ name, value, source }) => {
        const formErrors = FormValidation(
            "clubs",
            value,
            accessSchedulesForm,
            required,
            initialAccessSchedules
        );
        let clubsNew = value.map((item) => { return item._id })
        setAccessSchedulesForm((prev) => {
            return {
                ...prev,
                [name]: value,
                clubs: clubsNew,
                formErrors

            };
        });
        setClubs(source)
    };

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const removeAll = () => {
        setAccessSchedulesForm((prev) => {
            return {
                ...prev,
                services: []
            }
        })
        delete accessSchedulesForm?.formErrors?.services;
        setSelectedRow([])
    }

    const submitNewName = () => {
        let payload = {
            ...accessSchedulesForm,
            name: newName,
            _id: null,
        };
        if (showAllFormErrors(accessSchedulesForm, setAccessSchedulesForm, required, initialAccessSchedules)) {
            setVisible(false);
            // dispatch(addMemberShipType(payload)).then((data) => {
            //     if (data.success) {
            //         dispatch(getAccessSchedules());
            //         const myTimeout = setTimeout(() => {
            //             // setVisible(false);
            //             setNewName("")
            //             setShowAccessShedules(false);
            //         }, 1000);
            //     }
            // });
        }
    };

    const footerContent = (
        <div>
            <Button
                label="Cancel"
                icon=""
                onClick={() => setVisible(false)}
                className="p-button-text"
            />
            <Button
                label="Create Membership Type"
                icon=""
                onClick={() => submitNewName()}
                autoFocus
            />
        </div>
    );

    const newNameHandle = (e) => {
        const { name, value } = e.target;
        setNewName(value);
    };

    const submit = () => {
        if (
            showAllFormErrors(accessSchedulesForm, setAccessSchedulesForm, required, initialAccessSchedules)
        ) {
            if (editMemberType) {
                // dispatch(UpdateMemberShipTypeAction(accessSchedulesForm)).then((data) => { if (data.success) { dispatch(getAccessSchedules()); setShowAccessShedules(false) } })
            } else {
                // dispatch(addMemberShipType(accessSchedulesForm)).then((data) => { if (data.success) { dispatch(getAccessSchedules()); setShowAccessShedules(false) } })
            }
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

    }


    useEffect(() => {
        setInitialAccessSchedules(accessSchedulesForm)
        dispatch(getAccessSchedules());
    }, []);

    // useEffect(() => {
    //     if (editMemberType) {
    //         console.log("editMemberType", editMemberType)
    //         let obj = {
    //             ...editMemberType,
    //             isActive: editMemberType.isActive,
    //             name: editMemberType.name,
    //             description: editMemberType.description,
    //             discountType: editMemberType.discountType,
    //             accessRestriction: editMemberType.accessRestriction,
    //             accessSchedule: editMemberType.accessSchedule,
    //             allowRemoteCheckIn: editMemberType.allowRemoteCheckIn,
    //             clubCreditAmount: editMemberType.clubCreditAmount,
    //             transferToAnotherType: editMemberType.transferToAnotherType?._id,
    //             specialRestriction: editMemberType.specialRestriction,
    //             minimumAgeAllowed: editMemberType.minimumAgeAllowed,
    //             maximumAgeAllowed: editMemberType.maximumAgeAllowed,
    //             maximumDaysAllowed: editMemberType.maximumDaysAllowed,
    //             maximumDistanceAllowed: editMemberType.maximumDistanceAllowed,
    //             clubs: editMemberType.clubs?.map((item) => { return item._id }),
    //             clubsOption: editMemberType.clubs,
    //             services: editMemberType.services,
    //         }
    //         setAccessSchedulesForm(obj)
    //         setShowAccessShedules(true)
    //         setSelectedRow(editMemberType.services)
    //         let clubSource = clubs.filter((item) => { return !editMemberType.clubs.find((child) => { return item._id == child._id }) })
    //         setClubs(clubSource)
    //     }
    // }, [editMemberType])

    return {
        showAccessShedules,
        setShowAccessShedules,
        AccessSchedulesColumn,
        accessSchedules,
        submit
    };
};

export default AccessSchedulesContainer;
