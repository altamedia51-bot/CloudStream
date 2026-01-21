
import React from 'react';
import { User, UserStatus, Plan, UserUsage } from '../types';
import UsageOverview from './UsageOverview';
import { 
  Play, 
  Server, 
  Wifi, 
  Cpu, 
  HardDrive, 
  Clock,
  Plus,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { time: '12:00', cpu: 45, ram: 30 },
  { time: '13:00', cpu: 52, ram: 32 },
  { time: '14:00', cpu: 48, ram: 31 },
  { time: '15:00', cpu: 70, ram: 45 },
  { time: '16:00', cpu: 65, ram: 44 },
  { time: '17:00', cpu: 58, ram: 40 },
  { time: '18:00', cpu: 62, ram: 42 },
];

// Mock Plan & Usage Data
const mockPlan: Plan = {
  id: 'pro_monthly',
  name: 'Pro Streaming',
  durationHours: 720,
  maxActiveStreams: 5,
  maxLoopHours: 24,
  maxAudioTracks: 10,
  maxPlatforms: 3,
  maxResolution: '1080p',
  maxFps: 60,
  storageLimitMb: 5000,
  price: 29
};

const mockUsage: UserUsage = {
  userId: 'usr_1',
  storageUsedMb: 1650,
  activeStreamsCount: 3,
  totalStreamHoursThisMonth: 142
};

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const isExpired = user.status === UserStatus.EXPIRED;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {isExpired && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-4 text-red-500 animate-pulse">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <p className="font-bold">Subscription Expired</p>
            <p className="text-sm opacity-80">Your streaming services have been suspended. Please renew to resume.</p>
          </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, {user.name} 👋</h2>
          <p className="text-slate-400 mt-1">System is healthy. {mockUsage.activeStreamsCount} active streams running.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700 transition-all text-sm">
            <Server className="w-4 h-4" />
            <span>VPS Console</span>
          </button>
          <button 
            disabled={isExpired}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold shadow-lg transition-all text-sm ${
              isExpired ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>New Stream</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Active Streams', value: `${mockUsage.activeStreamsCount}/${mockPlan.maxActiveStreams}`, icon: Wifi, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { label: 'Total Uptime', value: '15d 4h', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Performance Chart */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">System Performance</h3>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-blue-500" />
                 <span className="text-xs text-slate-400">CPU Load</span>
              </div>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Usage Overview Sidebar */}
        <div className="space-y-8">
          <UsageOverview user={user} plan={mockPlan} usage={mockUsage} />
          
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col">
            <h3 className="text-xl font-bold mb-6">Active Channels</h3>
            <div className="space-y-4 flex-1">
              {[
                { name: 'Lofi Beats 24/7', platform: 'YouTube, Twitch' },
                { name: 'Documentary Loop', platform: 'Facebook' },
              ].map((stream, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800/50 hover:bg-slate-800/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <p className="font-semibold text-sm group-hover:text-blue-400 transition-colors">{stream.name}</p>
                      <p className="text-xs text-slate-500">{stream.platform}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
