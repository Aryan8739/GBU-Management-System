import { Link } from 'react-router-dom'
import {
  ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, BookOpen, Building2,
  Check, ClipboardList, Clock3, FileCheck2, GraduationCap, HardHat,
  MapPin, ShieldCheck, Sparkles, Users, Wrench, Zap,
} from 'lucide-react'
import { BrandMark } from '../../components/layout/BrandMark'

const workflow = [
  { number: '01', title: 'Report the issue', description: 'Choose a service category, add the location, and explain what needs attention.', icon: ClipboardList },
  { number: '02', title: 'Review and assign', description: 'An officer reviews the request and routes the work to the right team.', icon: Users },
  { number: '03', title: 'Repair and update', description: 'The technician records progress so you can follow each status change.', icon: Wrench },
  { number: '04', title: 'Confirm resolution', description: 'Check the completed work and keep the request history for reference.', icon: FileCheck2 },
]

const roles = [
  { name: 'Students', description: 'Report an issue in your hostel, classroom, library, or shared campus space.', icon: GraduationCap, tone: 'bg-blue-50 text-blue-800' },
  { name: 'Staff', description: 'Submit and follow requests for your department or university workspace.', icon: Building2, tone: 'bg-teal-50 text-teal-800' },
  { name: 'Officers', description: 'Review incoming requests, assign work, and monitor service progress.', icon: ShieldCheck, tone: 'bg-indigo-50 text-indigo-800' },
  { name: 'Technicians', description: 'See assigned work orders, plan visits, and record repair updates.', icon: HardHat, tone: 'bg-amber-50 text-amber-900' },
]

const services = [
  { name: 'Electrical', detail: 'Lighting, fans, wiring, and power', icon: Zap },
  { name: 'Plumbing', detail: 'Water supply, taps, and drainage', icon: Wrench },
  { name: 'Civil works', detail: 'Doors, windows, walls, and flooring', icon: Building2 },
  { name: 'Campus grounds', detail: 'Gardens, paths, and shared spaces', icon: MapPin },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Atkinson Hyperlegible', 'Inter', sans-serif" }}>
      <a href="#main-content" className="sr-only z-50 rounded-md bg-white px-4 py-3 text-indigo-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:ring-2 focus:ring-indigo-700">Skip to main content</a>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="GBU Campus Maintenance home" className="flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">
            <BrandMark />
            <span><span className="block text-sm font-bold leading-tight">GBU CMS</span><span className="block text-[11px] text-slate-600">Campus Maintenance</span></span>
          </Link>
          <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-3">
            <Link to="/docs" className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">How it works</Link>
            <Link to="/login" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-indigo-800 px-4 text-sm font-bold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2">Open portal <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="relative isolate overflow-hidden bg-[#EFF6FF]">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_20%,rgba(59,130,246,0.15),transparent_34%),linear-gradient(130deg,transparent_48%,rgba(255,255,255,0.75)_48%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
            <div>
              <div className="inline-flex min-h-9 items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 text-xs font-bold text-blue-900"><span className="h-2 w-2 rounded-full bg-emerald-600" /> CAMPUS SERVICE PORTAL</div>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-[#172554] sm:text-5xl lg:text-6xl">A clearer path from campus issue to repair.</h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">Report maintenance concerns, see who is handling them, and follow progress through one shared campus service workspace.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/login" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-indigo-800 px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-800 focus-visible:ring-offset-2">Sign in to your portal <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                <Link to="/docs" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">Explore the guide <BookOpen aria-hidden="true" className="h-4 w-4" /></Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-700">
                <span className="inline-flex items-center gap-2"><Check aria-hidden="true" className="h-4 w-4 text-emerald-700" /> Track request status</span>
                <span className="inline-flex items-center gap-2"><Check aria-hidden="true" className="h-4 w-4 text-emerald-700" /> Keep updates in one place</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div aria-hidden="true" className="absolute -inset-5 rounded-[2rem] bg-blue-200/50 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-950/10">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-800"><ClipboardList aria-hidden="true" className="h-5 w-5" /></span><div><p className="text-sm font-bold text-slate-950">Request overview</p><p className="text-xs text-slate-600">Sample campus service request</p></div></div>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900">In progress</span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs font-semibold text-slate-500">REQUEST · C-1042</p><h2 className="mt-2 text-lg font-bold text-slate-950">Lighting repair</h2><p className="mt-1 text-sm text-slate-600">Corridor lights need attention</p></div><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800"><Zap aria-hidden="true" className="h-5 w-5" /></span></div>
                  <div className="mt-5 flex items-center gap-2 text-sm text-slate-700"><MapPin aria-hidden="true" className="h-4 w-4 text-slate-500" /> Academic Block 2 · First floor</div>
                  <div className="mt-7" aria-label="Request progress">
                    <div className="flex items-center">
                      {['Received', 'Reviewed', 'Repair', 'Closed'].map((step, index) => <div key={step} className="flex flex-1 items-center last:flex-none"><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${index < 3 ? 'border-indigo-800 bg-indigo-800 text-white' : 'border-slate-300 bg-white text-slate-600'}`}>{index < 2 ? <Check aria-hidden="true" className="h-4 w-4" /> : index + 1}</div>{index < 3 && <div className={`h-0.5 flex-1 ${index < 2 ? 'bg-indigo-800' : 'bg-slate-200'}`} />}</div>)}
                    </div>
                    <div className="mt-2 grid grid-cols-4 text-[11px] font-medium text-slate-600">{['Received', 'Reviewed', 'Repair', 'Closed'].map(step => <span key={step}>{step}</span>)}</div>
                  </div>
                  <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-800 ring-1 ring-slate-200"><Clock3 aria-hidden="true" className="h-4 w-4" /></span><div><p className="text-sm font-semibold text-slate-900">Latest update</p><p className="mt-1 text-xs leading-5 text-slate-600">A technician has started work on this request. Updates appear in your request history.</p></div></div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3"><span className="text-xs text-slate-600">A simple, visible service journey</span><ArrowDown aria-hidden="true" className="h-4 w-4 text-indigo-800" /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white" aria-label="Service principles">
          <div className="mx-auto grid max-w-7xl gap-0 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {[{ title: 'One place to report', text: 'Capture issue details and campus location together.', icon: ClipboardList }, { title: 'A visible status', text: 'Follow the request from receipt to resolution.', icon: BadgeCheck }, { title: 'The right team', text: 'Help route maintenance work to the responsible team.', icon: Wrench }].map((item, index) => <div key={item.title} className={`flex gap-4 py-6 sm:px-5 lg:py-8 ${index > 0 ? 'border-t border-slate-200 sm:border-l sm:border-t-0' : ''}`}><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800"><item.icon aria-hidden="true" className="h-5 w-5" /></span><div><h2 className="text-sm font-bold text-slate-950">{item.title}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p></div></div>)}
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-wider text-indigo-800">The process</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Every request has a next step.</h2><p className="mt-4 text-base leading-7 text-slate-600">A shared workflow helps requesters and service teams understand what has happened and what comes next.</p></div>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{workflow.map((step, index) => <li key={step.number} className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="font-mono text-sm font-bold text-indigo-800">{step.number}</span><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800"><step.icon aria-hidden="true" className="h-5 w-5" /></span></div><h3 className="mt-5 text-lg font-bold text-slate-950">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>{index < workflow.length - 1 && <ArrowRight aria-hidden="true" className="absolute -right-3 top-8 z-10 hidden h-5 w-5 text-slate-400 xl:block" />}</li>)}</ol>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-wider text-indigo-800">Built for campus teams</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">One service, clear responsibilities.</h2><p className="mt-4 text-base leading-7 text-slate-600">Each portal focuses on the information and actions its users need to move maintenance work forward.</p></div><Link to="/docs" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-indigo-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">See role guide <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{roles.map(role => <article key={role.name} className="rounded-2xl border border-slate-200 bg-white p-5"><span className={`flex h-11 w-11 items-center justify-center rounded-xl ${role.tone}`}><role.icon aria-hidden="true" className="h-5 w-5" /></span><h3 className="mt-4 text-lg font-bold text-slate-950">{role.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{role.description}</p></article>)}</div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-wider text-indigo-800">Common service areas</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Start with the kind of help you need.</h2><p className="mt-4 text-base leading-7 text-slate-600">Select a category when you report an issue. Add a precise location and enough detail to help the team investigate.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{services.map(service => <div key={service.name} className="flex items-start gap-3 rounded-xl border border-slate-200 p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-800"><service.icon aria-hidden="true" className="h-5 w-5" /></span><div><h3 className="font-bold text-slate-900">{service.name}</h3><p className="mt-1 text-sm leading-5 text-slate-600">{service.detail}</p></div></div>)}</div></div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl bg-indigo-950 p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10"><div className="max-w-2xl"><span className="inline-flex items-center gap-2 text-sm font-bold text-blue-200"><Sparkles aria-hidden="true" className="h-4 w-4" /> Ready to get started?</span><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Sign in to report or manage a request.</h2><p className="mt-3 text-sm leading-6 text-blue-100">Use your university account to open the workspace for your role. New to the portal? Read the guide first.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Link to="/login" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-indigo-950 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Open the portal <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link><Link to="/docs" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/40 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Read documentation</Link></div></div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><Link to="/" className="inline-flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700"><BrandMark /><span><span className="block text-sm font-bold text-slate-900">GBU CMS</span><span className="block text-xs text-slate-600">Campus Maintenance System</span></span></Link><div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-600"><Link to="/docs" className="inline-flex min-h-11 items-center hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">Documentation</Link><a href="tel:1800-180-5522" className="inline-flex min-h-11 items-center hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">Helpdesk · 1800-180-5522</a></div><p className="text-xs text-slate-500">© 2026 Gautam Buddha University</p></div>
      </footer>
    </div>
  )
}
