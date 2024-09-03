import React, { useState } from 'react';

const Counter = ({ onTotal }) => {
    const [count, setCount] = useState(0);
    const handleIncrement = () => {
        setCount((prev) => prev + 1);
        onTotal((prev) => prev + 1);
    };
    const handleDecrement = () => {
        setCount((prev) => prev - 1);
        onTotal((prev) => prev - 1);
    };
    return (
        <div>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <div>{count}</div>
        </div>
    );
};

export default Counter;
