import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { NotificationBell } from './NotificationBell';
import {
  LayoutDashboard,
  ClipboardList,
  FilePlus,
  UserCheck,
  CheckSquare,
  BarChart3,
  LogOut,
  UserPlus,
  Crown,
  Hand,
  UserCheck2,
  Shield,
  Users,
  ActivitySquare,
  Menu,
  X,
} from 'lucide-react';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getRoleDisplay = (role) => {
    switch (role) {
      case 'service_desk':    return 'Service Desk';
      case 'project_manager': return 'Project Manager';
      case 'programmer':      return 'Programmer';
      case 'owner':           return 'Company Owner';
      case 'client':          return 'Client / Reporter';
      case 'admin':           return 'System Administrator';
      default:                return role;
    }
  };

  const getNavigationMenu = (role) => {
    const defaultMenu = [
      { name: 'Dashboard', path: '/',        icon: LayoutDashboard, end: true },
      { name: 'All Tickets', path: '/tickets', icon: ClipboardList,   end: true },
    ];

    switch (role) {
      case 'service_desk':
        return [
          ...defaultMenu,
          { name: 'Eskalasi Tiket',  path: '/tickets/create',  icon: FilePlus  },
          { name: 'Tiket Walk-in',   path: '/tickets/walk-in', icon: UserPlus  },
        ];
      case 'project_manager':
        return [
          ...defaultMenu,
          { name: 'Assign Ticket', path: '/tickets/assign', icon: UserCheck },
          { name: 'Claim Approval', path: '/tickets/claim-approval', icon: UserCheck2 },
        ];
      case 'programmer':
        return [
          ...defaultMenu,
          { name: 'Available', path: '/tickets/available', icon: Hand },
          { name: 'My Tasks', path: '/tickets/tasks', icon: CheckSquare },
        ];
      case 'owner':
        return [
          ...defaultMenu,
          { name: 'Laporan PM', path: '/owner/issues', icon: Crown },
          { name: 'Reports', path: '/reports', icon: BarChart3 },
        ];
      case 'client':
        return [
          { name: 'Dashboard', path: '/',              icon: LayoutDashboard, end: true },
          { name: 'Buat Tiket', path: '/client/create', icon: FilePlus },
          { name: 'Riwayat', path: '/tickets',       icon: ClipboardList,   end: true },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin',              icon: Shield,          end: true },
          { name: 'Pengguna', path: '/admin/users',        icon: Users },
          { name: 'Log', path: '/admin/activity-logs', icon: ActivitySquare },
        ];
      default:
        return defaultMenu;
    }
  };

  const menuItems = getNavigationMenu(user?.role);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // ── Shared NavLink class builder ─────────────────────────────────────────
  const sidebarLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-sm font-bold text-[11px] uppercase tracking-wider transition-all duration-150 border-l-4 outline-none group ${
      isActive
        ? 'bg-primary/5 text-primary [border-left-color:var(--color-primary)]'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 [border-left-color:transparent]'
    }`;

  const bottomNavLinkClass = ({ isActive }) =>
    `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all flex-1 ${
      isActive ? 'text-primary' : 'text-slate-400'
    }`;

  // ── Sidebar inner content (reused for both desktop and drawer) ───────────
  const SidebarContent = () => (
    <>
      <div>
        {/* Logo */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-lg font-extrabold tracking-tight text-slate-900 font-display">
            <span className="text-primary">Ticketing</span>Flow
          </span>
          {/* Close button — only visible in drawer mode */}
          <button
            onClick={() => setDrawerOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 flex flex-col gap-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end ?? false}
                onClick={() => setDrawerOpen(false)}
                className={sidebarLinkClass}
              >
                {({ isActive }) => (
                  <>
                    <IconComponent
                      className={`w-5 h-5 shrink-0 transition-colors ${
                        isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-200/70 flex items-center justify-between gap-3">
        <div
          onClick={() => { navigate('/profile'); setDrawerOpen(false); }}
          title="Pengaturan Profil & Keamanan"
          className="flex items-center gap-2.5 min-w-0 flex-1 p-1.5 -ml-1.5 rounded-lg hover:bg-slate-100/80 transition-colors cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs font-display shrink-0 border border-primary/20 group-hover:scale-105 transition-transform">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-xs font-bold text-slate-900 truncate leading-tight font-display group-hover:text-primary transition-colors">{user?.name}</span>
            <span className="block text-[10px] font-medium text-slate-400 truncate mt-0.5">
              {getRoleDisplay(user?.role)}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          title="Log Out"
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50/80 rounded-md transition-colors cursor-pointer shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas font-sans text-slate-800">

      {/* ── DESKTOP Sidebar (lg and above) ─────────────────────────────────── */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col justify-between shrink-0 shadow-sm text-left">
        <SidebarContent />
      </aside>

      {/* ── TABLET Drawer overlay (md to lg) ────────────────────────────────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          {/* Drawer panel */}
          <aside
            className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col justify-between text-left z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Top bar — only on mobile/tablet (hidden on desktop) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0 shadow-sm">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-base font-extrabold tracking-tight text-slate-900 font-display">
            <span className="text-primary">Ticketing</span>Flow
          </span>
          <div className="flex items-center gap-2">
            <NotificationBell />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-canvas p-4 sm:p-6 lg:p-8 flex flex-col items-stretch
                         pb-20 md:pb-4 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* ── DESKTOP Notification Bell (top-right, only lg+) ──────────────────── */}
      <div className="hidden lg:block fixed top-5 right-8 z-50">
        <NotificationBell />
      </div>

      {/* ── MOBILE Bottom Navigation (hidden on md and above) ────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg">
        <div className="flex items-center justify-around px-2 py-1.5">
          {menuItems.slice(0, 4).map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end ?? false}
                className={bottomNavLinkClass}
              >
                {({ isActive }) => (
                  <>
                    <div className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-primary/10' : ''}`}>
                      <IconComponent className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                    </div>
                    <span className={isActive ? 'text-primary' : 'text-slate-400'}>
                      {item.name.split(' ')[0]}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Profile button on bottom nav */}
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider text-slate-400 transition-all flex-1 cursor-pointer"
          >
            <div className="p-1.5 rounded-lg">
              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-[10px]">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <span>Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
