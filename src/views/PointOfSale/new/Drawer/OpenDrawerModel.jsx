import React, { useMemo } from 'react';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { useState } from 'react';
import { CustomDropDown, CustomInput, CustomTextArea } from '../../../../shared/Input/AllInputs';
import useRegister from '../../../../hooks/useRegister';
import CashCalculator from './CashCalculator';
import { CustomListItem } from '../../../../shared/Cards/CustomCard';

export default function OpenDrawerModel({ visible, setVisible }) {
    const { allRegisters } = useRegister();
    const [data, setData] = useState({ register: '', accessCode: '', totalCash: 0, comment: '' });
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
            setAccess(data.accessCode);
        }
    };
    return (
        <CustomDialog
            title="Open Register"
            visible={visible}
            onCancel={onClose}
            onSave={onSubmit}
            saveLabel={access ? 'Start Drawer' : 'Next'}
            width={access ? '65vw' : '30vw'}
        >
            {access ? (
                <>
                    <CashCalculator onChange={handleChange} />
                    <div className="grid">
                        <CustomTextArea col={6} data={data} name="comment" onChange={handleChange} />
                        <div className="col flex flex-column pb-1">
                            <div className="text-sm font-semibold mb-1">Last Close Out</div>
                            <div className="border-round-md border-1 border-gray-300 py-2 px-3 h-full">
                                <CustomListItem name="name" value={'Will Smith'} />
                                <CustomListItem label="Close Out Date/ Time" value={'March-12- 2023 05:00 am'} />
                            </div>
                        </div>
                    </div>
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
