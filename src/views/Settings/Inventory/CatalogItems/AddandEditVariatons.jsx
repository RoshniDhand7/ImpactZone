import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomChipInput, CustomInput } from '../../../../shared/Input/AllInputs';

const AddandEditVariatons = ({ visible, setVisible, onData }) => {
    const [data, setData] = useState({
        name: '',
        subVariation: [],
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSave = () => {
        onData(data);
    };
    const loading = useSelector((state) => state.loader.isLoading);
    return (
        <CustomDialog title="Add Variations" visible={visible} onCancel={() => setVisible(false)} loading={loading} onSave={handleSave}>
            <CustomGridLayout>
                <CustomInput name="name" col={12} data={data} onChange={handleChange} />
                <CustomChipInput data={data} name="subVariation" onChange={handleChange} col={12} />
            </CustomGridLayout>
        </CustomDialog>
    );
};

export default AddandEditVariatons;
