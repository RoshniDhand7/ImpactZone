export const calculateUnitPrice = (item) => {
    if (item?.subVariation?.unitPrice) {
        return item.subVariation.unitPrice;
    } else {
        if (item.quantity && item.moreThan1 && item.moreThan2 && item.unitPrice1) {
            if (item.quantity > item.moreThan1 && item.quantity <= item.moreThan2) {
                return item.unitPrice1;
            }
        }
        if (item.quantity && item.moreThan2 && item.moreThan3 && item.unitPrice2) {
            if (item.quantity > item.moreThan2 && item.quantity <= item.moreThan3) {
                return item.unitPrice2;
            }
        }
        if (item.quantity && item.moreThan3 && item.unitPrice3) {
            if (item.quantity > item?.moreThan3) {
                return item.unitPrice3;
            }
        }
    }

    return item.unitPrice;
};

export const calculatePromoCodeDiscount = (discount, netTotal) => {
    let { amountType, percentage } = discount;
    if (amountType === 'FIXED') {
        return netTotal - percentage;
    } else {
        // return calculateTax(netTotal, percentage);
    }
};

export const calculateCommission = (amountType, pay, netTotal, quantity, commissionType) => {
    if (amountType === 'FIXED') {
        if (commissionType === 'PER_ITEM') {
            return pay * quantity;
        } else {
            return pay;
        }
    } else {
        // return calculateTax(netTotal, pay);
    }
};
export const calculateDiscount = (item, allDiscountTypes) => {
    const { quantity, allowDiscount, discount, totalTaxPercentage } = item;
    let newDiscount = allDiscountTypes.find((item1) => item1._id === discount?._id);
    const matchingItem = newDiscount?.multiItemDiscount?.find((data) => data.value1 === quantity);
    const unitPrice = calculateUnitPrice(item);
    const taxValue = calculateTax1(unitPrice, totalTaxPercentage);
    const netPrice = (unitPrice - taxValue) * quantity;

    const netUnitPrice = unitPrice * quantity;
    const discountValue = matchingItem ? matchingItem?.value2 : newDiscount?.percentage;
    const amountType = matchingItem ? matchingItem?.amountType : newDiscount?.amountType;

    if (!allowDiscount || !discount) {
        return 0;
    }

    if (amountType === 'FIXED') {
        return discountValue * quantity;
    } else {
        return (netPrice * quantity * discountValue) / 100;
    }
};
export const calculateTax = (item, discount) => {
    const unitPrice = calculateUnitPrice(item);
    const taxValue = calculateTax1(unitPrice, item.totalTaxPercentage);
    const netPrice = (unitPrice - taxValue) * item.quantity;
    const netUnitPrice = unitPrice * item.quantity;
    const totalDiscountedPrice = netPrice - discount;
    return Number((totalDiscountedPrice * (item.totalTaxPercentage / 100)).toFixed(4)) < 0
        ? 0
        : Number((totalDiscountedPrice * (item.totalTaxPercentage / 100)).toFixed(4));
};

export const calculateTax1 = (unitPrice, taxPercentage) => {
    return Number(unitPrice * (taxPercentage / 100).toFixed(4));
};
