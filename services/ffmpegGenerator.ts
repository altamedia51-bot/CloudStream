
import { StreamConfig, MediaFile } from '../types';

/**
 * Generates the FFmpeg command string for the VPS to execute.
 * This version supports both Video loops and Image-to-Video static loops.
 */
export const generateFFmpegCommand = (
  config: StreamConfig, 
  visualAsset: MediaFile, 
  audios: MediaFile[]
): string => {
  const { settings, destinations, loopMode, sourceType } = config;
  
  // 1. Visual Input Selection
  let visualInput = '';
  if (sourceType === 'video') {
    const videoLoop = loopMode !== 'none' ? '-stream_loop -1' : '';
    visualInput = `${videoLoop} -re -i uploads/videos/${visualAsset.filename}`;
  } else {
    // For images, we use -loop 1 to turn a single image into a stream
    // -re ensures it flows at real-time speed
    visualInput = `-loop 1 -re -i uploads/images/${visualAsset.filename}`;
  }
  
  // 2. Input Audios
  const audioInputs = audios
    .map((a) => `-i uploads/audios/${a.filename}`)
    .join(' ');

  // 3. Complex Filter for Audio Concatenation
  const audioCount = audios.length;
  const filterComplex = audioCount > 1 
    ? ` -filter_complex "${audios.map((_, i) => `[${i + 1}:a]`).join('')}concat=n=${audioCount}:v=0:a=1[aout]"`
    : '';
  const audioMap = audioCount > 1 ? '-map "[aout]"' : (audioCount === 1 ? '-map 1:a' : '-map 0:a');

  // 4. Output Settings & Optimization
  // -tune stillimage is critical for image-based streams to save VPS CPU
  const tune = sourceType === 'image' ? '-tune stillimage' : '-tune zerolatency';
  
  const outputSettings = `-c:v libx264 -preset veryfast ${tune} -b:v ${settings.videoBitrate} -maxrate ${settings.videoBitrate} -bufsize 4M -pix_fmt yuv420p -s ${settings.resolution} -r ${settings.fps} -c:a aac -b:a ${settings.audioBitrate} -ar 44100`;

  // 5. Multi-Platform Output
  const teeOutputs = destinations.length > 1
    ? `-f tee -map 0:v ${audioMap} "${destinations.map(d => `[f=flv]${d.rtmpUrl}/${d.streamKey}`).join('|')}"`
    : `-f flv "${destinations[0].rtmpUrl}/${destinations[0].streamKey}"`;

  return `ffmpeg ${visualInput} ${audioInputs} ${filterComplex} -map 0:v ${audioMap} ${outputSettings} ${teeOutputs}`;
};
