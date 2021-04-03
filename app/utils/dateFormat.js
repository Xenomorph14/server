

function  convert (date) {
    let newDate = new Date(date)
    return newDate.toLocaleDateString()
}

module.exports = { convert }