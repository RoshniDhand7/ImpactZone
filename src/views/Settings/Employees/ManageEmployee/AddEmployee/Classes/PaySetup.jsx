import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { useDispatch } from 'react-redux';
import CustomCard, { CustomFilterCard } from '../../../../../../shared/Cards/CustomCard';
import { deleteEmployeeClasses, getEmployeeClasses } from '../../../../../../redux/actions/EmployeeSettings/classesAction';
import { useParams } from 'react-router-dom';
import AddandEditClasses from './AddandEditClasses';
import { confirmDelete } from '../../../../../../utils/commonFunctions';

export default function PaySetup() {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        funcGetEmpClasses(id);
    }, [dispatch]);

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [employeeClassId, setEmployeeClassId] = useState(null);
    const [employeeClasses, setEmployeeClasses] = useState([]);

    const funcGetEmpClasses = (id) => {
        dispatch(
            getEmployeeClasses(id, setLoading, (data) => {
                data = data.map((item, index) => ({ ...item, index: index + 1 }));
                setEmployeeClasses(data);
            }),
        );
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
                    funcGetEmpClasses(id);
                }),
            );
        }, 'Do you want to delete this Employee Classes?');
    };

    const itemTemplate = (item) => {
        return (
            <div className="col-12 grid py-2" key={item.id}>
                <div className="col-11">{renderRow(item)}</div>
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
    return (
        <div>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} />
            <CustomCard col="12" title="Pay">
                <DataView value={employeeClasses} itemTemplate={itemTemplate} />
                <AddandEditClasses
                    visible={visible}
                    setVisible={setVisible}
                    id={id}
                    employeeClassId={employeeClassId}
                    setEmployeeClassId={setEmployeeClassId}
                />
            </CustomCard>
        </div>
    );
}
