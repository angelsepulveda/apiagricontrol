const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const loggerInfo = (message, data = null) => {
  if (data === null) {
    console.info(new Date().toLocaleDateString('en-US', options), message);
  } else {
    console.info(new Date().toLocaleDateString('en-US', options), message, data);
  }
};

const loggerWarn = message => {
  console.warn(new Date().toLocaleDateString('en-US', options), message);
};

const loggerError = (message, err) => {
  console.error(new Date().toLocaleDateString('en-US', options), message, err);
};

module.exports = {
  loggerInfo,
  loggerError,
  loggerWarn,
};
