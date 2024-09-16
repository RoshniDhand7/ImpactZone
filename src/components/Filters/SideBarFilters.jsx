import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { CustomRadioButtons } from '../../shared/Input/CustomRadioButton';
import { CustomButton } from '../../shared/Button/CustomButton';
import { filterType } from '../../utils/constant';

export default function SideBarFilters({ handleApply, handleClear, children }) {
    const [visible, setVisible] = useState(true);

    const [data, setData] = useState({
        type: 'AND',
    });
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} showCloseIcon={false}>
            <div className="flex flex-column justify-content-between h-full">
                <div>{children}</div>
                <div>
                    <CustomRadioButtons label="" name="type" onChange={handleChange} data={data} options={filterType} />
                    <hr className=" border-top-1 border-none surface-border" />
                    <div className="flex justify-content-end bottom-0">
                        <CustomButton label="Apply" onClick={handleApply} />
                        <CustomButton label="Clear" onClick={handleClear} className="mx-2" />
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}
