import moment from 'moment';

// for time on tab

export const formatDate = (timestamp) => {
    return moment(timestamp).format("h:mm A");
}