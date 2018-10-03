'use scrict';

const got = require('got')

module.exports = () => {
  const apiUrl =
    'http://www.viaquatro.com.br/generic/Main/LineStatus'

  return got(apiUrl).then(({ body }) => {
    if(body) {
      return JSON.parse(body);
    }
    else {
      return "Erro ao consultar dados. :(";
    }

    throw new TypeError('Please, try again in a few minutes')
  })
}