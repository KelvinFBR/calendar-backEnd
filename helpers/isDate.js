const moment = require("moment");

const isDate = (value) => {
  //* Validar si viene el value
  if (!value) return false;

  //* Validar fechas
  const fecha = moment(value);
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isDate,
};
