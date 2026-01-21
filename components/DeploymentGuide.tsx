
import React from 'react';
import { Terminal, Copy, CheckCircle, Server, Code, Database, ShieldCheck, Users, ImageIcon } from 'lucide-react';

const DeploymentGuide: React.FC = () => {
  const codeBlocks = {
    sql: `CREATE TABLE plans (
  id TEXT PRIMARY KEY,
  name TEXT,
  max_active_streams INTEGER,
  max_loop_hours INTEGER,
  storage_limit_mb INTEGER
);

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT DEFAULT 'user',
  status TEXT DEFAULT 'active',
  active_until DATETIME,
  last_login_at DATETIME
);

CREATE TABLE images (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  filename TEXT,
  resolution TEXT,
  size_bytes INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE user_usage (
  user_id TEXT PRIMARY KEY,
  storage_used_mb INTEGER DEFAULT 0,
  active_streams INTEGER DEFAULT 0,
  FOREIGN KEY(user_id) REFERENCES users(id)
);`,

    middleware: `// Middleware: roleMiddleware.js
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const { role, status } = req.user;

    if (status !== 'active') {
      return res.status(403).json({ error: "Account suspended or inactive." });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: "Insufficient permissions." });
    }

    next();
  };
};`,

    imageFFmpeg: `// Concept for Image + Audio Playlist
ffmpeg -loop 1 -re -i background.jpg \\
-i audio_playlist.m3u8 \\
-tune stillimage \\
-c:v libx264 -preset veryfast \\
-c:a aac -b:a 192k \\
-f flv rtmp://server/key`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
      <header className="text-center space-y-4">
        <div className="inline-flex p-4 bg-blue-600/10 rounded-3xl border border-blue-600/20 mb-4 shadow-xl">
          <ShieldCheck className="w-10 h-10 text-blue-500" />
        </div>
        <h2 className="text-4xl font-black tracking-tight text-white">Streaming Architecture v2.5</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
          Unified blueprint for Video loops and Image-to-Audio persistent broadcasts.
        </p>
      </header>

      <div className="space-y-10">
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center font-black text-blue-400 shadow-lg border border-slate-700">1</div>
            <h3 className="text-2xl font-bold">Relational Schema Update</h3>
          </div>
          <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
            <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">migrations/schema_plus_images.sql</span>
              <button onClick={() => copyToClipboard(codeBlocks.sql)} className="text-slate-500 hover:text-white transition-all bg-slate-800 p-2 rounded-lg">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <pre className="p-8 font-mono text-sm text-blue-300 overflow-x-auto leading-relaxed">
              <code>{codeBlocks.sql}</code>
            </pre>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center font-black text-emerald-400 shadow-lg border border-slate-700">2</div>
            <h3 className="text-2xl font-bold">Static Image Optimization</h3>
          </div>
          <p className="text-slate-400 font-medium">Applying <code className="text-blue-400">-tune stillimage</code> allows the x264 encoder to maximize compression efficiency for non-moving content.</p>
          <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
             <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">ffmpeg/logic_radio.sh</span>
              <button onClick={() => copyToClipboard(codeBlocks.imageFFmpeg)} className="text-slate-500 hover:text-white transition-all bg-slate-800 p-2 rounded-lg">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <pre className="p-8 font-mono text-sm text-emerald-300 overflow-x-auto leading-relaxed">
              <code>{codeBlocks.imageFFmpeg}</code>
            </pre>
          </div>
        </section>

        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-slate-800 p-10 rounded-[3rem] flex items-start gap-8 shadow-2xl">
          <div className="bg-blue-600 p-5 rounded-[2rem] shadow-xl shadow-blue-600/30">
            <ImageIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="text-white font-black text-xl mb-3 uppercase tracking-tight">Feature: Still-Image Streaming</h4>
            <p className="text-sm text-slate-400 mb-6 font-medium leading-relaxed">Users can now upload branding assets and combine them with multiple audio tracks to create a highly stable, low-latency 24/7 radio experience without the processing overhead of moving video.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Automatic -loop 1 insertion',
                'Reduced V-Bitrate overhead',
                'Lossless audio passthrough options',
                'Still-image frame decimation',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-slate-300 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentGuide;
