import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { CustomButton } from '../shared/Button/CustomButton';
import { CustomDropDown, CustomMultiselect } from '../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../utils/dropdownConstants';
import useGetClubs from '../hooks/useGetClubs';

export default function FilterComponent({ visible, onHide, onApply, value }) {
    const [data, setData] = useState({});
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    // useEffect(() => {
    //     if (value) {
    //         setData({ ...value });
    //     }
    // }, [value, visible]);

    const handleApply = () => {
        onApply(data);
        onHide();
    };
    const handleClear = () => {
        setData({});
        onApply(data);
    };
    const { clubsDropdown } = useGetClubs();

    return (
        <Sidebar visible={visible} position="right" onHide={onHide}>
            <div className="flex flex-column justify-content-between h-full">
                <div>
                    <CustomDropDown col={12} name="isActive" options={ActiveFilterDropdown} optionLabel="name" data={data} onChange={handleChange} />
                    <CustomMultiselect col={12} name="club" options={clubsDropdown} data={data} onChange={handleChange} />
                </div>
                <div>
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
