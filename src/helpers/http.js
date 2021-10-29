const request = require('request');

const sendRequest = ({ method, url, headers = null, body = null } = {}) => {
  var requestOptions = {
    method: method,
    url: url,
    json: true,
  };
  if (headers !== null) {
    requestOptions['headers'] = headers;
  }
  if (body !== null) {
    requestOptions['body'] = body;
  }

  return new Promise(function (resolve, reject) {
    request(requestOptions, (error, res, body) => {
      if (!error && res.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  sendRequest,
};
