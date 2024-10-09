const BASE_API_TARGET = 'https://combioenergia.fluig.cloudtotvs.com.br/';
const APIS = [
  '/collaboration/api',
  '/api/public/ecm/',
  '/api/',
  '/ecm-forms/',
];
const proxy = [{
  context: APIS,
  target: BASE_API_TARGET,
  changeOrigin: true
}];
module.exports = proxy;