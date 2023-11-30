
function formatDate(dateString) {
    if (!dateString || dateString === '0000-00-00') {
        return 'Available';
    } else {
        const date = new Date(dateString);
        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

