import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, CircleHelp, ClipboardCheck,
  ClipboardList, Clock3, FilePlus2, HardHat, MapPin, ShieldCheck, Sparkles,
  UserRound, Users, Wrench, Zap,
} from 'lucide-react'
import { BrandMark } from '../../components/layout/BrandMark'

type SectionKey = 'overview' | 'workflow' | 'roles' | 'status' | 'demo' | 'help'

const sections: { id: SectionKey; title: string; icon: typeof BookOpen }[] = [
  { id: 'overview', title: 'Overview', icon: BookOpen },
  { id: 'workflow', title: 'Request workflow', icon: ClipboardList },
  { id: 'roles', title: 'Portals and roles', icon: Users },
  { id: 'status', title: 'Statuses and updates', icon: Clock3 },
  { id: 'demo', title: 'Demo access', icon: Sparkles },
  { id: 'help', title: 'Help and good reports', icon: CircleHelp },
]

const roleCards = [
  { title: 'Student', path: '/dashboard', icon: UserRound, accent: 'bg-blue-50 text-blue-800', description: 'Report issues in campus spaces, track your requests, and review status updates.' },
  { title: 'Staff', path: '/staff', icon: ClipboardCheck, accent: 'bg-teal-50 text-teal-800', description: 'Create department or workspace requests and follow them through the service process.' },
  { title: 'Officer', path: '/officer', icon: ShieldCheck, accent: 'bg-indigo-50 text-indigo-800', description: 'Review incoming requests, assign work orders, and monitor service delivery.' },
  { title: 'Technician', path: '/technician', icon: HardHat, accent: 'bg-amber-50 text-amber-900', description: 'Review assigned jobs, plan campus visits, and record work progress.' },
  { title: 'Administrator', path: '/admin', icon: Wrench, accent: 'bg-rose-50 text-rose-800', description: 'Review system activity, service health, and portal configuration.' },
]

const demoAccounts = [
  { role: 'Student', username: 'student', password: 'student' },
  { role: 'Staff', username: 'staff', password: 'staff' },
  { role: 'Officer', username: 'officer', password: 'officer' },
  { role: 'Technician', username: 'technician', password: 'technician' },
  { role: 'Administrator', username: 'superadmin', password: 'superadmin' },
]

export function DocumentationPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>('overview')
  const [copied, setCopied] = useState(false)

  const copyCredentials = async (username: string, password: string) => {
    try {
      await navigator.clipboard.writeText(`Username: ${username}\nPassword: ${password}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const currentIndex = sections.findIndex(section => section.id === activeSection)
  const changeSection = (id: SectionKey) => {
    setActiveSection(id)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('guide-content')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" style={{ fontFamily: "'Atkinson Hyperlegible', 'Inter', sans-serif" }}>
      <a href="#guide-content" className="sr-only z-50 rounded-md bg-white px-4 py-3 text-indigo-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:ring-2 focus:ring-indigo-700">Skip to documentation</a>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="GBU CMS home" className="inline-flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700"><BrandMark /><span><span className="block text-sm font-bold leading-tight">GBU CMS</span><span className="block text-[11px] text-slate-600">Campus Maintenance</span></span></Link>
          <nav aria-label="Documentation actions" className="flex items-center gap-2"><Link to="/" className="hidden min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 sm:inline-flex"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Home</Link><Link to="/login" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-indigo-800 px-4 text-sm font-bold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2">Open portal <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
          <aside className="border-b border-slate-200 py-5 lg:border-b-0 lg:py-8">
            <div className="mb-3 hidden px-3 text-xs font-bold uppercase tracking-wider text-slate-500 lg:block">In this guide</div>
            <nav aria-label="Documentation sections" className="flex gap-2 overflow-x-auto pb-1 lg:sticky lg:top-24 lg:flex-col lg:overflow-visible">
              {sections.map((section, index) => {
                const Icon = section.icon
                const active = activeSection === section.id
                return <button key={section.id} type="button" onClick={() => changeSection(section.id)} aria-current={active ? 'page' : undefined} className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 lg:w-full ${active ? 'bg-indigo-800 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 lg:bg-transparent'}`}><Icon aria-hidden="true" className="h-4 w-4 shrink-0" /><span>{section.title}</span><span className={`ml-auto hidden text-xs lg:inline ${active ? 'text-indigo-100' : 'text-slate-500'}`}>{String(index + 1).padStart(2, '0')}</span></button>
              })}
            </nav>
            <div className="mt-6 hidden rounded-xl border border-blue-200 bg-blue-50 p-4 lg:block"><p className="text-xs font-bold uppercase tracking-wide text-blue-900">Need a starting point?</p><p className="mt-2 text-sm leading-5 text-slate-700">Go to the sign-in page and select a portal for your role.</p><Link to="/login" className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-blue-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800">Go to sign in <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>
          </aside>

          <main id="guide-content" tabIndex={-1} className="min-w-0 scroll-mt-24 py-8 outline-none md:py-10 lg:py-12">
            <div className="mb-8 border-b border-slate-200 pb-6"><p className="text-sm font-bold uppercase tracking-wider text-indigo-800">User guide · Section {String(currentIndex + 1).padStart(2, '0')}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{sections[currentIndex].title}</h1><p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">A practical guide to submitting campus maintenance requests and moving them through the service workflow.</p></div>

            {activeSection === 'overview' && <div className="space-y-8">
              <section className="rounded-2xl bg-indigo-950 p-6 text-white sm:p-8"><p className="text-sm font-bold text-blue-200">Campus Maintenance System</p><h2 className="mt-3 max-w-2xl text-2xl font-bold sm:text-3xl">A shared record for campus service requests.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100">Use the portal to capture what needs attention, where the team can find it, and how the repair progresses. The same request history helps requesters and operations staff stay aligned.</p><Link to="/login" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-indigo-950 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Choose your portal <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></section>
              <section><h2 className="text-xl font-bold text-slate-950">What you can do</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{[{ title: 'Send useful details', text: 'Select a category, describe the issue, and identify its campus location.', icon: FilePlus2 }, { title: 'Follow progress', text: 'Use the request status and timeline to understand the next step.', icon: Clock3 }, { title: 'Coordinate the repair', text: 'Officers and technicians work from assigned requests and work orders.', icon: Wrench }, { title: 'Keep a record', text: 'Review request history to find previous details and updates.', icon: ClipboardCheck }].map(item => <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-5"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-800"><item.icon aria-hidden="true" className="h-5 w-5" /></span><h3 className="mt-4 font-bold text-slate-950">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p></article>)}</div></section>
              <section className="rounded-xl border border-amber-200 bg-amber-50 p-5"><div className="flex gap-3"><Sparkles aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-900" /><div><h2 className="font-bold text-amber-950">Viewing a demo?</h2><p className="mt-1 text-sm leading-6 text-amber-950">The public demo uses sample accounts and sample requests. Do not enter real passwords, personal information, or confidential work details.</p><button type="button" onClick={() => changeSection('demo')} className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-amber-950 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-900">See demo accounts <ArrowRight aria-hidden="true" className="h-4 w-4" /></button></div></div></section>
            </div>}

            {activeSection === 'workflow' && <div className="space-y-6">
              <p className="max-w-3xl text-base leading-7 text-slate-700">A request starts with a campus user and moves through review, assignment, and repair. Exact actions depend on the user's portal and permissions.</p>
              <ol className="space-y-4">{[{ title: 'Create a request', text: 'Open Report an issue. Choose the closest service category, enter the building and room or area, describe what happened, and submit.', icon: FilePlus2, badge: 'Requester' }, { title: 'Review and route', text: 'An officer checks the details, confirms that the request is actionable, and assigns work to an appropriate technician or service group.', icon: Users, badge: 'Officer' }, { title: 'Record repair progress', text: 'The technician reviews the work order, visits the location, and updates the job as work starts and finishes.', icon: Wrench, badge: 'Technician' }, { title: 'Follow the outcome', text: 'The requester can return to the dashboard or history to review updates and the latest recorded status.', icon: CheckCircle2, badge: 'Requester' }].map((step, index) => <li key={step.title} className="relative flex gap-4 rounded-xl border border-slate-200 bg-white p-5"><div className="flex flex-col items-center"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-800 text-sm font-bold text-white">{index + 1}</span>{index < 3 && <span aria-hidden="true" className="mt-2 h-full min-h-8 w-px bg-slate-200" />}</div><div className="min-w-0 pb-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-bold text-slate-950">{step.title}</h2><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{step.badge}</span></div><p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p></div><step.icon aria-hidden="true" className="ml-auto hidden h-5 w-5 shrink-0 text-indigo-800 sm:block" /></li>)}</ol>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-5"><h2 className="font-bold text-blue-950">Before submitting</h2><p className="mt-2 text-sm leading-6 text-slate-700">Check that the location is specific enough for a technician to find the issue. Add relevant observations without including sensitive personal information.</p></div>
            </div>}

            {activeSection === 'roles' && <div className="space-y-6"><p className="max-w-3xl text-base leading-7 text-slate-700">The portal routes users to a workspace based on their account role. Select a role card to open its portal directly.</p><div className="grid gap-4 sm:grid-cols-2">{roleCards.map(role => <article key={role.title} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5"><span className={`flex h-11 w-11 items-center justify-center rounded-xl ${role.accent}`}><role.icon aria-hidden="true" className="h-5 w-5" /></span><h2 className="mt-4 text-lg font-bold text-slate-950">{role.title}</h2><p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{role.description}</p><Link to={role.path} className="mt-4 inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-indigo-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">Open {role.title.toLowerCase()} portal <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></article>)}</div><p className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">Access in this demo is for navigation and walkthroughs only. A production service should enforce roles on a trusted backend.</p></div>}

            {activeSection === 'status' && <div className="space-y-6"><p className="max-w-3xl text-base leading-7 text-slate-700">A status tells you the latest recorded stage. Check the request timeline for its sequence of updates.</p><div className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="grid grid-cols-[minmax(110px,0.7fr)_1.5fr] gap-4 border-b border-slate-200 bg-slate-100 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-700 sm:px-5"><span>Status</span><span>Meaning</span></div>{[{ name: 'Registered', text: 'The request has been submitted and is awaiting review.' }, { name: 'Verified', text: 'An officer has reviewed the request and confirmed it for follow-up.' }, { name: 'In progress', text: 'A technician or service team is working on the assigned job.' }, { name: 'Resolved', text: 'The repair has been recorded as complete.' }, { name: 'Rejected', text: 'The request was closed without proceeding. Review any accompanying note or contact the service desk.' }].map((item, index) => <div key={item.name} className={`grid grid-cols-[minmax(110px,0.7fr)_1.5fr] gap-4 px-4 py-4 sm:px-5 ${index < 4 ? 'border-b border-slate-100' : ''}`}><span className="text-sm font-bold text-slate-900">{item.name}</span><p className="text-sm leading-6 text-slate-600">{item.text}</p></div>)}</div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="font-bold text-slate-950">Where to look</h2><p className="mt-2 text-sm leading-6 text-slate-600">Use the dashboard for a quick overview. Open request history when you need to search or review older items.</p></div><div className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="font-bold text-slate-950">Status changes</h2><p className="mt-2 text-sm leading-6 text-slate-600">A status reflects the latest update entered by the responsible role. Contact the helpdesk if a record needs clarification.</p></div></div></div>}

            {activeSection === 'demo' && <div className="space-y-6"><section className="rounded-xl border border-amber-200 bg-amber-50 p-5"><div className="flex gap-3"><Sparkles aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-amber-900" /><div><h2 className="font-bold text-amber-950">Public demo accounts</h2><p className="mt-1 text-sm leading-6 text-amber-950">These sample credentials are visible to anyone. Use them only to explore the interface. Never reuse a personal password.</p></div></div></section><div className="space-y-3">{demoAccounts.map(account => <article key={account.role} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-800"><UserRound aria-hidden="true" className="h-5 w-5" /></span><div><h2 className="font-bold text-slate-950">{account.role}</h2><p className="mt-1 font-mono text-sm text-slate-700">{account.username} <span className="text-slate-400">/</span> {account.password}</p><p className="mt-1 text-xs text-slate-500">Username / password</p></div></div><button type="button" onClick={() => void copyCredentials(account.username, account.password)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">{copied ? 'Copied' : 'Copy account'}</button></article>)}</div><p role="status" aria-live="polite" className="min-h-6 text-sm font-medium text-emerald-800">{copied ? 'Demo account copied to clipboard.' : ''}</p><Link to="/login" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-indigo-800 px-4 text-sm font-bold text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">Go to demo sign in <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>}

            {activeSection === 'help' && <div className="space-y-6"><section><h2 className="text-xl font-bold text-slate-950">Write a useful request</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Good reports reduce follow-up and help the service team find the right place on the first visit.</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{[{ title: 'Name the place', text: 'Include building, floor, room, or a nearby landmark.', icon: MapPin }, { title: 'Describe the symptom', text: 'Say what is not working and when you noticed it.', icon: ClipboardList }, { title: 'Choose the closest category', text: 'Select the service type that best matches the issue.', icon: Zap }, { title: 'Keep details appropriate', text: 'Do not include passwords, financial details, or private personal data.', icon: ShieldCheck }].map(tip => <article key={tip.title} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"><tip.icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-indigo-800" /><div><h3 className="text-sm font-bold text-slate-900">{tip.title}</h3><p className="mt-1 text-sm leading-5 text-slate-600">{tip.text}</p></div></article>)}</div></section><section className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-xl font-bold text-slate-950">Need assistance?</h2><p className="mt-2 text-sm leading-6 text-slate-600">For help accessing the portal or clarifying a request, contact the university helpdesk.</p><a href="tel:1800-180-5522" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-indigo-800 px-4 text-sm font-bold text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700"><CircleHelp aria-hidden="true" className="h-4 w-4" />Call 1800-180-5522</a></section></div>}

            <nav aria-label="Guide pagination" className="mt-10 flex items-center justify-between border-t border-slate-200 pt-5"><button type="button" disabled={currentIndex === 0} onClick={() => changeSection(sections[currentIndex - 1].id)} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Previous</button><span className="text-xs font-medium text-slate-500">{currentIndex + 1} of {sections.length}</span><button type="button" disabled={currentIndex === sections.length - 1} onClick={() => changeSection(sections[currentIndex + 1].id)} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-indigo-800 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 disabled:cursor-not-allowed disabled:opacity-40">Next<ArrowRight aria-hidden="true" className="h-4 w-4" /></button></nav>
          </main>
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><p className="text-sm text-slate-600">GBU Campus Maintenance System · User documentation</p><div className="flex flex-wrap gap-4 text-sm font-semibold"><Link to="/" className="inline-flex min-h-11 items-center text-slate-700 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">Home</Link><Link to="/login" className="inline-flex min-h-11 items-center text-indigo-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">Sign in</Link></div></div></footer>
    </div>
  )
}
