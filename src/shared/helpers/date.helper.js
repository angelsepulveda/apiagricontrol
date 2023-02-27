const dateNumber = () => {
  const year = new Date().getFullYear().toString();
  const month = (new Date().getMonth() + 1).toString();
  const monthFormat = month.padStart(2, '0');
  const dia = new Date().getDate().toString();
  const diaFormat = dia.padStart(2, '0');
  const hora = new Date().getHours().toString();
  const horaFormat = hora.padStart(2, '0');
  const minutos = new Date().getMinutes().toString();
  const minutosFormat = minutos.padStart(2, '0');
  const segundos = new Date().getSeconds().toString();
  const segundosFormat = segundos.padStart(2, '0');
  const milisegundos = new Date().getMilliseconds().toString();
  const milisegundosFormat = milisegundos.padStart(4, '0');
  return year + monthFormat + diaFormat + horaFormat + minutosFormat + segundosFormat + milisegundosFormat;
};
const formatDate = currentDatetime => {
  return currentDatetime.getFullYear() + '-' + (currentDatetime.getMonth() + 1) + '-' + currentDatetime.getDate();
};
const formatDateHours = currentDatetime => {
  return (
    currentDatetime.getFullYear() +
    '-' +
    (currentDatetime.getMonth() + 1) +
    '-' +
    currentDatetime.getDate() +
    ' ' +
    currentDatetime.getHours() +
    ':' +
    currentDatetime.getMinutes() +
    ':' +
    currentDatetime.getSeconds()
  );
};

module.exports = { dateNumber, formatDate, formatDateHours };
