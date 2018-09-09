const http = require('http');

http.get('http://ict.neit.edu/evanrense/salaries.php', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;

  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } /* else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid Content-Type.\n' +
                      `Expected application/json but recieved ${contentType}`);
  } */

  if (error) {
    console.error(error.message);
    res.resume(); // Consume response data to free up memory
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.info(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});