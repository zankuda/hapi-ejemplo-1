exports.init = function (server) {
  server.route({
    method: 'GET',
    path: '/bienvenido/{name}',
    handler: function (request, reply) {
      reply({
        statusCode: 0,
        mensaje: 'Bienvenida(o) ' + request.params.name
      })
    }
  })

  server.route({
    method: 'POST',
    path: '/bienvenido',
    handler: function (request, reply) {
      reply({
        statusCode: 0,
        mensaje: 'Bienvenida(o) ' + request.payload.name
      })
    }
  })

  server.route({
    method: 'POST',
    path: '/upload',
    config: {
      payload: {
        output: 'file',
        maxBytes: 1048576 * 10, // 10MB,
        parse: true,
        allow: 'multipart/form-data'
      }
    },
    handler: function (request, reply) {
      // Administración de flujo de archivos
      var fs = require('fs')
      // Funciones de manejo de rutas de arhcivos
      var path = require('path')
      // Generador de textos al azar.
      var randtoken = require('rand-token')
      if (request.payload.file) {
        var file = {
          name: randtoken.generate(60) + path.extname(request.payload.file.filename), // Se genera un texto de 60 caráteres y concatena la extensión del archivo
          contentType: request.payload.file.headers['content-type'],
          length: request.payload.file.bytes
        }
        fs.rename(request.payload.file.path, path.join(__dirname, '/upload/' + file.name), function(err) {
          if (err) {
            reply({
              statusCode: 100,
              mensaje: 'Error al guardar el archivo enviado...'
            })
          }
          else {
            reply({
              statusCode: 0,
              mensaje: 'Archivo recibido',
              file: file
            })
          }
        })
      }
    }
  })

}

