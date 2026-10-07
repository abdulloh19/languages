const { spawn } = require('child_process');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BOT_TOKEN = '8808898451:AAEvTPKnGwNhJcatziSJ0YPIaEOVRYdXTFg';
const KNOWN_CHAT_IDS = [5787141744];

function postTelegram(endpoint, body) {
  const payload = JSON.stringify(body);
  const req = https.request({
    hostname: 'api.telegram.org',
    path: `/bot${BOT_TOKEN}/${endpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, res => {
    let d = '';
    res.on('data', chunk => d += chunk);
    res.on('end', () => console.log(`[Telegram API] ${endpoint}:`, d.trim()));
  });
  req.on('error', err => console.error(`[Telegram API Error] ${endpoint}:`, err.message));
  req.write(payload);
  req.end();
}

function updateLocalBackend(url) {
  const postData = '';
  const req = http.request({
    hostname: 'localhost',
    port: 8085,
    path: `/api/tunnel/update?url=${encodeURIComponent(url)}`,
    method: 'POST',
    headers: {
      'Content-Length': 0
    }
  }, res => {
    console.log('[Backend Sync] Updated local Spring Boot webapp-url ->', res.statusCode);
  });
  req.on('error', () => {
    // Backend may still be booting, ignore
  });
  req.end();
}

function setTelegramMenu(url) {
  console.log('[TunnelWatcher] Setting Telegram Menu Button to:', url);

  // 1. Set global menu button
  postTelegram('setChatMenuButton', {
    menu_button: {
      type: "web_app",
      text: "Super ilova",
      web_app: { url }
    }
  });

  // 2. Set specific menu buttons for known active chats
  for (const chatId of KNOWN_CHAT_IDS) {
    postTelegram('setChatMenuButton', {
      chat_id: chatId,
      menu_button: {
        type: "web_app",
        text: "Super ilova",
        web_app: { url }
      }
    });
  }

  // 3. Notify local Spring Boot
  updateLocalBackend(url);
}

function startTunnel() {
  const cloudflaredPath = path.join(__dirname, 'cloudflared.exe');
  const useCloudflare = fs.existsSync(cloudflaredPath);

  if (useCloudflare) {
    console.log('[TunnelWatcher] Launching Cloudflare Tunnel (cloudflared.exe)...');
    const child = spawn(cloudflaredPath, ['tunnel', '--url', 'http://localhost:3000'], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    child.stderr.on('data', data => {
      const text = data.toString();
      const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
      if (match) {
        const url = match[0];
        console.log('[TunnelWatcher] Active Cloudflare URL:', url);
        setTelegramMenu(url);
      }
    });

    child.on('exit', code => {
      console.log(`[TunnelWatcher] Cloudflare exited (${code}). Reconnecting in 3s...`);
      setTimeout(startTunnel, 3000);
    });
  } else {
    console.log('[TunnelWatcher] Launching localtunnel...');
    const isWin = process.platform === 'win32';
    const cmd = isWin ? 'npx.cmd' : 'npx';
    const child = spawn(cmd, ['-y', 'localtunnel', '--port', '3000'], {
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    child.stdout.on('data', data => {
      const text = data.toString();
      const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.loca\.lt/);
      if (match) {
        const url = match[0];
        console.log('[TunnelWatcher] Active Localtunnel URL:', url);
        setTelegramMenu(url);
      }
    });

    child.on('exit', code => {
      console.log(`[TunnelWatcher] Localtunnel exited (${code}). Reconnecting in 3s...`);
      setTimeout(startTunnel, 3000);
    });
  }
}

startTunnel();
