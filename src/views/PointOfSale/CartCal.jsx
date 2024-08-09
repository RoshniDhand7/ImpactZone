export const calculateUnitPrice = (item) => {
    if (item.quantity && item.moreThan1 && item.moreThan2 && item.unitPrice1) {
        if (item.quantity > item.moreThan1 && item.quantity <= item.moreThan2) {
            console.log('2', item.unitPrice1);
            return item.unitPrice1;
        }
    }
    if (item.quantity && item.moreThan2 && item.moreThan3 && item.unitPrice2) {
        if (item.quantity > item.moreThan2 && item.quantity <= item.moreThan3) {
            console.log('3', item.unitPrice2);
            return item.unitPrice2;
        }
    }
    if (item.quantity && item.moreThan3 && item.unitPrice3) {
        if (item.quantity > item?.moreThan3) {
            console.log('4', item.unitPrice3);
            return item.unitPrice3;
        }
    }
    return item.unitPrice;
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

export const calculateTax = (unitPrice, taxPercentage) => {
    return Number(unitPrice * (taxPercentage / 100).toFixed(4));
};
