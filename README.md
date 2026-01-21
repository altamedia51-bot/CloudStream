
# 🚀 CloudStream Pro Deployment Guide

Ikuti langkah ini untuk menjalankan aplikasi di VPS Linux Anda.

## 1. Persiapan Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install FFmpeg (Jantung aplikasi)
sudo apt install ffmpeg -y

# Install Node.js v18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

## 2. Clone & Install
```bash
git clone <your-repo-url>
cd cloudstream-pro
npm install
```

## 3. Folder Uploads
Pastikan folder media tersedia:
```bash
mkdir -p uploads/videos uploads/audios uploads/images
```

## 4. Jalankan dengan PM2 (Production)
```bash
sudo npm install -g pm2
npm run prod
```

## 5. Monitoring & Logs
Akses dashboard via IP VPS Anda di port 5000.
Gunakan perintah `pm2 logs cloudstream` untuk melihat aktivitas server secara detail.
