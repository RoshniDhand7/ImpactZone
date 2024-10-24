import moment from 'moment';

function formatDateTime(date) {
    if (date) {
        return moment(date).format('DD/MM/YYYY hh:mm A');
    }
}
export { formatDateTime };
