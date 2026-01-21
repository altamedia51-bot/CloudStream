
import React from 'react';
import { Shield, HardDrive, Wifi, Clock, ArrowUpRight } from 'lucide-react';
import { User, Plan, UserUsage, UserStatus } from '../types';

interface UsageOverviewProps {
  user: User;
  plan: Plan;
  usage: UserUsage;
}

const UsageOverview: React.FC<UsageOverviewProps> = ({ user, plan, usage }) => {
  const storagePercentage = Math.min((usage.storageUsedMb / plan.storageLimitMb) * 100, 100);
  const streamPercentage = Math.min((usage.activeStreamsCount / plan.maxActiveStreams) * 100, 100);
  
  const isExpired = user.status === UserStatus.EXPIRED;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/10 p-2 rounded-xl">
            <Shield className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{plan.name} Plan</h3>
            <p className="text-xs text-slate-500">Subscription {user.autoRenew ? 'Auto-renews' : 'Manual'}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Expires On</p>
          <p className={`font-mono text-sm ${isExpired ? 'text-red-500' : 'text-slate-300'}`}>
            {new Date(user.activeUntil).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Storage Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5" /> Storage Used
            </span>
            <span className="text-slate-300 font-medium">{usage.storageUsedMb} MB / {plan.storageLimitMb} MB</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${storagePercentage > 90 ? 'bg-red-500' : 'bg-blue-600'}`} 
              style={{ width: `${storagePercentage}%` }} 
            />
          </div>
        </div>

        {/* Active Streams Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5" /> Active Streams
            </span>
            <span className="text-slate-300 font-medium">{usage.activeStreamsCount} / {plan.maxActiveStreams}</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${streamPercentage >= 100 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
              style={{ width: `${streamPercentage}%` }} 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/50">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mb-1">Max Resolution</p>
          <p className="text-sm font-bold text-slate-200">{plan.maxResolution} @ {plan.maxFps}fps</p>
        </div>
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/50">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mb-1">Max Loop</p>
          <p className="text-sm font-bold text-slate-200">{plan.maxLoopHours} Hours</p>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold transition-all border border-slate-700">
        Upgrade Subscription <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default UsageOverview;
