import moment from 'moment';

function formatDateTime(date) {
    if (date) {
        return moment(date).format('DD/MM/YYYY hh:mm A');
    }
}

const getDueDate = (paymentOption, specificDate = null) => {
    const currentDate = moment();

    switch (paymentOption) {
        case 'ON_SALE_DATE':
            return currentDate.toDate();

        case '1ST_OF_MONTH':
            if (currentDate.date() !== 1) {
                return moment().add(1, 'months').startOf('month').toDate();
            }
            return currentDate.startOf('month').toDate();

        case '15TH_OF_MONTH':
            if (currentDate.date() < 15) {
                return currentDate.date(15).toDate();
            }
            return moment().add(1, 'months').date(15).toDate();

        case '1ST_OR_15TH_OF_MONTH':
            if (currentDate.date() <= 15) {
                return currentDate.date(15).toDate();
            } else {
                return moment().add(1, 'months').startOf('month').toDate();
            }

        case '15TH_OR_LAST_OF_MONTH':
            if (currentDate.date() <= 15) {
                return currentDate.date(15).toDate();
            } else {
                return currentDate.endOf('month').toDate();
            }

        case 'LAST_OF_MONTH':
            return currentDate.endOf('month').toDate();

        case 'SPECIFIC_DATE':
            if (specificDate && moment(specificDate).isValid()) {
                const specificMoment = moment(specificDate);
                const yearsToAdd = currentDate.diff(specificMoment, 'years') + 1;
                if (specificMoment.isBefore(currentDate, 'day')) {
                    specificMoment.add(yearsToAdd, 'years');
                }

                return specificMoment.toDate();
            }
            throw new Error("Specific date is required when the 'SPECIFIC_DATE' option is selected.");

        default:
            throw new Error('Invalid payment option.');
    }
};

export { formatDateTime, getDueDate };
