const capcon = require('capture-console');

// NOTE: have to pass an array with the string on zero (pointer functionallity)
const startLoggingConsole = consoleLogStore => {
  capcon.startCapture(process.stdout, function (stdout) {
    consoleLogStore[0] += stdout;
  });
};

const stopLoggingConsole = () => {
  capcon.stopCapture(process.stdout);
};

module.exports = {
  startLoggingConsole,
  stopLoggingConsole,
};
