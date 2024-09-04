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
export const calculateDiscount = (item, allDiscountTypes) => {
    const { quantity, totalTaxPercentage, allowDiscount, discount } = item;

    let newDiscount = allDiscountTypes.find((item) => item._id === discount?._id);

    const matchingItem = newDiscount?.multiItemDiscount?.find((data) => data.value1 === quantity);

    const unitPrice = calculateUnitPrice(item);
    const taxValue = calculateTax(unitPrice, totalTaxPercentage);
    const netPrice = (unitPrice - taxValue) * quantity;

    console.log(netPrice, 'netPrice');

    if (allowDiscount === 'false' || !discount) {
        return 0;
    }

    const discountValue = matchingItem ? matchingItem?.value2 : newDiscount?.percentage;
    const amountType = matchingItem ? matchingItem?.amountType : newDiscount?.amountType;

    if (amountType === 'FIXED') {
        return netPrice - discountValue;
    } else {
        return calculateTax(netPrice, discountValue);
    }
};

export const calculatePromoCodeDiscount = (discount, netTotal) => {
    let { amountType, percentage } = discount;
    if (amountType === 'FIXED') {
        return netTotal - percentage;
    } else {
        return calculateTax(netTotal, percentage);
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
        return calculateTax(netTotal, pay);
    }
};

export const calculateTax = (unitPrice, taxPercentage) => {
    console.log(unitPrice, taxPercentage, 'taxPer');
    return Number(unitPrice * (taxPercentage / 100).toFixed(4));
};
