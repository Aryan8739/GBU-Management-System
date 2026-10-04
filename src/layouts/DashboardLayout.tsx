import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, History, LogOut, Bell, ChevronRight, GraduationCap } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useState } from 'react'
import { BrandMark } from '../components/layout/BrandMark'

export function DashboardLayout() {
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
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Register Complaint', path: '/dashboard/register', icon: PlusCircle, exact: false },
    { name: 'My Complaints', path: '/dashboard/history', icon: History, exact: false },
  ]

  const notifications = [
    { id: 1, text: 'Your complaint #C-1002 has been assigned to a technician.', time: '2h ago', read: false },
    { id: 2, text: 'Complaint #C-1001 status updated to Verified.', time: '1d ago', read: true },
  ]
  const unreadCount = notifications.filter(n => !n.read).length

  const initials = user?.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'ST'

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex" style={{ fontFamily: "'Atkinson Hyperlegible', 'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet" />

      {/* Sidebar */}
      <aside className="hidden w-64 bg-white border-r border-slate-200 md:flex flex-col shadow-sm fixed h-full z-20">
        {/* Brand */}
        <div className="h-16 flex items-center px-5 border-b border-slate-100 gap-3">
          <BrandMark />
          <div>
            <div className="text-sm font-bold text-slate-900 leading-none">GBU CMS</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Student Portal</div>
          </div>
        </div>

        {/* User Card */}
        <div className="mx-4 mt-5 mb-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900 truncate">{user?.name || 'Student'}</div>
              <div className="text-[10px] text-primary font-medium uppercase tracking-wide">Student</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Main Menu</div>
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${
                  isActive
                    ? 'bg-primary text-white shadow-sm shadow-primary/30'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium">{item.name}</span>
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
            className="flex items-center gap-3 w-full px-3 py-2.5 text-slate-500 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 md:ml-64">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-base font-bold text-slate-900">
              {navItems.find(i => i.exact ? location.pathname === i.path : location.pathname.startsWith(i.path))?.name || 'Dashboard'}
            </h1>
            <p className="text-xs text-slate-400">GBU Campus Maintenance System</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(o => !o)}
                className="relative w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <Bell className="w-4 h-4 text-slate-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-11 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Notifications</span>
                    <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} className={`px-4 py-3 border-b border-slate-50 flex gap-3 ${!n.read ? 'bg-primary/5' : ''}`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-primary' : 'bg-slate-300'}`} />
                      <div>
                        <p className="text-xs text-slate-700 leading-relaxed">{n.text}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                {initials}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-slate-800 leading-none">{user?.name || 'Student'}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" /> Student
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav aria-label="Student navigation" className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 md:hidden">
          {navItems.map(item => <Link key={item.path} to={item.path} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${location.pathname === item.path ? 'bg-primary text-white' : 'text-slate-700 hover:bg-slate-100'}`}>{item.name}</Link>)}
          <button onClick={handleLogout} className="ml-auto shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Sign out</button>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
