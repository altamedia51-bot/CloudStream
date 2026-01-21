
import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Database, 
  Activity, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  Terminal,
  RefreshCcw
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Monitoring: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    "[10:00:01] FFmpeg process started (PID: 2341)",
    "[10:00:03] Loading complex filter: concat=n=2:v=0:a=1",
    "[10:00:05] Successfully connected to rtmp://youtube.com/live",
    "[10:00:06] Bitrate stable at 6450 kbps",
    "[10:05:00] Switched to next audio track: Synthwave_Dreams.mp3"
  ]);

  const [stats, setStats] = useState({
    cpu: 45,
    ram: 2.1,
    bitrate: 6540,
    uptime: '14:20:11'
  });

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        cpu: Math.floor(40 + Math.random() * 15),
        bitrate: Math.floor(6400 + Math.random() * 200)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Real-time Monitoring</h2>
          <p className="text-slate-400">Live system performance and FFmpeg logs</p>
        </div>
        <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <RefreshCcw className="w-4 h-4" />
          <span>Refresh stats</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Main Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <Cpu className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Optimal</span>
              </div>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">CPU Usage</p>
              <h3 className="text-3xl font-bold mt-1 font-mono">{stats.cpu}%</h3>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${stats.cpu}%` }} />
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500/10 p-2 rounded-lg">
                  <Database className="w-5 h-5 text-purple-500" />
                </div>
                <span className="text-slate-500 text-xs font-bold">2.1 GB / 8 GB</span>
              </div>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Memory Leakage</p>
              <h3 className="text-3xl font-bold mt-1 font-mono">None</h3>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="bg-purple-500 h-full w-[26%]" />
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-emerald-500/10 p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-emerald-500" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Outgoing Bitrate</p>
              <h3 className="text-3xl font-bold mt-1 font-mono">{stats.bitrate} <span className="text-sm">kbps</span></h3>
              <p className="text-xs text-slate-500 mt-4">Stable stream health index: 98.4%</p>
            </div>
          </div>

          {/* Log Window */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-500" />
                <h3 className="font-bold text-sm text-slate-300">FFmpeg Output Console</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-emerald-500 font-medium">Socket Connected</span>
              </div>
            </div>
            <div className="bg-[#050810] rounded-2xl p-6 font-mono text-sm h-[300px] overflow-y-auto space-y-2 border border-slate-900">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-slate-700 whitespace-nowrap">{log.split(']')[0]}]</span>
                  <span className={log.includes('error') ? 'text-red-400' : log.includes('PID') ? 'text-blue-400' : 'text-slate-400'}>
                    {log.split(']')[1]}
                  </span>
                </div>
              ))}
              <div className="flex gap-4 animate-pulse">
                <span className="text-slate-700 whitespace-nowrap">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-slate-400">Waiting for next frame metadata...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Health Check Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-6">Process Health</h4>
            <div className="space-y-4">
              {[
                { name: 'FFmpeg Core', status: 'healthy' },
                { name: 'Node.js API', status: 'healthy' },
                { name: 'Cron Scheduler', status: 'healthy' },
                { name: 'Socket Server', status: 'healthy' },
                { name: 'Database (SQLite)', status: 'healthy' },
                { name: 'PM2 Watchdog', status: 'healthy' },
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{service.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-600/20">
            <h4 className="font-bold text-lg mb-2">Need Help?</h4>
            <p className="text-sm text-blue-100 opacity-80 mb-6">Our system detected a slight spike in your last 1080p stream. Consider increasing your VPS memory.</p>
            <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-2xl text-sm transition-transform active:scale-95">
              Read Docs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
