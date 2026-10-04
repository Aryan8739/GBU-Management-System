import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { Briefcase, Settings, LogOut, Bell, ChevronRight, ClipboardList, FilePlus2 } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useState } from 'react'
import { BrandMark } from '../components/layout/BrandMark'

export function StaffLayout() {
  const logout = useAuthStore(state => state.logout)
  const user = useAuthStore(state => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const [notifOpen, setNotifOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { name: 'Dashboard', path: '/staff', icon: Briefcase, exact: true },
    { name: 'Report an issue', path: '/staff/register', icon: FilePlus2, exact: false },
    { name: 'Request history', path: '/staff/history', icon: ClipboardList, exact: false },
    { name: 'Settings', path: '/staff/settings', icon: Settings, exact: false },
  ]

  const initials = user?.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'SF'

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex" style={{ fontFamily: "'Atkinson Hyperlegible', 'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet" />

      {/* Sidebar */}
      <aside className="hidden w-64 bg-white border-r border-slate-200 md:flex flex-col shadow-sm fixed h-full z-20">
        <div className="h-16 flex items-center px-5 border-b border-slate-100 gap-3">
          <BrandMark />
          <div>
            <div className="text-sm font-bold text-slate-900 leading-none">GBU CMS</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Staff Portal</div>
          </div>
        </div>

        {/* User Card */}
        <div className="mx-4 mt-5 mb-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm border border-[#2563EB]">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900 truncate">{user?.name || 'Campus Staff'}</div>
              <div className="text-[10px] text-[#3B82F6] font-bold uppercase tracking-wide">Staff</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Management</div>
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30 ${
                  isActive ? 'bg-[#3B82F6] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} />
                  <span className="text-sm font-bold">{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500/30"
          >
            <LogOut className="w-4 h-4 opacity-70" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 md:ml-64">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-base font-bold text-slate-900">
              {navItems.find(i => i.exact ? location.pathname === i.path : location.pathname.startsWith(i.path))?.name || 'Dashboard'}
            </h1>
            <p className="text-[11px] text-slate-400 font-semibold tracking-wide uppercase">GBU CMS / Staff Area</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setNotifOpen(o => !o)}
                aria-label="View notifications"
                className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <Bell className="w-4 h-4 text-slate-600" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-11 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">Notifications</span>
                    <button className="text-xs text-[#3B82F6] font-bold hover:underline focus:outline-none">Clear</button>
                  </div>
                  <div className="px-4 py-8 text-center text-slate-500 text-sm font-medium">
                    No new notifications
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <nav aria-label="Staff navigation" className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 md:hidden">
          {navItems.map(item => <Link key={item.path} to={item.path} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${location.pathname === item.path ? 'bg-blue-700 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>{item.name}</Link>)}
          <button onClick={handleLogout} className="ml-auto shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Sign out</button>
        </nav>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
