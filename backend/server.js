
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const ffmpegEngine = require('./services/ffmpegEngine');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Initialization
const db = new sqlite3.Database('./database.sqlite');

// API Routes (Example: Start Stream)
app.post('/api/streams/start', (req, res) => {
    const { config, visualAsset, audios } = req.body;
    
    // Validasi token & user eligibility (Sesuai role di types.ts)
    // Jalankan FFmpeg via Engine
    const processId = ffmpegEngine.startStream(config, visualAsset, audios, (log) => {
        io.to(`stream_${config.id}`).emit('ffmpeg_log', log);
    });

    res.json({ success: true, pid: processId });
});

// Real-time Monitoring via Socket.io
io.on('connection', (socket) => {
    socket.on('join_monitoring', (streamId) => {
        socket.join(`stream_${streamId}`);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`CloudStream Engine running on port ${PORT}`));
