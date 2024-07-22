import React, { useState } from 'react';
import FormPage from '../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup } from '../../../shared/Button/CustomButton';
import { useSelector } from 'react-redux';
import { CustomCalenderInput, CustomDropDown } from '../../../shared/Input/AllInputs';

const SchedulingOptionsForm = () => {
    const handleSave = () => {};

    const [data, setData] = useState({
        schedule: [
            {
                startTime: '',
                endTime: '',
                days: [],
            },
        ],
    });
    const { isLoading } = useSelector((state) => state?.loader);

    const handleAddSchedule = () => {
        const newSchedule = {
            startTime: '',
            endTime: '',
            days: [],
        };
        setData((prev) => ({
            ...prev,
            schedule: [...prev.schedule, newSchedule],
        }));
    };

    const handleRemove = (indexToRemove, fieldName) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: prevData[fieldName].filter((_, index) => index !== indexToRemove),
        }));
    };

    // const handleChangeDynamicField = ({ name, value, customIndex, fieldName }) => {
    //     const _newData = { ...data };
    //     let obj = _newData[fieldName][customIndex];
    //     obj[name] = value;
    //     const formErrors = formValidation(name, value, obj);
    //     obj.formErrors = formErrors;
    //     _newData[fieldName][customIndex] = obj;

    //     setData(() => ({
    //         ..._newData,
    //     }));
    // };

    const handleChangeDynamicField = ({ name, value, customIndex, fieldName }) => {
        const _newData = { ...data };
        let obj = _newData[fieldName][customIndex];
        console.log('obj>>', obj);
        obj[name] = value;
    };

    console.log('data,', data);
    return (
        <>
            <FormPage backText="Levels">
                <CustomCard col="12" title="Scheduling Options">
                    <CustomGridLayout>
                        <label>Hours Of Operation</label>
                        <CustomGridLayout extraClass="justify-content-end">
                            <PrimaryButton label="Add New Schedule" className="mx-2" onClick={handleAddSchedule} />
                        </CustomGridLayout>

                        {/* <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomInputSwitch name="isActive" data={data} onChange={handleChange} /> */}
                    </CustomGridLayout>

                    {data?.schedule?.map((item, index) => (
                        <>
                            <CustomGridLayout extraClass="align-items-center">
                                <CustomCalenderInput
                                    name="startTime"
                                    customIndex={index}
                                    onChange={handleChangeDynamicField}
                                    data={item}
                                    fieldName="schedule"
                                    timeOnly
                                    placeholder="Select Time"
                                    hourFormat="12"
                                />
                                <CustomCalenderInput
                                    name="endTime"
                                    customIndex={index}
                                    // options={getAssistantOptions(index)}
                                    fieldName="schedule"
                                    // onChange={handleChangeDynamicField}
                                    data={item}
                                />
                                <CustomDropDown
                                    name="days"
                                    customIndex={index}
                                    // options={inst.assistantPayOptions}
                                    fieldName="instructor"
                                    // onChange={handleChangeDynamicField}
                                    data={item}
                                    col={3}
                                />
                                {index > 0 && <i className="pi pi-minus-circle mt-4" onClick={() => handleRemove(index, 'schedule')}></i>}
                            </CustomGridLayout>
                        </>
                    ))}
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={isLoading} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default SchedulingOptionsForm;
