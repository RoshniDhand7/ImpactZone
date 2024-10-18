import React from 'react';
import { useState } from 'react';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomInputCurrentChange, CustomInputNumber } from '../../../../shared/Input/AllInputs';
import { useEffect } from 'react';
import { denominationsToDollarConverter } from '../../../../utils/commonFunctions';
import { useMemo } from 'react';

export default function CashCalculator({ name = 'totalCash', onChange }) {
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
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    let sum = useMemo(
        () =>
            Object.keys(data)
                .map((name) => denominationsToDollarConverter(data, name))
                .reduce((a, b) => a + b, 0),
        [data],
    );

    useEffect(() => {
        if (onChange) {
            onChange({ name, value: sum });
        }
    }, [sum]);

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
            <CustomInputNumber name="total" col="8" disabled={true} value={sum} prefix="$" />
        </CustomGridLayout>
    );
}
