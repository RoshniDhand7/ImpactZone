export const calculateUnitPrice = (item) => {
    if (item.quantity > item.moreThan1 && item.quantity <= item.moreThan2) {
        return item.unitPrice1.toFixed(4);
    } else if (item.quantity > item.moreThan2 && item.quantity <= item.moreThan3) {
        return item.unitPrice2.toFixed(4);
    } else if (item.quantity > item.moreThan3) {
        return item.unitPrice3.toFixed(4);
    } else {
        return item.unitPrice.toFixed(4);
    }
};
export const calculateDiscount = (item) => {
    const { discount, quantity, totalTaxPercentage, allowDiscount } = item;
    const matchingItem = discount?.multiItemDiscount?.find((data) => data.value1 === quantity);

    const unitPrice = calculateUnitPrice(item);
    const taxValue = calculateTax(unitPrice, totalTaxPercentage);
    const netPrice = (unitPrice - taxValue) * quantity;

    if (allowDiscount === 'false') {
        return 0;
    }

    const discountValue = matchingItem ? matchingItem.value2 : discount.percentage;
    const amountType = matchingItem ? matchingItem?.amountType : discount.amountType;

    if (amountType === 'FIXED') {
        return netPrice - discountValue;
    } else {
        return calculateTax(netPrice, discountValue);
    }
};

// export const calculateDiscount = (item) => {
//     const matchingItem = item.discount.multiItemDiscount.find((data) => data.value1 === item.quantity);

//     console.log(matchingItem, 'matchingItem');
//     const unitPrice = calculateUnitPrice(item);
//     const taxValue = calculateTax(unitPrice, item.totalTaxPercentage);
//     const netPrice = unitPrice * item.quantity - taxValue * item.quantity;
//     if (item.allowDiscount === 'false') {
//         return 0;
//     } else if (item.quantity) {
//         if (item.discount.amountType === 'FIXED') {
//             return netPrice - matchingItem ? matchingItem?.value1 : item.discount.percentage;
//         } else {
//             return calculateTax(netPrice, matchingItem ? matchingItem?.value1 : item.discount.percentage);
//         }
//     }
// };

export const calculateTax = (unitPrice, taxPercentage) => {
    return Number(unitPrice * (taxPercentage / 100).toFixed(4));
};
