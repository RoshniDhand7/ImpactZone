import React from 'react';
import { useState } from 'react';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomInputCurrentChange, CustomInputNumber } from '../../../../shared/Input/AllInputs';

export default function CashCalculator() {
    const [data, setData] = useState({
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
        comment: '',
        total: 0,
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <CustomGridLayout>
            <CustomInputCurrentChange name="pennies" data={data} handleChange={handleChange} />
            <CustomInputCurrentChange name="nickels" data={data} handleChange={handleChange} />
            <CustomInputCurrentChange name="dimes" data={data} handleChange={handleChange} />
            <CustomInputCurrentChange name="quarters" data={data} handleChange={handleChange} />
            <CustomInputCurrentChange name="singles" data={data} handleChange={handleChange} />
            <CustomInputCurrentChange name="fives" data={data} handleChange={handleChange} />
            <CustomInputCurrentChange name="tens" data={data} handleChange={handleChange} />
            <CustomInputCurrentChange name="twenties" data={data} handleChange={handleChange} />
            <CustomInputCurrentChange name="fifties" data={data} handleChange={handleChange} />
            <CustomInputCurrentChange name="hundreds" data={data} handleChange={handleChange} />
            <CustomInputNumber name="total" data={data} col="8" disabled={true} />
        </CustomGridLayout>
    );
}
