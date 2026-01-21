
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Radio, 
  Activity, 
  Terminal, 
  LogOut, 
  Layers,
  Users,
  UserCircle
} from 'lucide-react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import MediaLibrary from './components/MediaLibrary';
import StreamManager from './components/StreamManager';
import Monitoring from './components/Monitoring';
import DeploymentGuide from './components/DeploymentGuide';
import UserManagement from './components/UserManagement';
import Profile from './components/Profile';
import { User, UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Persistence check (simulated)
  useEffect(() => {
    const savedUser = localStorage.getItem('cs_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cs_user');
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!user) {
    return <Auth onAuthSuccess={(u) => {
      setUser(u);
      localStorage.setItem('cs_user', JSON.stringify(u));
    }} />;
  }

  const renderContent = () => {
    const isAdmin = user.role === UserRole.ADMIN;

    switch (activeTab) {
      case 'dashboard': return <Dashboard user={user} />;
      case 'media': return <MediaLibrary />;
      case 'streams': return <StreamManager />;
      case 'monitoring': return <Monitoring />;
      case 'users': 
        return isAdmin ? <UserManagement /> : <Dashboard user={user} />;
      case 'profile': return <Profile user={user} onUpdateUser={(u) => {
        setUser(u);
        localStorage.setItem('cs_user', JSON.stringify(u));
      }} />;
      case 'docs': 
        return isAdmin ? <DeploymentGuide /> : <Dashboard user={user} />;
      default: return <Dashboard user={user} />;
    }
  };

  // Define navigation items based on user role
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'media', label: 'Media Library', icon: Layers },
    { id: 'streams', label: 'Stream Manager', icon: Radio },
    { id: 'monitoring', label: 'Real-time Stats', icon: Activity },
    { id: 'profile', label: 'Profile Settings', icon: UserCircle },
    ...(user.role === UserRole.ADMIN ? [
      { id: 'users', label: 'User Management', icon: Users },
      { id: 'docs', label: 'Deployment Guide', icon: Terminal }
    ] : []),
  ];

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-200 font-sans">
      {/* Sidebar */}
      <aside className={`bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col z-20 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
            <Radio className="w-6 h-6 text-white" />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">CloudStream</span>}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-600/30' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
              {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold border border-slate-700 shadow-inner">
              {user.name.charAt(0)}
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="font-bold truncate text-sm text-slate-200">{user.name}</p>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${user.role === UserRole.ADMIN ? 'bg-amber-500' : 'bg-blue-500'}`} />
                  <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.1em]">{user.role}</p>
                </div>
              </div>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 font-semibold"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="text-sm">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[#0a0f1d] scroll-smooth">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
