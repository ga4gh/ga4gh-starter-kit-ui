const scrollToTop = () => window.scrollTo(0, 0);

const dateToISOString = date => {
    date.setSeconds(0, 0);
    return date.toISOString().substr(0, 19) + "Z";
}

export {
    scrollToTop,
    dateToISOString
}