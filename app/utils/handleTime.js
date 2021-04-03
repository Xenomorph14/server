

function changeTimeToFloat(value1, value2) {
   var value1 =
      Number(value1.slice(0, 2)) +
      Number(value1.slice(3, 5)) / 60 +
      Number(value1.slice(6, 8)) / 3600;
    var value2 =
      Number(value2.slice(0, 2)) +
      Number(value2.slice(3, 5)) / 60 +
      Number(value2.slice(6, 8)) / 3600;
    return value = (value2 - value1).toFixed(1);
}

 module.exports = { changeTimeToFloat }