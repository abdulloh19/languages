# 🌐 Tilsevar: Google Cloud Serverga Joylash Bo‘yicha To‘liq Qo‘llanma

Ushbu qo‘llanma orqali siz **Tilsevar** loyihasini (Telegram Bot + Next.js Mini App + FastAPI Backend + PostgreSQL) Google Cloud platformasiga tez va xavfsiz joylashtirishingiz mumkin.

---

## 🎯 1-USUL: Google Cloud Compute Engine (Tavsiya etiladi - VM Server)

Bu usul bot va mini app'ni doimiy (24/7) uzluksiz ishlashini ta'minlaydi.

### 1-qadam: Google Cloud Console'da VM Server yaratish
1. [Google Cloud Console](https://console.cloud.google.com/) sahifasiga kiring.
2. Chap menyudan **Compute Engine** $\rightarrow$ **VM instances** bo‘limiga o‘ting.
3. **Create Instance** tugmasini bosing:
   - **Name**: `tilsevar-server`
   - **Region**: o‘zingizga yaqin region (masalan: `europe-west1` yoki `us-central1`)
   - **Machine type**: `e2-medium` (2 vCPU, 4 GB RAM) tavsiya etiladi (yoki tejamkor `e2-small`)
   - **Boot disk**: `Ubuntu 22.04 LTS` yoki `Ubuntu 24.04 LTS` (20-30 GB disk)
   - **Firewall**: 
     - ✅ **Allow HTTP traffic**
     - ✅ **Allow HTTPS traffic**
4. **Create** tugmasini bosing va server yaratilishini 1 daqiqa kuting.

---

### 2-qadam: Serverga SSH orqali ulanish
Console'dagi VM qatoridagi **SSH** tugmasini bosing (brauzerda konsol ochiladi) yoki o‘z kompyuteringizdan quyidagi buyruq orqali kiring:
```bash
ssh username@SERVER_IP_MANZILI
```

---

### 3-qadam: Loyiha kodini serverga yuklash
Server konsolida quyidagi buyruqni bajaring:
```bash
# Git orqali klonlash:
git clone https://github.com/abdulloh19/languages.git
cd languages
```
*(Yoki loyiha papkasini `scp` orqali serverga ko‘chiring).*

---

### 4-qadam: Sozlamalarni kiritish (.env)
Namuna asosida `.env` faylini yarating:
```bash
cp .env.gcp.example .env
nano .env
```
Fayl ichidagi qiymatlarni to‘ldiring:
- `BOT_TOKEN`: @BotFather'dan olingan bot tokeni.
- `WEBAPP_URL`: Domeningiz yoki Cloudflare URL (masalan: `https://tilsevar.yourdomain.com`).

---

### 5-qadam: Avtomatik o‘rnatish va ishga tushirish (1 ta buyruq)
Biz yaratgan maxsus skriptni ishga tushiring:
```bash
chmod +x deploy-gcp.sh
./deploy-gcp.sh
```

Ushbu skript avtomatik ravishda:
1. Docker va Docker Compose plaginlarini o‘rnatadi.
2. Xavfsizlik devorini (Firewall: 80, 443, 22) sozlaydi.
3. PostgreSQL, Python FastAPI bot xizmati, Next.js Mini App va Nginx konteynerlarini quradi va orqa fonga ishga tushiradi.

---

### 6-qadam: Bepul SSL Sertifikat (HTTPS) ulash
Telegram Mini App faqat **HTTPS** protokoli orqali ishlaydi. 
Agar sizda shaxsiy domen bo‘lsa (masalan: `tilsevar.uz` yoki `tilsevar.site`):
1. Domen provayderingizda (GoDaddy, Namecheap, va h.k.) domen A-yozuvini (A record) Google Cloud VM ning **Tashqi IP-manziliga (External IP)** yo‘naltiring.
2. Serverda Certbot orqali bepul Let's Encrypt sertifikatini oling:
```bash
sudo apt install certbot -y
sudo certbot certonly --standalone -d sizning-domeningiz.uz
```
3. Sertifikat olingach, Nginx orqali HTTPS yoqiladi.

*(Agar domeningiz bo‘lmasa, serveringizda bepul Cloudflare Tunnel o‘rnatib, avtomatik HTTPS havola olishingiz ham mumkin).*

---

## 🛠️ Serverni boshqarish bo‘yicha foydali buyruqlar:

- **Konteynerlar holatini ko‘rish:**
  ```bash
  sudo docker compose -f docker-compose.gcp.yml ps
  ```

- **Bot loglarini (xabarlarini) real vaqtda kuzatish:**
  ```bash
  sudo docker compose -f docker-compose.gcp.yml logs -f backend
  ```

- **Mini App loglarini ko‘rish:**
  ```bash
  sudo docker compose -f docker-compose.gcp.yml logs -f frontend
  ```

- **Serverni qayta ishga tushirish (Restart):**
  ```bash
  sudo docker compose -f docker-compose.gcp.yml restart
  ```

- **Yangilangan kodlarni qayta qurish:**
  ```bash
  git pull
  sudo docker compose -f docker-compose.gcp.yml up -d --build
  ```

---

## 🚀 Agar sizda allaqachon Google Cloud serveri bo‘lsa:
Menga serveringizning **Tashqi IP-manzili (External IP)** va **SSH foydalanuvchi nomi / parolini (yoki kalitini)** yozib yuborsangiz, men to‘g‘ridan-to‘g‘ri serveringizga ulanib, barcha tizimlarni o‘zim to‘liq sozlab va ishga tushirib beraman!
