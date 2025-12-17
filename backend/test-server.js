// Simple test script to verify server connectivity
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  res.on('data', (d) => {
    console.log('Response:', d.toString());
  });
  
  res.on('end', () => {
    console.log('Server is responding!');
  });
});

req.on('error', (error) => {
  console.error('Error connecting to server:', error.message);
  console.log('Make sure the server is running on port 5000');
});

req.end();