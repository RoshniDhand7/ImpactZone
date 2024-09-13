import React, { forwardRef } from 'react';

const CashRegisterReceipt = forwardRef(({ data, denominationRates }, ref) => (
    <div ref={ref}>
        <h1>Cash Register Receipt</h1>
        <div>
            <div>
                <strong>Drawer Name:</strong> {data?.drawerName}
            </div>
            <div>
                <strong>Opened By:</strong> {data?.openedBy}
            </div>
            <div>
                <strong>Opened At:</strong> {data?.openedAt}
            </div>
        </div>
        <hr />
        <div>
            <h3>Cash Count</h3>
            <div>
                <strong>Pennies:</strong> {denominationRates['pennies'] * data?.pennies}
            </div>
            <div>
                <strong>Nickels:</strong> {denominationRates['nickels'] * data?.nickels}
            </div>
            <div>
                <strong>Dimes:</strong> {denominationRates['dimes'] * data?.dimes}
            </div>
            <div>
                <strong>Quarters:</strong> {denominationRates['quarters'] * data?.quarters}
            </div>
            <div>
                <strong>Singles:</strong> {denominationRates['singles'] * data?.singles}
            </div>
            <div>
                <strong>Fives:</strong> {denominationRates['fives'] * data?.fives}
            </div>
            <div>
                <strong>Tens:</strong> {denominationRates['tens'] * data?.tens}
            </div>
            <div>
                <strong>Twenties:</strong> {denominationRates['twenties'] * data?.twenties}
            </div>
            <div>
                <strong>Fifties:</strong> {denominationRates['fifties'] * data?.fifties}
            </div>
            <div>
                <strong>Hundreds:</strong> {denominationRates['hundreds'] * data?.hundreds}
            </div>
            <div>
                <strong>Total Cash Sales:</strong> {data?.total}
            </div>
        </div>
        <hr />
        <div>
            <h3>Summary</h3>
            <div>
                <strong>Cash at Start:</strong> {data?.cashAtStart}
            </div>
            <div>
                <strong>Remaining Cash:</strong> {data?.cashDifference}
            </div>
            <div>
                <strong>Total Cash Close Out:</strong> {data?.total}
            </div>
        </div>
    </div>
));

export default CashRegisterReceipt;
