#!/usr/bin/env bash
set -e

# ==============================================================================
# Tilsevar - Google Cloud Production Auto-Deploy Script
# OS: Ubuntu 22.04 / 24.04 or Debian 11 / 12 on Google Cloud Compute Engine
# ==============================================================================

echo "========================================================"
echo "🚀 Tilsevar: Google Cloud Serverga Joylash Boshlanmoqda..."
echo "========================================================"

# 1. Update and install prerequisites
echo "📦 Tizim paketlarini yangilash..."
sudo apt-get update -y
sudo apt-get install -y ca-certificates curl gnupg lsb-release git ufw

# 2. Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "🐳 Docker o‘rnatilmoqda..."
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg --yes
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

    echo \
      "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt-get update -y
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo systemctl enable docker
    sudo systemctl start docker
    sudo usermod -aG docker "$USER"
    echo "✅ Docker muvaffaqiyatli o‘rnatildi."
else
    echo "✅ Docker allaqachon mavjud."
fi

# 3. Configure Firewall
echo "🛡️ Xavfsizlik devori (UFW) sozlanmoqda..."
sudo ufw allow 22/tcp || true
sudo ufw allow 80/tcp || true
sudo ufw allow 443/tcp || true
sudo ufw --force enable || true

# 4. Check .env file
if [ ! -f .env ]; then
    echo "⚠️ .env fayli topilmadi. .env.gcp.example asosida yangi .env yaratilmoqda..."
    cp .env.gcp.example .env
    echo "❗ DIQQAT: .env fayliga haqiqiy BOT_TOKEN va WEBAPP_URL qiymatlarini kiritishingiz kerak!"
fi

# 5. Build and launch containers
echo "🏗️ Konteynerlar yig‘ilmoqda va ishga tushirilmoqda..."
sudo docker compose -f docker-compose.gcp.yml pull postgres nginx || true
sudo docker compose -f docker-compose.gcp.yml up -d --build

# 6. Verify status
echo "📊 Konteynerlar holatini tekshirish..."
sudo docker compose -f docker-compose.gcp.yml ps

echo "========================================================"
echo "🎉 TABRIKLAYMIZ! Loyiha Google Cloud serverida ishga tushdi!"
echo "🌐 API & WebApp port: 80 / 443"
echo "🤖 Telegram Bot faol rejimda ishlamoqda"
echo "========================================================"
