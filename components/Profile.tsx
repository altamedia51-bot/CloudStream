
import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Clock, 
  Key,
  Save,
  AlertCircle,
  Activity
} from 'lucide-react';
import { User, UserRole, UserStatus } from '../types';

interface ProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API delay
    setTimeout(() => {
      onUpdateUser({ ...user, name, email });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold">Account Settings</h2>
        <p className="text-slate-400">Manage your personal identity and platform security</p>
      </header>

      {showSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 text-emerald-500 animate-in zoom-in-95">
          <ShieldCheck className="w-5 h-5" />
          <span className="font-medium text-sm">Profile updated successfully.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-blue-500" />
              Profile Identity
            </h3>
            
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving Changes...' : 'Save Profile'}</span>
                </button>
              </div>
            </form>
          </section>

          <section className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-500" />
              Security & Password
            </h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                <p className="text-sm text-slate-400">Passwords must be at least 8 characters long and contain both numbers and letters.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">New Password</label>
                    <input type="password" placeholder="New Password" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Confirm New Password</label>
                    <input type="password" placeholder="Confirm Password" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3 rounded-xl transition-all border border-slate-700">
                <Key className="w-4 h-4" />
                <span>Update Password</span>
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Status & Info */}
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl text-center">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-800 shadow-xl mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-slate-400">
              {user.name.charAt(0)}
            </div>
            <h4 className="text-xl font-bold">{user.name}</h4>
            <p className="text-slate-500 text-sm mb-6">{user.email}</p>
            
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${
              user.status === UserStatus.ACTIVE ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}>
              <ShieldCheck className="w-4 h-4" />
              Account {user.status}
            </div>

            <div className="pt-6 border-t border-slate-800 grid grid-cols-1 gap-4 text-left">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Member Since</p>
                  <p className="text-sm font-bold">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Fixed missing Activity icon import */}
                <Activity className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Last Login</p>
                  <p className="text-sm font-bold">Today, 10:45 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
