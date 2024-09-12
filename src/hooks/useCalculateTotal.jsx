import { useMemo } from 'react';

const useCalculateTotal = (data) => {
    const denominationRates = {
        pennies: 0.01,
        nickels: 0.05,
        dimes: 0.1,
        quarters: 0.25,
        singles: 1,
        fives: 5,
        tens: 10,
        twenties: 20,
        fifties: 50,
        hundreds: 100,
    };
    const calculateTotal = useMemo(() => {
        return Object.keys(denominationRates)
            .reduce((total, key) => {
                return total + (data[key] || 0) * denominationRates[key];
            }, 0)
            .toFixed(4);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return { calculateTotal };
};

export default useCalculateTotal;
