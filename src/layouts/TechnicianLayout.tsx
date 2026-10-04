import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Bell, Briefcase, CalendarDays, ChevronRight, LogOut } from 'lucide-react'
import { BrandMark } from '../components/layout/BrandMark'
import { useAuthStore } from '../store/useAuthStore'

const navItems = [
  { name: 'My tasks', path: '/technician', icon: Briefcase, exact: true },
  { name: 'Schedule', path: '/technician#schedule', icon: CalendarDays, exact: false },
]

export function TechnicianLayout() {
  const logout = useAuthStore(state => state.logout)
  const user = useAuthStore(state => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const initials = user?.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'TK'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 md:flex" style={{ fontFamily: "'Atkinson Hyperlegible', 'Inter', sans-serif" }}>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-slate-200 bg-white shadow-sm md:flex">
        <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-5">
          <BrandMark />
          <div><div className="text-sm font-bold leading-none text-slate-900">GBU CMS</div><div className="mt-1 text-[10px] text-slate-500">Technician Portal</div></div>
        </div>
        <div className="mx-4 mb-3 mt-5 rounded-xl border border-amber-100 bg-amber-50/60 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-700 bg-amber-600 text-sm font-bold text-white">{initials}</div>
            <div className="min-w-0"><div className="truncate text-sm font-semibold text-slate-900">{user?.name || 'Campus Technician'}</div><div className="text-[10px] font-bold uppercase tracking-wide text-amber-700">Technician</div></div>
          </div>
        </div>
        <nav aria-label="Technician navigation" className="flex-1 space-y-1 px-3 py-2">
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Workspace</div>
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = item.exact ? location.pathname === item.path : location.hash === '#schedule'
            return <Link key={item.path} to={item.path} aria-current={isActive ? 'page' : undefined} className={`group flex min-h-11 items-center justify-between rounded-lg px-3 py-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600/40 ${isActive ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              <span className="flex items-center gap-3"><Icon aria-hidden="true" className="h-4 w-4 shrink-0" /><span className="text-sm font-bold">{item.name}</span></span>
              {isActive && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 opacity-70" />}
            </Link>
          })}
        </nav>
        <div className="border-t border-slate-100 p-3"><button onClick={handleLogout} className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"><LogOut aria-hidden="true" className="h-4 w-4" />Sign out</button></div>
      </aside>

      <div className="min-h-screen min-w-0 flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-8">
          <div><h1 className="text-base font-bold text-slate-900">Technician workspace</h1><p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">GBU CMS / Field operations</p></div>
          <div className="relative">
            <button onClick={() => setNotificationsOpen(open => !open)} aria-label="Toggle notifications" aria-expanded={notificationsOpen} className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600/40"><Bell aria-hidden="true" className="h-4 w-4" /></button>
            {notificationsOpen && <div role="status" className="absolute right-0 top-12 w-72 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-xl">You’re all caught up. New assignments will appear here.</div>}
          </div>
        </header>
        <nav aria-label="Technician navigation" className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 md:hidden">
          {navItems.map(item => <Link key={item.path} to={item.path} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${location.hash === '#schedule' && !item.exact || location.hash !== '#schedule' && item.exact ? 'bg-amber-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>{item.name}</Link>)}
          <button onClick={handleLogout} className="ml-auto shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Sign out</button>
        </nav>
        <main className="p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  )
}
