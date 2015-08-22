var config = require('./config')
var hapi = require('hapi')

var server = new hapi.Server()
server.connection({ 
  host: config.server.host,
  port: config.server.port
})

var routes = require('./routes')
routes.init(server, config)

server.start(function () {
  if (process.env.NODE_ENV != 'test') {
    console.log('Servidor ejecutándose en:', server.info.uri);
  }
});

if (module.parent) {
  if (process.env.NODE_ENV != 'test') {
    console.log("Llamada de ejecución como módulo")
  }
  module.exports = server
}

