import { useState } from 'react';

const Counter = ({ onChangeValue }) => {
    const [countValue, setCountValue] = useState(0);
    const increment = () => {
        setCountValue(countValue + 1);
        onChangeValue(countValue, countValue + 1);
    };
    const decrement = () => {
        setCountValue(countValue - 1);
        onChangeValue(countValue, countValue - 1);
    };
    const [total, setTotal] = useState(0);

    const handleValue = (prev, val) => {
        setTotal((prevTotal) => prevTotal + val - prev);
    };

    return (
        <>
            <div className="">
                <Counter onChangeValue={handleValue} />
                <Counter onChangeValue={handleValue} />
                <Counter onChangeValue={handleValue} />
                <Counter onChangeValue={handleValue} />
            </div>
            {total}
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
            {countValue}
        </>
    );
};
export default Counter;
