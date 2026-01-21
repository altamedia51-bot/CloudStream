
import React, { useState } from 'react';
import { 
  Plus, 
  Play, 
  Square, 
  Settings2, 
  Globe, 
  Layers, 
  Clock,
  Youtube,
  Twitch,
  Facebook,
  GripVertical,
  Radio,
  Link,
  Key,
  List,
  Music,
  ShoppingBag,
  AlertCircle,
  XCircle,
  Activity,
  Image as ImageIcon,
  Video as VideoIcon
} from 'lucide-react';
import { UserStatus } from '../types';

// This would normally come from the UserContext or Backend
const mockUserEligibility = {
  status: UserStatus.ACTIVE,
  activeStreams: 3,
  limitStreams: 5,
  storageUsed: 1650,
  storageLimit: 5000,
  activeUntil: '2024-12-31'
};

const StreamManager: React.FC = () => {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const [rtmpUrl, setRtmpUrl] = useState('');
  const [sourceType, setSourceType] = useState<'video' | 'image'>('video');
  const [error, setError] = useState<string | null>(null);
  
  // Mock Active Streams
  const activeStreams = [
    { 
      id: 's1', 
      name: 'Lofi 24/7 Radio', 
      status: 'streaming', 
      destinations: ['YouTube', 'Twitch'],
      uptime: '14:20:11',
      bitrate: '4500 kbps',
      source: 'image'
    }
  ];

  const platforms = [
    { name: 'YouTube', icon: <Youtube className="w-4 h-4 text-red-500" />, url: 'rtmp://a.rtmp.youtube.com/live2' },
    { name: 'Facebook', icon: <Facebook className="w-4 h-4 text-blue-600" />, url: 'rtmps://live-api-s.facebook.com:443/rtmp/' },
    { name: 'TikTok', icon: <Music className="w-4 h-4 text-white" />, url: 'rtmp://open-rtmp.tiktok.com/stage/' },
    { name: 'Shopee Live', icon: <ShoppingBag className="w-4 h-4 text-orange-500" />, url: 'rtmp://live.shopee.co.id/live/' },
  ];

  const handleStartConfig = () => {
    if (mockUserEligibility.status !== UserStatus.ACTIVE) {
      setError("Account expired. Please renew your subscription.");
      return;
    }
    if (mockUserEligibility.activeStreams >= mockUserEligibility.limitStreams) {
      setError(`Stream limit reached (${mockUserEligibility.activeStreams}/${mockUserEligibility.limitStreams}). Upgrade your plan.`);
      return;
    }
    setError(null);
    setIsConfiguring(true);
  };

  const selectPlatform = (url: string) => {
    setRtmpUrl(url);
    setShowPlatformDropdown(false);
  };

  if (isConfiguring) {
    return (
      <div className="space-y-8 animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Configure Stream</h2>
          <button 
            onClick={() => setIsConfiguring(false)}
            className="text-slate-400 hover:text-white bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 transition-all"
          >
            Cancel
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Config */}
          <div className="space-y-6">
            <section className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-8 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <Layers className="w-5 h-5 text-blue-500" />
                  Media Selection
                </h3>
                
                <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
                  <button 
                    onClick={() => setSourceType('video')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${sourceType === 'video' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <VideoIcon className="w-3.5 h-3.5" /> Video
                  </button>
                  <button 
                    onClick={() => setSourceType('image')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${sourceType === 'image' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> Image
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">Primary {sourceType === 'video' ? 'Video' : 'Static Image'}</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-blue-600 outline-none text-slate-200">
                    {sourceType === 'video' ? (
                      <>
                        <option>Ambient_Nature.mp4</option>
                        <option>Gaming_Intro.mp4</option>
                      </>
                    ) : (
                      <>
                        <option>Lofi_Girl_Wallpaper.jpg</option>
                        <option>Synthwave_Sunset.png</option>
                      </>
                    )}
                  </select>
                  <p className="mt-2 text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 
                    {sourceType === 'video' ? 'Video will loop infinitely' : 'Image will display as a static 24/7 background'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">Audio Playlist (Concatenated Loop)</label>
                  <div className="space-y-3 bg-slate-950/50 border border-slate-800 border-dashed rounded-3xl p-6">
                    {[
                      'Synthwave_Dreams.mp3',
                      'Night_City_Beats.mp3'
                    ].map((audio, i) => (
                      <div key={i} className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 group hover:border-blue-600/30 transition-all">
                        <GripVertical className="w-4 h-4 text-slate-700 group-hover:text-blue-500 transition-colors" />
                        <Music className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium flex-1">{audio}</span>
                        <button className="text-slate-600 hover:text-red-400 transition-colors">&times;</button>
                      </div>
                    ))}
                    <button className="w-full py-4 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-3 mt-4">
                      <Plus className="w-4 h-4" /> Add Audio Track
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-6 shadow-xl">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Globe className="w-5 h-5 text-purple-500" />
                Stream Target
              </h3>
              
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <Link className="w-5 h-5" />
                  </div>
                  <input 
                    type="text" 
                    value={rtmpUrl}
                    onChange={(e) => setRtmpUrl(e.target.value)}
                    placeholder="Server RTMP URL"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  />
                  <button 
                    onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    <List className="w-5 h-5" />
                  </button>

                  {showPlatformDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                      {platforms.map((platform) => (
                        <button
                          key={platform.name}
                          onClick={() => selectPlatform(platform.url)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-all text-left"
                        >
                          {platform.icon}
                          <span className="font-bold">{platform.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <Key className="w-5 h-5" />
                  </div>
                  <input 
                    type="password" 
                    placeholder="Stream Key"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
             <section className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] space-y-8 shadow-xl">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Settings2 className="w-5 h-5 text-amber-500" />
                FFmpeg Engine Tuning
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-black mb-2">Resolution</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm">
                    <option>1920x1080 (1080p)</option>
                    <option>1280x720 (720p)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-black mb-2">FPS</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm">
                    <option>60 FPS</option>
                    <option>30 FPS</option>
                    <option>15 FPS (Radio Mode)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-black mb-2">Video Bitrate</label>
                  <input type="text" defaultValue={sourceType === 'image' ? '2500k' : '6500k'} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-black mb-2">Audio Bitrate</label>
                  <input type="text" defaultValue="320k" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm" />
                </div>
              </div>

              {sourceType === 'image' && (
                <div className="bg-blue-600/10 border border-blue-600/20 p-4 rounded-2xl flex items-start gap-3">
                  <Settings2 className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-bold text-blue-400">Still-Image Optimization</p>
                    <p className="text-xs text-slate-400">The engine will automatically apply <code className="text-slate-200">-tune stillimage</code> to reduce CPU overhead for your 24/7 radio.</p>
                  </div>
                </div>
              )}
            </section>

            <button 
              onClick={() => setIsConfiguring(false)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-[2rem] transition-all shadow-xl shadow-blue-600/30 text-xl flex items-center justify-center gap-4 active:scale-[0.98]"
            >
              <Play className="w-7 h-7 fill-current" />
              Launch to VPS
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Stream Manager</h2>
          <p className="text-slate-400">Control active FFmpeg processes and schedules</p>
        </div>
        <button 
          onClick={handleStartConfig}
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Stream</span>
        </button>
      </div>

      {error && (
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-center justify-between text-amber-500">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <span className="font-bold text-sm">{error}</span>
          </div>
          <button onClick={() => setError(null)} className="hover:text-white"><XCircle className="w-4 h-4" /></button>
        </div>
      )}

      {activeStreams.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {activeStreams.map((stream) => (
            <div key={stream.id} className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[100px]" />
              
              <div className="w-full md:w-64 aspect-video bg-slate-950 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden border border-slate-800 shadow-inner">
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest animate-pulse shadow-lg z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  Live
                </div>
                {stream.source === 'image' ? (
                  <ImageIcon className="w-12 h-12 text-slate-800 mb-2" />
                ) : (
                  <VideoIcon className="w-12 h-12 text-slate-800 mb-2" />
                )}
                <span className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">
                  {stream.source === 'image' ? 'Static Background' : 'Looping Video'}
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-bold">{stream.name}</h3>
                  <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-3 py-1 rounded-lg uppercase tracking-[0.2em] font-black border border-emerald-500/20">Operational</span>
                </div>
                <div className="flex flex-wrap gap-5 text-slate-400 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Uptime: {stream.uptime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-500" />
                    <span>{stream.destinations.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <span>{stream.bitrate} (Stable)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="p-5 bg-slate-800 hover:bg-slate-700 rounded-3xl border border-slate-700 transition-all shadow-lg group-hover:border-slate-500">
                  <Settings2 className="w-6 h-6 text-slate-400 group-hover:text-white" />
                </button>
                <button className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-8 py-5 rounded-[2rem] font-black transition-all shadow-xl shadow-red-500/20 active:scale-95">
                  <Square className="w-5 h-5 fill-current" />
                  <span>Stop Stream</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 border-dashed p-20 rounded-[4rem] text-center shadow-inner">
          <div className="w-24 h-24 bg-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Radio className="w-10 h-10 text-slate-500" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-slate-200">System Ready</h3>
          <p className="text-slate-500 max-w-sm mx-auto font-medium">Connect your video or image assets to begin 24/7 server-side broadcasting.</p>
        </div>
      )}
    </div>
  );
};

export default StreamManager;
