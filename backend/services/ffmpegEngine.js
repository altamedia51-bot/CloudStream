
const { spawn } = require('child_process');
const fs = require('fs');

/**
 * CloudStream Pro - FFmpeg Execution Engine
 * Mengonversi config dari UI menjadi proses nyata di VPS
 */
const startStream = (config, visualAsset, audios, logCallback) => {
    const { sourceType, settings, destinations, loopMode } = config;
    
    let args = [];

    // 1. Visual Input
    if (sourceType === 'video') {
        if (loopMode !== 'none') args.push('-stream_loop', '-1');
        args.push('-re', '-i', `uploads/videos/${visualAsset.filename}`);
    } else {
        // Feature: Image + MP3 Loop
        args.push('-loop', '1', '-re', '-i', `uploads/images/${visualAsset.filename}`);
    }

    // 2. Audio Inputs (Playlist handling)
    audios.forEach(audio => {
        args.push('-i', `uploads/audios/${audio.filename}`);
    });

    // 3. Audio Filter (Concatenation)
    if (audios.length > 1) {
        let filter = "";
        audios.forEach((_, i) => filter += `[${i + 1}:a]`);
        args.push('-filter_complex', `${filter}concat=n=${audios.length}:v=0:a=1[aout]`);
        args.push('-map', '0:v', '-map', '[aout]');
    } else {
        args.push('-map', '0:v', '-map', '1:a');
    }

    // 4. Encoding Settings
    const tune = sourceType === 'image' ? 'stillimage' : 'zerolatency';
    args.push(
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        '-tune', tune,
        '-b:v', settings.videoBitrate,
        '-maxrate', settings.videoBitrate,
        '-bufsize', '4M',
        '-pix_fmt', 'yuv420p',
        '-s', settings.resolution,
        '-r', settings.fps,
        '-c:a', 'aac',
        '-b:a', settings.audioBitrate,
        '-ar', '44100'
    );

    // 5. Multi-platform Output (RTMP)
    if (destinations.length > 1) {
        const teeMap = destinations.map(d => `[f=flv]${d.rtmpUrl}/${d.streamKey}`).join('|');
        args.push('-f', 'tee', teeMap);
    } else {
        args.push('-f', 'flv', `${destinations[0].rtmpUrl}/${destinations[0].streamKey}`);
    }

    // SPAWN PROCESS
    const ffmpeg = spawn('ffmpeg', args);

    ffmpeg.stderr.on('data', (data) => {
        logCallback(data.toString());
    });

    ffmpeg.on('close', (code) => {
        logCallback(`Process exited with code ${code}`);
    });

    return ffmpeg.pid;
};

module.exports = { startStream };
