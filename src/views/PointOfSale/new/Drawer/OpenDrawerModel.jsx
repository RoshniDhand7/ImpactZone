import React, { useMemo } from 'react';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { useState } from 'react';
import { CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import useRegister from '../../../../hooks/useRegister';
import CashCalculator from './CashCalculator';

export default function OpenDrawerModel({ visible, setVisible }) {
    const { allRegisters } = useRegister();
    const [data, setData] = useState({ register: '', accessCode: '' });
    const [access, setAccess] = useState(null);

    const onClose = () => {
        setVisible(false);
    };

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const options = useMemo(() => allRegisters.map((item) => ({ name: item?.registerId, value: item?._id })), [allRegisters]);

    const onSubmit = () => {
        if (access) {
        } else {
            setAccess(data.access);
        }
    };
    return (
        <CustomDialog title="Open Register" visible={visible} onCancel={onClose} onSave={onSubmit} saveLabel={access ? 'Start Drawer' : 'Next'}>
            {access ? (
                <>
                    <CashCalculator />
                </>
            ) : (
                <>
                    <CustomDropDown data={data} onChange={handleChange} name="register" options={options} required col={12} />
                    <CustomInput data={data} onChange={handleChange} name="accessCode" required col={12} />
                </>
            )}
        </CustomDialog>
    );
}
