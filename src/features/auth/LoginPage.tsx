import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/useAuthStore'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardFooter } from '../../components/ui/card'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff, Phone, Home, ShieldCheck, AlertCircle } from 'lucide-react'
import { BrandMark } from '../../components/layout/BrandMark'

const DEMO_ACCOUNTS = [
  { role: 'Student', username: 'student', password: 'student' },
  { role: 'Staff', username: 'staff', password: 'staff' },
  { role: 'Officer', username: 'officer', password: 'officer' },
  { role: 'Technician', username: 'technician', password: 'technician' },
  { role: 'Admin', username: 'superadmin', password: 'superadmin' },
]

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberDevice, setRememberDevice] = useState(false)
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()
  const demoMode = import.meta.env.DEV || import.meta.env.VITE_DEMO_MODE === 'true'

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      })
      if (!res.ok) throw new Error('Login failed')
      return res.json()
    },
    onSuccess: (data) => {
      login(data.user, data.token)
      if (data.user.role === 'OFFICER') navigate('/officer')
      else if (data.user.role === 'STAFF') navigate('/staff')
      else if (data.user.role === 'TECHNICIAN') navigate('/technician')
      else if (data.user.role === 'ADMIN') navigate('/admin')
      else navigate('/dashboard')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ fontFamily: "'Atkinson Hyperlegible', 'Inter', sans-serif" }}
    >
      {/* Google Font Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap"
        rel="stylesheet"
      />

      {/* Background — split layout */}
      <div className="flex flex-1 flex-col lg:flex-row">

        {/* Left Panel — Institutional brand */}
        <div
          className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #1E3A8A 0%, #1E40AF 60%, #1d4ed8 100%)' }}
        >
          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />

          {/* Top logo */}
          <div className="relative flex items-center gap-3">
            <BrandMark className="!h-12 !w-12 text-xs" />
            <div>
              <div className="font-bold text-lg leading-none">GBU CMS</div>
              <div className="text-blue-200 text-xs mt-0.5">Campus Maintenance System</div>
            </div>
          </div>

          {/* Center content */}
          <div className="relative space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Report campus issues.<br />
              Track them in real time.
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed max-w-sm">
              The official grievance and maintenance portal for Gautam Buddha University — Greater Noida.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { value: '14,250+', label: 'Issues resolved' },
                { value: '98.4%', label: 'Resolution rate' },
                { value: '24–48h', label: 'Avg. turnaround' },
                { value: '100%', label: 'UGC compliant' },
              ].map(stat => (
                <div key={stat.label} className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-blue-200 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom trust */}
          <div className="relative flex items-center gap-2 text-blue-200 text-sm">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            GBU ICT Single Sign-On · UGC Mandate Compliant
          </div>
        </div>

        {/* Right Panel — Login form */}
        <div className="flex-1 flex flex-col bg-[#EFF6FF]">

          {/* Top bar */}
          <header className="h-14 bg-white border-b border-blue-100 flex items-center justify-between px-6 lg:px-8">
            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-2">
              <BrandMark className="!h-7 !w-7 rounded-lg text-[8px]" />
              <span className="font-bold text-sm text-slate-900">GBU CMS</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-sm text-slate-500">
              <Phone className="w-3.5 h-3.5" />
              Helpdesk: <span className="font-semibold text-slate-700">1800-180-5522</span>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <a
                href="tel:1800-180-5522"
                className="lg:hidden flex items-center gap-1 text-xs text-blue-700 font-medium"
              >
                <Phone className="w-3 h-3" /> Helpdesk
              </a>
              <a
                href="/"
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors focus:outline-2 focus:outline-blue-500 focus:outline-offset-2 rounded"
              >
                <Home className="w-3.5 h-3.5" /> Home
              </a>
            </div>
          </header>

          {/* Form area */}
          <main className="flex-1 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md"
            >
              {/* Card header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                  className="w-16 h-16 bg-white rounded-2xl border border-blue-100 shadow-md flex items-center justify-center mx-auto mb-5"
                >
                  <BrandMark className="!h-11 !w-11 text-[10px]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-900">Sign in to GBU CMS</h2>
                <p className="text-slate-500 text-sm mt-1.5">Use your university ID and password.</p>
              </div>

              <Card className="bg-white border border-blue-100 shadow-lg rounded-2xl overflow-hidden">
                <form onSubmit={handleSubmit}>
                  <CardContent className="p-7 space-y-5">

                    {demoMode && (
                      <section aria-label="Demo accounts" className="rounded-xl border border-blue-200 bg-blue-50/70 p-4">
                        <p className="text-sm font-bold text-slate-900">Demo access</p>
                        <p className="mt-1 text-xs leading-5 text-slate-600">Choose a role to fill its sample account. Demo data is not private.</p>
                        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {DEMO_ACCOUNTS.map(account => (
                            <button
                              key={account.role}
                              type="button"
                              onClick={() => { setUsername(account.username); setPassword(account.password); loginMutation.reset() }}
                              className="min-h-11 rounded-lg border border-blue-200 bg-white px-3 text-sm font-semibold text-blue-900 transition-colors hover:border-blue-400 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                            >
                              {account.role}
                            </button>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Error state */}
                    {loginMutation.isError && (
                      <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm" role="alert">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <strong>Sign-in failed.</strong> Check your university ID and password, then try again.
                        </div>
                      </div>
                    )}

                    {/* University ID */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="username"
                        className="text-sm font-semibold text-slate-700"
                      >
                        University ID / Roll Number
                      </Label>
                      <Input
                        id="username"
                        autoComplete="username"
                        placeholder="e.g. 21/ICS/042 or EMP-1082"
                        className="h-12 border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        aria-describedby="username-hint"
                      />
                      <p id="username-hint" className="text-[11px] text-slate-400">
                        Students: roll number. Faculty & Staff: employee ID.
                      </p>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="password"
                          className="text-sm font-semibold text-slate-700"
                        >
                          Password
                        </Label>
                        <a
                          href="#"
                          className="text-xs font-medium text-blue-700 hover:text-blue-900 hover:underline focus:outline-2 focus:outline-blue-500 focus:outline-offset-1 rounded transition-colors"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          className="h-12 pr-11 border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(v => !v)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 focus:outline-2 focus:outline-blue-500 focus:outline-offset-1 rounded p-0.5 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember */}
                    <div className="flex items-center gap-2.5">
                      <input
                        id="remember"
                        type="checkbox"
                        checked={rememberDevice}
                        onChange={e => setRememberDevice(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-700 focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-slate-600 cursor-pointer select-none"
                      >
                        Remember this device
                      </label>
                    </div>
                  </CardContent>

                  <CardFooter className="flex-col px-7 pb-7 pt-0 gap-4">
                    <Button
                      type="submit"
                      disabled={loginMutation.isPending || !username || !password}
                      className="w-full h-12 text-sm font-bold bg-[#1E40AF] hover:bg-[#1E3A8A] focus:ring-4 focus:ring-blue-500/30 focus:outline-none transition-all rounded-xl shadow-md shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      style={{ minHeight: '44px' }}
                    >
                      {loginMutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
                          </svg>
                          Signing in...
                        </span>
                      ) : 'Sign In'}
                    </Button>
                    <p className="text-xs text-center text-slate-400">
                      Can't get in?{' '}
                      <a href="#" className="text-blue-700 hover:underline font-medium">ICT Cell helpdesk</a>
                    </p>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="py-4 px-6 border-t border-blue-100 bg-white flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>© 2024 Gautam Buddha University</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-700 transition-colors">Anti-Ragging Cell</a>
              <a href="#" className="hover:text-slate-700 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-700 transition-colors">Terms of Use</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
