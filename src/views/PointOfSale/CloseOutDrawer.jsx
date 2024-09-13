import React, { useEffect, useMemo, useRef, useState } from 'react';
import CustomCard, { BalanceRow, CustomGridLayout, CustomListItem } from '../../shared/Cards/CustomCard';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { CustomInputCurrentChange, CustomInputNumber, CustomTextArea } from '../../shared/Input/AllInputs';
import formValidation from '../../utils/validations';
import useCalculateTotal from '../../hooks/useCalculateTotal';
import { dateConversions, showFormErrors } from '../../utils/commonFunctions';
import { cashRegisterCheckOut } from '../../redux/actions/POS/PosActions';
import { useDispatch } from 'react-redux';
import { getRegisters } from '../../redux/actions/PosSettings/register';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ReactToPrint from 'react-to-print';
import CashRegisterReceipt from './CashRegisterReceipt';
import PrimaryButton from '../../shared/Button/CustomButton';

const CloseOutDrawer = ({ cashRegisterClose, setCashRegisterClose, registerId, accessCode, onClose }) => {
    const initialState = {
        pennies: 0,
        nickels: 0,
        dimes: 0,
        quarters: 0,
        singles: 0,
        fives: 0,
        tens: 0,
        twenties: 0,
        fifties: 0,
        hundreds: 0,
        total: 0,
        drawerName: '',
        openedBy: '',
        openedAt: '',
        comment: '',
        cashAtStart: 0,
        totalCashSales: 0,
        cashDifference: 0,
        amountLeaveInDrawer: 0,
        totalCashcloseOut: 0,
    };

    const dispatch = useDispatch();
    const receiptRef = useRef();

    const [data, setData] = useState(initialState);
    const { calculateTotal, denominationRates } = useCalculateTotal(data);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const { formattedDate, formattedTime } = dateConversions(cashRegisterClose?.closeRegister?.openRegister?.createdAt);

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            drawerName: cashRegisterClose?.closeRegister?.openRegister?.registerName,
            openedAt: formattedDate + ' ' + formattedTime,
            openedBy:
                cashRegisterClose?.closeRegister?.openRegister?.employee?.firstName + ' ' + cashRegisterClose?.closeRegister?.openRegister?.employee?.lastName,
            cashAtStart: cashRegisterClose?.closeRegister?.openRegister?.total,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cashRegisterClose]);

    useEffect(() => {
        setData((prev) => ({ ...prev, total: Number(calculateTotal) }));
    }, [calculateTotal]);

    const onClose1 = () => {
        onClose();
        setCashRegisterClose({ open: false, closeRegister: {} });
        setData(initialState);
    };

    const remaining = useMemo(() => {
        return data?.cashAtStart + data?.totalCashSales - data?.total;
    }, [data?.cashAtStart, data?.totalCashSales, data?.total]);
    useEffect(() => {
        setData((prev) => ({ ...prev, cashDifference: Number(remaining?.toFixed(4)) }));
    }, [remaining]);

    const handleSave = () => {
        let ignore = [];
        if (data?.cashDifference === 0) {
            ignore = ['comment'];
        }
        if (showFormErrors(data, setData, ignore)) {
            dispatch(
                cashRegisterCheckOut(data, registerId, accessCode, () => {
                    onClose1();
                    dispatch(getRegisters());
                }),
            );
        }
    };

    const dateTemplate = (col) => {
        const { formattedDate, formattedTime } = dateConversions(col?.createdAt);
        return formattedDate + ' ' + formattedTime;
    };

    return (
        <>
            <CustomDialog title="" visible={cashRegisterClose?.open} onCancel={onClose1} loading={false} onSave={handleSave} width="90%" saveLabel="Close Out">
                <CustomGridLayout>
                    <CustomCard col="4" title="Close Out Drawer">
                        <CustomListItem name="drawerName" data={data} />
                        <CustomListItem name="openedBy" data={data} />
                        <CustomListItem name="openedAt" data={data} />
                        <CustomTextArea name="comment" col="12" data={data} onChange={handleChange} />
                        <div>
                            <ReactToPrint trigger={() => <PrimaryButton className="btn">Print Receipt</PrimaryButton>} content={() => receiptRef.current} />
                        </div>

                        {/* Hidden receipt component to be printed */}
                        <div style={{ display: 'none' }}>
                            <CashRegisterReceipt data={data} denominationRates={denominationRates} ref={receiptRef} />
                        </div>
                    </CustomCard>
                    <CustomCard col="8" title="Cash Count">
                        <CustomGridLayout>
                            <CustomInputCurrentChange col="6" name="pennies" data={data} handleChange={handleChange} />
                            <CustomInputCurrentChange col="6" name="nickels" data={data} handleChange={handleChange} />
                            <CustomInputCurrentChange col="6" name="dimes" data={data} handleChange={handleChange} />
                            <CustomInputCurrentChange col="6" name="quarters" data={data} handleChange={handleChange} />
                            <CustomInputCurrentChange col="6" name="singles" data={data} handleChange={handleChange} />
                            <CustomInputCurrentChange col="6" name="fives" data={data} handleChange={handleChange} />
                            <CustomInputCurrentChange col="6" name="tens" data={data} handleChange={handleChange} />
                            <CustomInputCurrentChange col="6" name="twenties" data={data} handleChange={handleChange} />
                            <CustomInputCurrentChange col="6" name="fifties" data={data} handleChange={handleChange} />
                            <CustomInputCurrentChange col="6" name="hundreds" data={data} handleChange={handleChange} />
                            <CustomInputNumber name="total" data={data} col="8" disabled={true} />
                        </CustomGridLayout>
                    </CustomCard>
                    <CustomCard col="6" title="Last Close Out">
                        <DataTable
                            value={cashRegisterClose?.closeRegister?.closeRegisterList || []}
                            size="normal"
                            tableStyle={{ minWidth: '25rem' }}
                            className="p-0"
                            stripedRows
                            scrollable
                            scrollHeight="400px"
                        >
                            <Column field="createdAt" body={dateTemplate} header="Date/Time" style={{ width: '40%' }}></Column>
                            <Column
                                field="employee.firstName"
                                header="Employee"
                                body={(r) => r.employee.firstName + '' + r.employee.lastName}
                                style={{ width: '20%' }}
                            ></Column>
                            <Column field="total" header="Cash" body={(r) => `$ ${r.total}`} style={{ width: '20%' }}></Column>
                        </DataTable>
                    </CustomCard>
                    <CustomCard col="6" title="Balance">
                        <BalanceRow label="Cash At Start" value={data?.cashAtStart || 0} />
                        <BalanceRow label="Total Cash Sales" value={0} />
                        <BalanceRow label="Remaining Cash" value={data?.cashDifference || 0} valueClass="text-red-600" />
                        <BalanceRow label="Amount to Left in drawer" value={data?.amountLeaveInDrawer || 0} />
                        <BalanceRow label="Total cash close out" value={data?.totalCashcloseOut || 0} />
                    </CustomCard>
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default CloseOutDrawer;
