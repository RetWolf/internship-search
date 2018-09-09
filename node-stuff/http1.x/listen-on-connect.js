const http = require('http');
const net = require('net');
const url = require('url');

// Create an HTTP Tunneling Proxy
const proxy = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});

proxy.on('connect', (req, cltSocket, head) => {
  // Connect to an origin server
  const srvUrl = url.parse(`http://${req.url}`);
  const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(cltSocket);
    cltSocket.pipe(srvSocket);
  });
});

// Now that a proxy is running
proxy.listen(1337, '127.0.0.1', () => {
  // Make a request to a tunneling proxy
  const options = {
    port: 1337,
    hostname: '127.0.0.1',
    method: 'CONNECT',
    path: 'mattconway.me:80'
  };

  const req = http.request(options);
  req.end();

  req.on('connect', (res, socket, head) => {
    console.info('Got Connected!');

    // Make a request over an HTTP Tunnel
    socket.write('GET / HTTP/1.1\r\n' +
                 'Host: mattconway.me:80\r\n' +
                 'Connection: close\r\n' +
                 '\r\n');
    socket.on('data', (chunk) => {
      console.info(chunk.toString());
    });
    socket.on('end', () => {
      proxy.close();
    });
  });
});