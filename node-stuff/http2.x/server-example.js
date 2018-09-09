const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('./certs/localhost-privkey.pem'),
  cert: fs.readFileSync('./certs/localhost-cert.pem')
});

server.on('error', err => console.error(err));

server.on('stream', (stream, headers) => {
  // Stream is a duplex
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8443); // Starts server at https://127.0.0.1:8443