
import React, { useState } from 'react';
import { 
  CloudUpload, 
  Video, 
  Music, 
  Image as ImageIcon,
  MoreVertical, 
  Trash2, 
  Play, 
  FileText,
  Search,
  Filter
} from 'lucide-react';

const MediaLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'image'>('video');
  const [isUploading, setIsUploading] = useState(false);

  // Mock Data
  const videos = [
    { id: 'v1', name: 'Ambient_Nature.mp4', size: '1.2 GB', duration: '12:05', date: '2024-05-20' },
    { id: 'v2', name: 'Gaming_Intro.mp4', size: '450 MB', duration: '03:20', date: '2024-05-18' },
  ];

  const audios = [
    { id: 'a1', name: 'Synthwave_Dreams.mp3', size: '12 MB', duration: '05:30', date: '2024-05-21' },
    { id: 'a2', name: 'Night_City_Beats.mp3', size: '15 MB', duration: '06:15', date: '2024-05-21' },
  ];

  const images = [
    { id: 'i1', name: 'Lofi_Girl_Wallpaper.jpg', size: '2.4 MB', resolution: '1920x1080', date: '2024-05-22' },
    { id: 'i2', name: 'Synthwave_Sunset.png', size: '5.1 MB', resolution: '3840x2160', date: '2024-05-23' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Media Library</h2>
          <p className="text-slate-400">Manage your cloud-stored assets for streaming</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700 transition-all">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl font-bold cursor-pointer shadow-lg shadow-blue-600/20 transition-all active:scale-95">
            <CloudUpload className="w-4 h-4" />
            <span>Upload Media</span>
            <input type="file" className="hidden" multiple onChange={() => setIsUploading(true)} />
          </label>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-800 px-8">
          {[
            { id: 'video', label: 'Videos', icon: Video, count: videos.length },
            { id: 'image', label: 'Images', icon: ImageIcon, count: images.length },
            { id: 'audio', label: 'Audios', icon: Music, count: audios.length },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-6 font-bold text-sm transition-all border-b-2 flex items-center gap-3 ${
                activeTab === tab.id ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded-lg opacity-60">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/20">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}s...`}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-950/50 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
                <th className="px-8 py-5">File Name</th>
                <th className="px-6 py-5">Size</th>
                <th className="px-6 py-5">{activeTab === 'image' ? 'Resolution' : 'Duration'}</th>
                <th className="px-6 py-5">Uploaded</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {(activeTab === 'video' ? videos : activeTab === 'image' ? images : audios).map((file: any) => (
                <tr key={file.id} className="group hover:bg-slate-800/20 transition-all cursor-default">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600/10 group-hover:text-blue-400 transition-all">
                        {activeTab === 'video' ? <Video className="w-5 h-5" /> : activeTab === 'image' ? <ImageIcon className="w-5 h-5" /> : <Music className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{file.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Local Storage</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm font-medium">{file.size}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm font-medium">{file.duration || file.resolution}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm font-medium">{file.date}</td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-lg border border-slate-700">
                        <Play className="w-4 h-4 fill-current" />
                      </button>
                      <button className="p-2.5 bg-slate-800 hover:bg-red-500 text-slate-400 hover:text-white rounded-xl transition-all shadow-lg border border-slate-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
