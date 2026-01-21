
import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  MoreHorizontal, 
  Shield, 
  User as UserIcon,
  Ban,
  CheckCircle,
  Edit,
  Trash2,
  Filter,
  Activity
} from 'lucide-react';
import { User, UserRole, UserStatus } from '../types';

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mockUsers, setMockUsers] = useState<User[]>([
    {
      id: 'usr_1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      activeUntil: '2025-12-31',
      planId: 'pro_monthly',
      autoRenew: true,
      createdAt: '2024-01-15',
      lastLoginAt: '2024-05-22T10:00:00Z'
    },
    {
      id: 'usr_2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      activeUntil: '2024-06-15',
      planId: 'pro_monthly',
      autoRenew: false,
      createdAt: '2024-02-20',
      lastLoginAt: '2024-05-21T18:45:00Z'
    },
    {
      id: 'usr_3',
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      role: UserRole.USER,
      status: UserStatus.SUSPENDED,
      activeUntil: '2024-12-31',
      planId: 'starter_monthly',
      autoRenew: true,
      createdAt: '2024-03-10',
      lastLoginAt: '2024-05-01T09:12:00Z'
    }
  ]);

  const toggleUserStatus = (id: string) => {
    setMockUsers(prev => prev.map(u => {
      if (u.id === id) {
        return { 
          ...u, 
          status: u.status === UserStatus.ACTIVE ? UserStatus.SUSPENDED : UserStatus.ACTIVE 
        };
      }
      return u;
    }));
  };

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">User Management</h2>
          <p className="text-slate-400">Manage access control and platform accounts</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all">
          <UserPlus className="w-5 h-5" />
          <span>Add New User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Users', value: mockUsers.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Active Streams', value: '12', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Suspended', value: mockUsers.filter(u => u.status === UserStatus.SUSPENDED).length, icon: Ban, color: 'text-red-500', bg: 'bg-red-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700 text-sm transition-all">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>Advanced Filters</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-950/50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                <th className="px-8 py-5">Identity</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Subscription</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-800/20 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      user.role === UserRole.ADMIN ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                    }`}>
                      {user.role === UserRole.ADMIN ? <Shield className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-slate-300">Until {new Date(user.activeUntil).toLocaleDateString()}</p>
                    <p className="text-[10px] text-slate-500 uppercase">Plan: {user.planId}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`flex items-center gap-2 text-xs font-bold ${
                      user.status === UserStatus.ACTIVE ? 'text-emerald-500' : 
                      user.status === UserStatus.SUSPENDED ? 'text-red-500' : 'text-slate-500'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        user.status === UserStatus.ACTIVE ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                        user.status === UserStatus.SUSPENDED ? 'bg-red-500' : 'bg-slate-500'
                      }`} />
                      {user.status.toUpperCase()}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => toggleUserStatus(user.id)}
                        className={`p-2 rounded-lg border border-slate-800 transition-all ${
                          user.status === UserStatus.ACTIVE ? 'text-red-400 hover:bg-red-500/10' : 'text-emerald-400 hover:bg-emerald-500/10'
                        }`}
                        title={user.status === UserStatus.ACTIVE ? 'Suspend User' : 'Activate User'}
                      >
                        {user.status === UserStatus.ACTIVE ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white rounded-lg border border-slate-800 hover:bg-slate-800 transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-400 rounded-lg border border-slate-800 hover:bg-red-500/10 transition-all">
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

export default UserManagement;
