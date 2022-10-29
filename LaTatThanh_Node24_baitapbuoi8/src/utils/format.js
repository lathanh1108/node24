const getDateNow = () => {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

module.exports = { getDateNow }