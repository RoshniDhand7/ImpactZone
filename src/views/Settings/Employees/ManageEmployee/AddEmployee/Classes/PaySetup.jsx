import React, { useState, useEffect, useId } from 'react';
import { DataView } from 'primereact/dataview';
import { useDispatch, useSelector } from 'react-redux';
import CustomCard, { CustomFilterCard, CustomGridLayout } from '../../../../../../shared/Cards/CustomCard';
import {
    deleteEmployeeClasses,
    editEmployeeClasses,
    getEmployeeClasses,
    updateEmployeeLevel,
} from '../../../../../../redux/actions/EmployeeSettings/classesAction';
import { useParams } from 'react-router-dom';
import AddandEditClasses from './AddandEditClasses';
import { confirmDelete } from '../../../../../../utils/commonFunctions';
import { CustomDropDown, CustomInputSwitch } from '../../../../../../shared/Input/AllInputs';
import PrimaryButton from '../../../../../../shared/Button/CustomButton';
import CustomDialog from '../../../../../../shared/Overlays/CustomDialog';
import { getEmployees } from '../../../../../../redux/actions/EmployeeSettings/employeesAction';
import { getLevels } from '../../../../../../redux/actions/ScheduleSettings/levelActions';

export default function PaySetup() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [openSimilar, setOpenSimilarTo] = useState(false);
    const [data, setData] = useState({
        isClassLevel: '',
        isDefaultPay: '',
    });

    useEffect(() => {
        funcGetEmpClasses();
    }, [dispatch]);
    useEffect(() => {
        dispatch(getEmployees());
        dispatch(getLevels());
    }, [dispatch]);

    const { levelDropdown } = useSelector((state) => state.level);
    const uniqueId = useId();

    const handleChange = ({ name, value }) => {
        dispatch(
            updateEmployeeLevel(id, value, () => {
                funcGetEmpClasses();
            }),
        );
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [employeeClassId, setEmployeeClassId] = useState(null);
    let { allEmployeeClasses } = useSelector((state) => state?.employees);

    useEffect(() => {
        if (allEmployeeClasses) {
            setData((prev) => ({ ...prev, isClassLevel: allEmployeeClasses?.isClassLevel }));
        }
    }, [allEmployeeClasses]);

    const funcGetEmpClasses = () => {
        dispatch(getEmployeeClasses(id));
    };

    const onEdit = (id) => {
        setEmployeeClassId(id?._id);
        // let _empDeptData = employeeDepartments.find((item) => item._id === id);
        // setData({ departments: [_empDeptData.department], wage: _empDeptData.wage });
        setVisible(true);
    };
    const onDelete = (col) => {
        confirmDelete(() => {
            dispatch(
                deleteEmployeeClasses(col._id, () => {
                    funcGetEmpClasses();
                }),
            );
        }, 'Do you want to delete this Employee Classes?');
    };
    const handleSwitchChange = (id, active) => {
        allEmployeeClasses = allEmployeeClasses?.list?.map((item) => {
            if (item._id === id) {
                dispatch(
                    editEmployeeClasses(item?._id, { isDefaultPay: active }, setLoading, () => {
                        funcGetEmpClasses();
                    }),
                );
                return { ...item, isDefaultPay: active };
            } else {
                return { ...item, isDefaultPay: false };
            }
        });
    };

    const itemTemplate = (item) => {
        return (
            <div className="col-12 grid py-2" key={uniqueId}>
                <div className="col-10">{renderRow(item)}</div>
                <div className="col-1 my-auto">
                    <CustomInputSwitch
                        name="isDefaultPay"
                        label="Default Pay"
                        checked={item?.isDefaultPay}
                        onChange={(e) => handleSwitchChange(item._id, e.value)}
                    />
                </div>
                <div className="col-1 my-auto">
                    <i className="mx-3 cursor-pointer pi pi-pencil" onClick={() => onEdit(item)} />
                    <i className="mx-3 cursor-pointer pi pi-trash" onClick={() => onDelete(item)} />
                </div>
            </div>
        );
    };
    const renderRow = (item) => {
        switch (item.payType) {
            case 'INCREMENTAL_PAY':
                return (
                    <div className="flex">
                        <div className="mx-3 flex w-2">
                            <div className="my-auto mr-4">{item.index}</div>
                            <div>
                                <div className="font-medium">Pay</div>
                                <div>Incremental Pay</div>
                            </div>
                        </div>
                        <div className="mx-3">
                            <div className="font-medium ">1-5 Clients</div>
                            <div>${item?.oneToFiveClients}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="mx-3">
                            <div className="font-medium">6-10 Clients</div>
                            <div>${item?.sixToTenClients}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="mx-3">
                            <div className="font-medium">11-15 Clients</div>
                            <div>${item?.elevenToFifteenClients}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="mx-3">
                            <div className="font-medium">16-20 Clients</div>
                            <div>${item?.sixteenToTwentyClients}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="mx-3">
                            <div className="font-medium">21-25 Clients</div>
                            <div>${item?.twentyOneToTwentyFiveClients}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="mx-3">
                            <div className="font-medium">26+ Clients</div>
                            <div>${item?.twentySixPlusClients}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="mx-3">
                            <div className="font-medium">No Registration Pay</div>
                            <div>${item?.noRegistrationPay}</div>
                        </div>
                    </div>
                );
            case 'PAY_PER_CLIENT':
                return (
                    <div className="flex">
                        <div className="mx-3 flex w-2">
                            <div className="my-auto mr-4">{item.index}</div>
                            <div>
                                <div className="font-medium">Pay</div>
                                <div>Pay Per Client</div>
                            </div>
                        </div>
                        <div className="mx-3">
                            <div className="font-medium">Base Rate</div>
                            <div>${item?.baseRate}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="mx-3">
                            <div className="font-medium">Per Client</div>
                            <div>${item?.payPerClientRate}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="ml-3">
                            <div className="font-medium">For each client over</div>
                            <div>{item?.eachClientOver[0].noOfClients}</div>
                        </div>
                        <div className="ml-1 mr-3">
                            <div className="font-medium">Add</div>
                            <div>${item?.eachClientOver[0].rate}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="ml-3">
                            <div className="font-medium">For each client over</div>
                            <div>{item?.eachClientOver[1].noOfClients}</div>
                        </div>
                        <div className="ml-1 mr-3">
                            <div className="font-medium">Add</div>
                            <div>${item?.eachClientOver[1].rate}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="ml-3">
                            <div className="font-medium">For each client over</div>
                            <div>{item?.eachClientOver[2].noOfClients}</div>
                        </div>
                        <div className="ml-1 mr-3">
                            <div className="font-medium">Add</div>
                            <div>${item?.eachClientOver[2].rate}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="mx-2">
                            <div className="font-medium">No Registration Pay</div>
                            <div>${item?.noRegistrationPay}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="mx-2">
                            <div className="font-medium">Max Pay</div>
                            <div>${item?.noRegistrationPay}</div>
                        </div>
                    </div>
                );
            case 'PAY_PER_CLASS':
                return (
                    <div className="flex">
                        <div className="mx-3 flex w-2">
                            <div className="my-auto mr-4">{item.index}</div>
                            <div>
                                <div className="font-medium">Pay</div>
                                <div>Pay Per Class</div>
                            </div>
                        </div>
                        <div className="mx-3 w-1">
                            <div className="font-medium">Price</div>
                            <div>${item?.payPerClassRate}</div>
                        </div>
                        <hr className="text-100" />
                        <div className="mx-3">
                            <div className="font-medium">No Registration Pay</div>
                            <div>${item?.noRegistrationPay}</div>
                        </div>
                    </div>
                );
            case 'PERCENTAGE_RATE':
                return (
                    <div className="flex">
                        <div className="mx-3 flex w-2">
                            <div className="my-auto mr-4">{item.index}</div>
                            <div>
                                <div className="font-medium">Pay</div>
                                <div>% Rate</div>
                            </div>
                        </div>
                        <div className="mx-3 w-1">
                            <div className="font-medium">Percentage</div>
                            <div>{item?.percentage}%</div>
                        </div>
                        <hr className="text-100" />
                        <div className="mx-3">
                            <div className="font-medium">No Registration Pay</div>
                            <div>${item?.noRegistrationPay}</div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="grid">
                        <div className="col-1">{item.index}</div>
                        <div className="col-11">{item.payType}</div>
                    </div>
                );
        }
    };

    const handleSave = () => {};
    return (
        <div>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} extraClass="align-items-end ">
                <div className=" flex justify-content-between align-items-end">
                    <CustomDropDown name="isClassLevel" col={6} options={levelDropdown} optionLabel="name" data={data} onChange={handleChange} />
                    <PrimaryButton name="Similar To" className="w-12rem" label="Similar To" onClick={() => setOpenSimilarTo(true)} />
                </div>
            </CustomFilterCard>
            <CustomCard col="12" title="Pay">
                <DataView value={allEmployeeClasses?.list} itemTemplate={itemTemplate} paginator rows={5} />
                <AddandEditClasses
                    visible={visible}
                    setVisible={setVisible}
                    id={id}
                    employeeClassId={employeeClassId}
                    setEmployeeClassId={setEmployeeClassId}
                />
            </CustomCard>
            <CustomDialog title={'Similar To'} visible={openSimilar} onCancel={() => setOpenSimilarTo(false)} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomDropDown name="employee" col={12} />
                </CustomGridLayout>
            </CustomDialog>
        </div>
    );
}
