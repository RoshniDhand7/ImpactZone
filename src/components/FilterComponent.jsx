import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { CustomButton } from '../shared/Button/CustomButton';
import { CustomRadioButtons } from '../shared/Input/CustomRadioButton';
import { filterType } from '../utils/constant';

export default function FilterComponent({ visible, onHide, onApply, value, children, data, handleChange, setData }) {
    // useEffect(() => {
    //     if (value) {
    //         setData({ ...value });
    //     }
    // }, [value, visible]);

    const handleApply = () => {
        let _keys = Object.keys(data);
        let _filters = {};

        _keys.forEach((key) => {
            const value = data[key];

            // Check if the value is not undefined, null, or an empty string/array
            if (value && (Array.isArray(value) ? value.length > 0 : value !== '')) {
                _filters[key] = value;
            }
        });

        onApply(_filters);
        onHide();
    };
    const handleClear = () => {
        setData({
            filterType: 'AND',
        });
        onApply(data);
    };

    return (
        <Sidebar visible={visible} position="right" onHide={onHide} showCloseIcon={false}>
            <div className="flex flex-column justify-content-between h-full">
                {children}
                <div>
                    <CustomRadioButtons label="" name="filterType" onChange={handleChange} data={data} options={filterType} />
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
