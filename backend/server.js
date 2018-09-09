const { google } = require('googleapis');
const express = require('express');
const serviceaccount = require('./portfolio-work-215906-f38475389957.json');

// Initialize express
let app = express();

// This is to enable CORS from any origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
  next();
});

// Set up our API route
// @returns JSON Array with rows from Google Sheets - https://docs.google.com/spreadsheets/d/1_y96aif5T416xwyLW6LFt_VYBsMJH2d6bV-f_8cKgRI/edit#gid=0
app.get('/api/v1/internship-search', (req, res, next) => {
  // Create an API Client using a Google Cloud Service Account credentials file
  let JWTClient = new google.auth.JWT(
    serviceaccount.client_email,
    null,
    serviceaccount.private_key,
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
  );

  // Authorize our API client and log when we run an API call
  JWTClient.authorize((err, token) => {
    if (err) console.error(err);
    else console.info('Running API Call');
  });
  
  // Set up variables for our API call
  const sheetId = '1_y96aif5T416xwyLW6LFt_VYBsMJH2d6bV-f_8cKgRI';
  const sheetRange = 'A2:D';
  const sheets = google.sheets('v4');
  // Make an API call to the Google Sheets API V4
  sheets.spreadsheets.values.get({
    auth: JWTClient,
    spreadsheetId: sheetId,
    range: sheetRange
  }, (err, apiRes) => {
    if (err) console.error(`The API returned an error: ${err}`)
    else res.json(apiRes.data.values); // Returns the JSON response
  });
});

// Sets our server to listen on port 3001
app.listen(3001, () => console.info('Backend listening on port 3001'));

