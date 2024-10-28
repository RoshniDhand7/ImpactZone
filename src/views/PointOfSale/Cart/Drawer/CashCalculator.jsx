import React, { useState, useMemo, useEffect } from 'react';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { denominationsToDollarConverter } from '../../../../utils/commonFunctions';
import { CustomInputCurrentChange, CustomInputNumber } from '../../../../shared/Input/AllInputs';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sum]);

    const increaseValue = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value + 1 }));
    };
    const decreseValue = ({ name, value }) => {
        if (value) {
            setData((prev) => ({ ...prev, [name]: value - 1 }));
        }
    };

    return (
        <CustomGridLayout>
            <CustomInputCurrentChange name="pennies" data={data} handleChange={handleChange} onAdd={increaseValue} onSub={decreseValue} />
            <CustomInputCurrentChange name="nickels" data={data} handleChange={handleChange} onAdd={increaseValue} onSub={decreseValue} />
            <CustomInputCurrentChange name="dimes" data={data} handleChange={handleChange} onAdd={increaseValue} onSub={decreseValue} />
            <CustomInputCurrentChange name="quarters" data={data} handleChange={handleChange} onAdd={increaseValue} onSub={decreseValue} />
            <CustomInputCurrentChange name="singles" data={data} handleChange={handleChange} onAdd={increaseValue} onSub={decreseValue} />
            <CustomInputCurrentChange name="fives" data={data} handleChange={handleChange} onAdd={increaseValue} onSub={decreseValue} />
            <CustomInputCurrentChange name="tens" data={data} handleChange={handleChange} onAdd={increaseValue} onSub={decreseValue} />
            <CustomInputCurrentChange name="twenties" data={data} handleChange={handleChange} onAdd={increaseValue} onSub={decreseValue} />
            <CustomInputCurrentChange name="fifties" data={data} handleChange={handleChange} onAdd={increaseValue} onSub={decreseValue} />
            <CustomInputCurrentChange name="hundreds" data={data} handleChange={handleChange} onAdd={increaseValue} onSub={decreseValue} />
            <CustomInputNumber name="total" col="8" disabled={true} value={sum} prefix="$" />
        </CustomGridLayout>
    );
}
