import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Wrench, ShieldCheck, Clock, Users, Building2, CheckCircle2 } from 'lucide-react'
import { Button } from '../../components/ui/button'

export function LandingPage() {
  // Stagger animation setup
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 16 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring' as const, bounce: 0.4, duration: 0.4 } 
    }
  }

  return (
    <div 
      className="min-h-screen bg-[#EFF6FF] overflow-hidden flex flex-col selection:bg-blue-200"
      style={{ fontFamily: "'Atkinson Hyperlegible', 'Inter', sans-serif" }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet" />

      {/* Accessible Navigation */}
      <header className="h-16 bg-white border-b border-blue-100 fixed w-full z-50 flex items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/en/c/cd/Gautam_Buddha_University_logo.png" alt="GBU Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-slate-900 tracking-wide">GBU CMS</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link 
            to="/docs" 
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 focus:outline-2 focus:outline-blue-500 focus:outline-offset-2 rounded px-2 py-1 transition-colors"
          >
            Documentation
          </Link>
          <Link to="/login" tabIndex={-1}>
            <Button 
              className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white rounded-md px-5 shadow-sm focus:ring-4 focus:ring-blue-500/30 transition-all font-bold text-sm h-10"
            >
              Sign In <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 pt-16">
        {/* Trust & Authority Hero */}
        <section className="relative px-6 pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-blue-100 bg-white overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-6">
                <ShieldCheck className="w-4 h-4" /> Official GBU ICT Portal
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3A8A] leading-tight mb-6">
                Campus infrastructure <br className="hidden sm:block" />
                managed in one place.
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                Report maintenance issues, track repairs, and verify completion. Designed for students, faculty, and administration at Gautam Buddha University.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/login" tabIndex={-1}>
                  <Button className="w-full sm:w-auto h-12 px-8 text-base font-bold rounded-lg bg-[#16A34A] hover:bg-[#15803d] text-white shadow-md focus:ring-4 focus:ring-green-500/30 transition-all">
                    Access Portal
                  </Button>
                </Link>
                <Link to="/docs" tabIndex={-1}>
                  <Button variant="outline" className="w-full sm:w-auto h-12 px-8 text-base font-bold rounded-lg border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-4 focus:ring-slate-500/30 transition-all">
                    Read the manual
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Social Proof / Stats */}
        <section className="border-b border-blue-100 bg-slate-50 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-wider mb-8">
              Serving the university ecosystem
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200">
              {[
                { label: 'Registered Users', value: '12,000+' },
                { label: 'Issues Resolved', value: '14,250' },
                { label: 'Campus Zones', value: '18' },
                { label: 'Uptime', value: '99.9%' }
              ].map((stat, i) => (
                <div key={i} className="text-center px-4">
                  <div className="text-3xl font-bold text-[#1E40AF] mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Overview (Staggered Grid) */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How the system works</h2>
              <p className="text-lg text-slate-600">Report problems quickly. Route them automatically. Verify repairs before closing tickets.</p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { icon: Clock, title: 'Track status live', desc: 'See exactly where your request stands. From logged to assigned to resolved.' },
                { icon: CheckCircle2, title: 'Verify completion', desc: 'Technicians mark work done. You verify it before the ticket closes.' },
                { icon: Wrench, title: 'Smart routing', desc: 'Electrical issues go to electricians. Plumbing to plumbers. Automatically.' },
                { icon: Building2, title: 'Zone management', desc: 'Categorized by hostels, academic blocks, and administrative buildings.' },
                { icon: ShieldCheck, title: 'Secure access', desc: 'Login secured via your official university ID and role-based permissions.' },
                { icon: Users, title: 'Multiple roles', desc: 'Dedicated workspaces for students, staff, officers, technicians, and administrators.' }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="bg-slate-50 border border-slate-200 p-6 rounded-xl hover:border-blue-300 transition-colors focus-within:ring-2 focus-within:ring-blue-500"
                >
                  <div className="w-12 h-12 bg-white border border-blue-100 text-[#3B82F6] rounded-lg flex items-center justify-center mb-5 shadow-sm">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/en/c/cd/Gautam_Buddha_University_logo.png" alt="GBU Logo" className="w-8 h-8 opacity-70 grayscale" />
            <span className="font-bold text-slate-300 tracking-wide text-sm">GBU CMS © 2026</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link to="/docs" className="hover:text-white transition-colors focus:outline-2 focus:outline-blue-500 rounded px-1">Documentation</Link>
            <a href="#" className="hover:text-white transition-colors focus:outline-2 focus:outline-blue-500 rounded px-1">ICT Helpdesk</a>
            <a href="#" className="hover:text-white transition-colors focus:outline-2 focus:outline-blue-500 rounded px-1">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
