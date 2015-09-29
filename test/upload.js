var Lab = require('lab')
var lab = exports.lab = Lab.script()
var code = require('code')
var server = require('../app')
var fs = require('fs')
var path = require('path')

lab.experiment('Add new invoice from one client', function() {
  var file

  // Carga del archivo de pruebas
  lab.before(function(done){
     file = fs.readFileSync(path.join(__dirname, '/files/imagen1.png'))
     done()
  })

  lab.test("Subiendo un archivo con un campo de fecha", function(done) {
    var payload = [
      '--AaB03x',
      'Content-Disposition: form-data; name="fecha"',
      '',
      '2015-09-14',
      '--AaB03x',
      'Content-Disposition: form-data; name="file"; filename="boleta-1.png"',
      'Content-Type: image/png',
      '',
      new Buffer(file, 'binary'),
      '',
      '--AaB03x--',
    ]
    payload = payload.join('\r\n')
    var headers = {
       'Content-Type': 'multipart/form-data; boundary=AaB03x'
    }
    var options = {
      method: 'POST',
      url: '/upload',
      payload: payload,
      headers: headers
    }

    server.inject(options, function(response) {
      var result = response.result
      code.expect(response.statusCode).to.equal(200)
      code.expect(result.statusCode).to.equal(0)
      code.expect(result.file).to.be.an.object()
      code.expect(result.file.name).to.be.an.string()
      code.expect(result.file.contentType).to.be.an.string()
      code.expect(result.file.length).to.be.an.number()
      done()
    })
  })

})
