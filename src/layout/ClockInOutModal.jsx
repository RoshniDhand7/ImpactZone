import React, { useState } from 'react';
import CustomDialog from '../shared/Overlays/CustomDialog';
import { CustomDropDown, CustomInput, CustomInputNumber, CustomTextArea } from '../shared/Input/AllInputs';
import CustomCard, { CustomGridLayout } from '../shared/Cards/CustomCard';
import moment from 'moment';
import PrimaryButton from '../shared/Button/CustomButton';
import { useDispatch } from 'react-redux';
import { addEmployeesCheckInOut, getEmployeesFromBarCode } from '../redux/actions/EmployeeSettings/employeesAction';
import { yesNoOptions } from '../utils/dropdownConstants';
import formValidation from '../utils/validations';
import { showFormErrors } from '../utils/commonFunctions';

const ClockInOutModal = ({ openClockModal, setOpenClockModal }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [openAccessModal, setOpenAccessModal] = useState({ open: false, data: {} });

    const initialState = {
        // date: new Date(),
        barCode: null,
        name: '',
        isActive: null,
        club: '',
        accessCode: '',
        employeeTimesheet: {
            club: null,
            status: null,
        },
        empId: null,
        clubs: [],
    };

    const [data, setData] = useState(initialState);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleFind = () => {
        if (showFormErrors(data, setData, ['club', 'name', 'accessCode'])) {
            dispatch(
                getEmployeesFromBarCode(data?.barCode, setLoading, (item) => {
                    setData((prev) => ({
                        ...prev,
                        name: item.firstName + ' ' + item.lastName,
                        isActive: item.isActive,
                        employeeTimesheet: item?.employeeTimesheet,
                        empId: item._id,
                        clubs: item?.clubs,
                    }));
                }),
            );
        }
    };
    const handleClock = (type) => {
        if (showFormErrors(data, setData, ['accessCode'])) {
            setOpenAccessModal({ open: true, data });
            setData((prev) => ({ ...prev, status: type }));
            setOpenClockModal(false);
        }
    };

    const onClose = () => {
        setOpenAccessModal({ open: false, data: {} });
        setData(initialState);
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            dispatch(addEmployeesCheckInOut(data, setLoading, onClose));
        }
    };

    return (
        <>
            <CustomDialog
                visible={openClockModal}
                onCancel={() => {
                    setOpenClockModal(false);
                    setData(initialState);
                }}
                position="top"
                width="50vw"
                contentclassname="pb-2"
                title="Employee Clock In/Out"
                onApply={() => handleClock('CLOCK_IN')}
                onSave={() => handleClock('CLOCK_OUT')}
                saveLabel="ClockOut"
                applyLabel="ClockIn"
                applydisabled={data?.employeeTimesheet?.status === 'CLOCK_IN'}
                savedisabled={data?.employeeTimesheet?.status === 'CLOCK_OUT'}
            >
                <CustomGridLayout>
                    <div className="col-6">
                        <h5 className="text-bold mb-2">Date/Time</h5>
                        {moment(new Date()).format('DD-MM-YYYY hh:mm A')}
                    </div>
                    <div className="col-6 grid align-items-end ">
                        <CustomInputNumber name="barCode" col={12} data={data} onChange={handleChange} />
                        <PrimaryButton label="Find" className="" onClick={handleFind} loading={loading} />
                    </div>
                    <h3 className="text-bold mb-2 col-12">Employee</h3>
                    <CustomInput name="name" disabled={true} data={data} />
                    <CustomDropDown name="isActive" options={yesNoOptions} data={data} disabled={true} />
                    <CustomDropDown
                        name="club"
                        options={data?.clubs?.map((item) => ({ name: item.name, value: item._id }))}
                        data={data}
                        onChange={handleChange}
                    />
                    <CustomTextArea name="comment" data={data} onChange={handleChange} />
                </CustomGridLayout>
                <CustomCard title="Alerts" col={12} />
            </CustomDialog>
            <CustomDialog
                title="Access Code"
                visible={openAccessModal?.open}
                onCancel={onClose}
                loading={loading}
                onSave={handleSave}
                saveLabel={data?.employeeTimesheet?.status === 'CLOCK_IN' ? 'Check Out' : 'Check In'}
            >
                <CustomGridLayout>
                    <CustomInput col="12" name="accessCode" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default ClockInOutModal;
