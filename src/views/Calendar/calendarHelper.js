const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
};

const formatDateRange = (startDate, endDate) => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};
export { formatDate, formatDateRange };
