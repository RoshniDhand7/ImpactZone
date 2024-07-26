import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup } from '../../../shared/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { CustomCalenderInput, CustomDropDown, CustomMultiselect } from '../../../shared/Input/AllInputs';
import formValidation from '../../../utils/validations';
import { WeekDaysOption, yesNoOptions } from '../../../utils/dropdownConstants';
import CustomTable from '../../../shared/Table/CustomTable';
import { confirmDelete, showArrayFormErrors, showFormErrors } from '../../../utils/commonFunctions';
import moment from 'moment';
import { addScheduling, getSchedulings } from '../../../redux/actions/ScheduleSettings/SchedulingOptions';

const SchedulingOptionsForm = () => {
    const dispatch = useDispatch();
    const [allTimingsList, setAllTimingsList] = useState([]);
    const [edithourId, setEditHourId] = useState(null);

    const [data, setData] = useState({
        allowWaitlist: '',
        requireComment: '',
        date: '',
        open: '',
        startTime: '',
        endTime: '',
        hoursOperation: [
            {
                startTime: '',
                endTime: '',
                days: [],
            },
        ],
        open: '',
    });
    const { isLoading } = useSelector((state) => state?.loader);

    useEffect(() => {
        dispatch(getSchedulings());
    }, [dispatch]);

    const allSchedulingOptions = useSelector((state) => state?.schedulingOptions?.allSchedulingOptions);

    useEffect(() => {
        if (allSchedulingOptions?.length) {
            setData({
                allowWaitlist: allSchedulingOptions?.[0]?.allowWaitlist,
                requireComment: allSchedulingOptions?.[0]?.requireComment,
                date: '',
                open: '',
                startTime: '',
                endTime: '',
                hoursOperation: allSchedulingOptions?.[0]?.hoursOperation?.map((item) => ({
                    ...item,
                    startTime: new Date(item.startTime),
                    endTime: new Date(item.endTime),
                })),
                open: '',
                allTimingsList: allSchedulingOptions?.[0]?.timingAndHoliday?.length,
            });
            setAllTimingsList(allSchedulingOptions?.[0]?.timingAndHoliday);
        }
    }, [allSchedulingOptions]);

    const handleAddSchedule = () => {
        const newSchedule = {
            startTime: '',
            endTime: '',
            days: [],
        };
        setData((prev) => ({
            ...prev,
            hoursOperation: [...prev.hoursOperation, newSchedule],
        }));
    };
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        if (name === 'open') {
            setData((prev) => ({ ...prev, open: value, startTime: '', endTime: '', formErrors }));
        } else {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };

    const handleRemove = (indexToRemove, fieldName) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: prevData[fieldName].filter((_, index) => index !== indexToRemove),
        }));
    };

    const handleChangeDynamicField = ({ name, value, customIndex, fieldName }) => {
        const _newData = { ...data };
        let obj = _newData[fieldName][customIndex];
        obj[name] = value;
        const formErrors = formValidation(name, value, obj);
        obj.formErrors = formErrors;
        _newData[fieldName][customIndex] = obj;
        setData(() => ({
            ..._newData,
        }));
    };

    const getAvailableOptions = (index) => {
        const selectedDays = data.hoursOperation?.flatMap((item, idx) => (idx !== index ? item.days : []));
        return WeekDaysOption.filter((day) => !selectedDays.includes(day.value));
    };

    const handleAddTimings = () => {
        let ignore = [];
        if (data.open === 'false') {
            ignore = ['startTime', 'endTime', 'allTimingsList'];
        } else {
            ignore = ['allTimingsList'];
        }
        if (showFormErrors(data, setData, ignore)) {
            if (edithourId !== null) {
                setAllTimingsList((prevList) =>
                    prevList.map((item) =>
                        item.id === edithourId ? { ...item, date: data.date, open: data.open, startTime: data.startTime, endTime: data.endTime } : item,
                    ),
                );
                setData((prev) => ({
                    ...prev,
                    date: '',
                    open: '',
                    startTime: '',
                    endTime: '',
                    formErrors: {},
                }));

                setEditHourId(null);
            } else {
                setAllTimingsList((prevList) => [
                    ...prevList,
                    {
                        id: prevList.length + 1,
                        date: data.date,
                        open: data.open,
                        startTime: data.startTime,
                        endTime: data.endTime,
                    },
                ]);
                setData((prev) => ({
                    ...prev,
                    date: '',
                    open: '',
                    startTime: '',
                    endTime: '',
                    formErrors: {},
                }));
            }
            const clearedData = {
                date: '',
                open: '',
                startTime: '',
                endTime: '',
            };

            // const formErrors = {
            //     ...formValidation('date', '', clearedData),
            //     ...formValidation('open', '', clearedData),
            //     ...formValidation('startTime', '', clearedData),
            //     ...formValidation('endTime', '', clearedData),
            // };

            // if (!data.date || !data.open || !data.startTime || !data.endTime) {
            //     setData((prev) => ({ ...prev, ...clearedData, formErrors }));
            // } else {
            //     setData((prev) => ({ ...prev, ...clearedData }));
            // }
        } else {
            // If validation fails, set form errors
            const formErrors = {
                ...formValidation('date', data.date, data),
                ...formValidation('open', data.open, data),
                ...formValidation('startTime', data.startTime, data),
                ...formValidation('endTime', data.endTime, data),
            };

            setData((prev) => ({ ...prev, formErrors }));
        }
    };

    const onEdit = (col, index) => {
        setData((prev) => ({
            ...prev,
            date: new Date(col.date),
            open: col.open,
            startTime: new Date(col.startTime),
            endTime: new Date(col.endTime),
            formErrors: {},
        }));
        setEditHourId(index.rowIndex + 1);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                setAllTimingsList((prevList) => prevList.filter((item) => item.id !== col.id));
            },
            'Do you want to delete this Timings and Holidays ?',
            position,
        );
    };

    const columns = [
        { field: 'id', header: 'S.no' },
        { field: 'date', body: (r) => moment(r.date).format('DD-MM-YYYY'), header: 'Date' },
        { field: 'open', body: (r) => (r.open === 'true' ? 'Yes' : 'No'), header: 'Open' },
        { field: 'startTime', body: (r) => (r?.startTime ? moment(r.startTime).format('hh:mm A') : '-'), header: 'Start Time' },
        { field: 'endTime', body: (r) => (r?.endTime ? moment(r.endTime).format('hh:mm A') : '-'), header: 'End Time' },
    ];

    useEffect(() => {
        const formErrors = formValidation('allTimingsList', allTimingsList?.length, data);
        if (allTimingsList?.length === 0) {
            formErrors['allTimingsList'] = `Please Add Special Timimgs and Holidays`;
            setData((prev) => ({ ...prev, allTimingsList: allTimingsList?.length, formErrors }));
        } else {
            formErrors['allTimingsList'] = ``;
            setData((prev) => ({ ...prev, allTimingsList: allTimingsList?.length, formErrors }));
        }
    }, [allTimingsList]);

    const handleSave = () => {
        let ignore = [];
        ignore = ['startTime', 'endTime', 'open', 'date'];
        if (showFormErrors(data, setData, ignore)) {
            let validatedSchedule = showArrayFormErrors(data.hoursOperation);
            if (!validatedSchedule.isValid) {
                setData((prev) => ({ ...prev, hoursOperation: validatedSchedule.data }));
            }
            if (validatedSchedule.isValid) {
                dispatch(addScheduling({ timingAndHoliday: allTimingsList, ...data }));
            }
        }
    };

    return (
        <>
            <CustomCard col="12" title="Scheduling Options">
                <label>Hours Of Operation</label>
                <CustomGridLayout extraClass="justify-content-end">
                    <CustomGridLayout>
                        <PrimaryButton label="Add New Schedule" className="mx-2" onClick={handleAddSchedule} />
                    </CustomGridLayout>
                </CustomGridLayout>

                {data?.hoursOperation?.map((item, index) => (
                    <>
                        <CustomGridLayout extraClass="align-items-center">
                            <CustomCalenderInput
                                name="startTime"
                                customIndex={index}
                                onChange={handleChangeDynamicField}
                                data={item}
                                fieldName="hoursOperation"
                                timeOnly
                                placeholder="Select Time"
                                hourFormat="12"
                            />
                            <CustomCalenderInput
                                name="endTime"
                                customIndex={index}
                                fieldName="hoursOperation"
                                onChange={handleChangeDynamicField}
                                data={item}
                                timeOnly
                                placeholder="Select Time"
                                hourFormat="12"
                            />
                            <CustomMultiselect
                                name="days"
                                customIndex={index}
                                onChange={handleChangeDynamicField}
                                data={item}
                                options={getAvailableOptions(index)}
                                fieldName="hoursOperation"
                                col={3}
                            />
                            {index > 0 && <i className="pi pi-minus-circle mt-4" onClick={() => handleRemove(index, 'hoursOperation')}></i>}
                        </CustomGridLayout>
                    </>
                ))}
                <CustomGridLayout>
                    <CustomDropDown name="allowWaitlist" data={data} onChange={handleChange} options={yesNoOptions} />
                    <CustomDropDown
                        label="Require Comment (Cancel - No Charge)"
                        name="requireComment"
                        data={data}
                        onChange={handleChange}
                        options={yesNoOptions}
                    />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Special Timings and Holidays">
                <CustomGridLayout>
                    <CustomCalenderInput name="date" data={data} onChange={handleChange} col={6} />
                    <CustomDropDown name="open" data={data} onChange={handleChange} options={yesNoOptions} col={6} />
                    {data?.open === 'true' && (
                        <>
                            <CustomCalenderInput
                                name="startTime"
                                onChange={handleChange}
                                data={data}
                                timeOnly
                                placeholder="Select Time"
                                hourFormat="12"
                                col={6}
                            />
                            <CustomCalenderInput
                                name="endTime"
                                onChange={handleChange}
                                data={data}
                                timeOnly
                                placeholder="Select Time"
                                hourFormat="12"
                                col={6}
                            />
                        </>
                    )}
                </CustomGridLayout>
                <CustomGridLayout extraClass="justify-content-end mt-2">
                    <CustomGridLayout>
                        <PrimaryButton label={edithourId ? 'Edit' : 'Add'} className="mx-2" onClick={handleAddTimings} />
                    </CustomGridLayout>
                </CustomGridLayout>
            </CustomCard>
            <CustomTable data={allTimingsList} columns={columns} onEdit={onEdit} onDelete={onDelete} />
            {data?.formErrors?.allTimingsList && <div className="text-sm p-error">{data?.formErrors?.allTimingsList}</div>}
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={isLoading} />
            </CustomButtonGroup>
        </>
    );
};

export default SchedulingOptionsForm;
