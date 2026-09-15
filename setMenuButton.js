const https = require('https');

const tunnelUrl = process.argv[2] || "https://olive-women-itch.loca.lt";

const data = JSON.stringify({
  menu_button: {
    type: "web_app",
    text: "Super ilova",
    web_app: {
      url: tunnelUrl
    }
  }
});

const req = https.request({
  hostname: 'api.telegram.org',
  path: '/bot8808898451:AAEvTPKnGwNhJcatziSJ0YPIaEOVRYdXTFg/setChatMenuButton',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  res.on('data', d => process.stdout.write(d));
});

req.on('error', (e) => {
  console.error('Error:', e);
});

req.write(data);
req.end();
