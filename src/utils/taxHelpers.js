export function calculateNetAmount(amount, tax) {
    let net = amount / (1 + tax / 100);
    return net;
}
export function calculateFinalAmount(amount, tax) {
    let finalAmount = amount * (1 + tax / 100);
    return finalAmount;
}
export function calculateTax(amount, tax) {
    return (amount * tax) / 100;
}
export function percentageDifference(val1, val2) {
    return ((val2 - val1) / val1) * 100;
}
export function calculateDiscountedAmount(amount, discount) {
    return amount * (discount / 100);
}
export function roundOfNumber(num) {
    num = num * 100;
    num = Math.round(num);
    return num / 100;
}

export function applyDiscounts(amount, discounts) {
    let finalAmount = amount;
    let discountDetails = [];
    discounts.forEach((discount) => {
        let discountAmount = finalAmount * (discount.amount / 100);
        finalAmount -= discountAmount;
        discountDetails.push({
            ...discount,
            discountAmount: discountAmount,
        });
    });

    return {
        finalAmount: finalAmount,
        discountDetails: discountDetails,
    };
}
