import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Book, User, Zap, ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'

export function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('intro')

  const sections = {
    intro: {
      title: 'Introduction',
      icon: Book,
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">Welcome to GBU CMS Docs</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            The Campus Maintenance System (CMS) is a unified platform built to streamline the process of reporting, tracking, and resolving infrastructure and maintenance issues across the university.
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-8">
            <h3 className="font-semibold text-blue-900 mb-2">Key Objectives</h3>
            <ul className="list-disc list-inside space-y-2 text-blue-800">
              <li>Digitize the complaint registration process.</li>
              <li>Provide transparency in complaint resolution times.</li>
              <li>Enable officers to manage resources and technicians efficiently.</li>
            </ul>
          </div>
        </div>
      )
    },
    roles: {
      title: 'User Roles',
      icon: User,
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">System Roles</h2>
          <p className="text-slate-600">The system uses role-based access. Each role has a focused workspace:</p>
          
          <div className="grid gap-6 mt-6">
            {[
              { role: 'Student', desc: 'Can register complaints, view their own complaint history, and track status.' },
              { role: 'Staff', desc: 'Can register complaints for their respective departments or quarters.' },
              { role: 'Technician', desc: 'Receives assigned work orders, follows a daily route, and updates repair progress.' },
              { role: 'Officer', desc: 'Responsible for reviewing complaints, assigning technicians, and verifying resolution.' },
              { role: 'Admin', desc: 'Maintains system logs, manages master data (hostels, departments), and oversees the entire system.' }
            ].map(r => (
              <div key={r.role} className="p-6 border border-slate-200 rounded-xl bg-white shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{r.role}</h3>
                <p className="text-slate-600">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    getting_started: {
      title: 'Getting Started',
      icon: Zap,
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">How to use the system</h2>
          <div className="space-y-8 mt-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">1. Login</h3>
              <p className="text-slate-600 mb-4">Navigate to the login page and use your university credentials to access the system. Your role will be automatically determined.</p>
              <Link to="/login"><Button variant="outline">Go to Login</Button></Link>
            </div>
            <hr className="border-slate-200"/>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">2. Registering a Complaint</h3>
              <p className="text-slate-600 mb-4">Once logged in, click on "Register Complaint". Select the category (e.g., Electrical, Plumbing), provide the location details, and submit.</p>
            </div>
            <hr className="border-slate-200"/>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">3. Tracking Status</h3>
              <p className="text-slate-600">You can view the real-time status of your complaint on your dashboard. Statuses include: REGISTERED, ASSIGNED, RESOLVED, and VERIFIED.</p>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 flex items-center px-8 bg-slate-50 sticky top-0 z-10">
        <Link to="/" className="flex items-center text-slate-600 hover:text-slate-900 font-semibold transition-colors">
          <ChevronRight className="w-5 h-5 mr-1 rotate-180" /> Back to Home
        </Link>
        <div className="mx-auto font-bold text-lg text-slate-900">Documentation</div>
        <div className="w-24"></div> {/* Spacer for centering */}
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-72 border-r border-slate-200 p-6 hidden md:block bg-slate-50/50">
          <div className="space-y-2 sticky top-24">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Contents</div>
            {Object.entries(sections).map(([key, data]) => {
              const Icon = data.icon
              const isActive = activeSection === key
              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                  {data.title}
                </button>
              )
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl">
            {sections[activeSection as keyof typeof sections].content}
          </div>
        </main>
      </div>
    </div>
  )
}
