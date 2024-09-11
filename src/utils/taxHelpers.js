export function calculateNetAmount(amount, tax) {
    let net = amount / (1 + tax / 100);
    return net.toFixed(4);
}

export function percentageDifference(val1, val2) {
    return ((val2 - val1) / val1) * 100;
}
