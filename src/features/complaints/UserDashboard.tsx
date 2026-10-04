import { Link } from 'react-router-dom'
import {
  Activity, Clock, CheckCircle, AlertCircle, PlusCircle,
  ChevronRight, MapPin, Tag, ArrowUpRight, Wrench, Zap, Leaf, BarChart2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { useState } from 'react'

// ── Mock data ──────────────────────────────────────────────────────────────────
const MOCK_COMPLAINTS = [
  {
    id: 'C-1001', category: 'Electrical', location: 'Hostel A, Room 204',
    description: 'The ceiling fan stopped working and there\'s a flickering light.',
    status: 'VERIFIED', priority: 'High', date: '2026-10-01',
    assignedTo: 'Er. Ramesh Kumar', timeline: ['Registered', 'Verified'],
  },
  {
    id: 'C-1002', category: 'Plumbing', location: 'Academic Block 3, Floor 2',
    description: 'Leaking pipe near the washroom causing water logging.',
    status: 'IN_PROGRESS', priority: 'Medium', date: '2026-10-02',
    assignedTo: 'Suresh Mishra', timeline: ['Registered', 'Verified', 'In Progress'],
  },
  {
    id: 'C-1003', category: 'Civil', location: 'Library Building',
    description: 'A window pane is broken and glass is on the floor.',
    status: 'REGISTERED', priority: 'Low', date: '2026-10-03',
    assignedTo: null, timeline: ['Registered'],
  },
  {
    id: 'C-1004', category: 'Horticulture', location: 'Main Gate Garden',
    description: 'Dead plants need to be removed near the main gate.',
    status: 'RESOLVED', priority: 'Low', date: '2026-09-28',
    assignedTo: 'Mohan Lal', timeline: ['Registered', 'Verified', 'In Progress', 'Resolved'],
  },
  {
    id: 'C-1005', category: 'Electrical', location: 'Sports Complex',
    description: 'Street lights not working near the basketball court.',
    status: 'RESOLVED', priority: 'Medium', date: '2026-09-25',
    assignedTo: 'Er. Ramesh Kumar', timeline: ['Registered', 'Verified', 'In Progress', 'Resolved'],
  },
]

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Electrical: <Zap className="w-4 h-4" />,
  Plumbing: <Wrench className="w-4 h-4" />,
  Civil: <Activity className="w-4 h-4" />,
  Horticulture: <Leaf className="w-4 h-4" />,
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  REGISTERED: { label: 'Registered', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', dot: 'bg-amber-400' },
  VERIFIED:   { label: 'Verified',   color: 'text-blue-700',  bg: 'bg-blue-50 border-blue-200',   dot: 'bg-blue-500'  },
  IN_PROGRESS:{ label: 'In Progress',color: 'text-purple-700',bg: 'bg-purple-50 border-purple-200',dot: 'bg-purple-500'},
  RESOLVED:   { label: 'Resolved',   color: 'text-green-700', bg: 'bg-green-50 border-green-200',  dot: 'bg-green-500' },
  REJECTED:   { label: 'Rejected',   color: 'text-red-700',   bg: 'bg-red-50 border-red-200',      dot: 'bg-red-500'   },
}

const PRIORITY_CONFIG: Record<string, { color: string; bg: string }> = {
  High:   { color: 'text-red-700',    bg: 'bg-red-50 border border-red-200' },
  Medium: { color: 'text-amber-700',  bg: 'bg-amber-50 border border-amber-200' },
  Low:    { color: 'text-slate-600',  bg: 'bg-slate-100 border border-slate-200' },
}

const ALL_TIMELINE_STEPS = ['Registered', 'Verified', 'In Progress', 'Resolved']

// ── StatusBadge ────────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.REGISTERED
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

// ── ComplaintDetail Modal ──────────────────────────────────────────────────────
function ComplaintDetailModal({ complaint, onClose }: { complaint: typeof MOCK_COMPLAINTS[0]; onClose: () => void }) {
  const completedSteps = complaint.timeline
  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="complaint-detail-title" className="w-full max-w-lg rounded-2xl bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-slate-400">{complaint.id}</span>
                <StatusBadge status={complaint.status} />
              </div>
              <h2 id="complaint-detail-title" className="text-lg font-bold text-slate-900">{complaint.category} Issue</h2>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" /> {complaint.location}
              </p>
            </div>
            <button onClick={onClose} aria-label="Close request details" className="flex h-11 w-11 items-center justify-center rounded-lg text-2xl leading-none font-light text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">×</button>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3">
            {complaint.description}
          </div>

          {/* Timeline */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Progress Timeline</div>
            <div className="flex items-center gap-0">
              {ALL_TIMELINE_STEPS.map((step, idx) => {
                const done = completedSteps.includes(step)
                const isLast = idx === ALL_TIMELINE_STEPS.length - 1
                return (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                        done ? 'bg-primary border-primary text-white' : 'bg-white border-slate-200 text-slate-300'
                      }`}>
                        {done ? '✓' : idx + 1}
                      </div>
                      <span className={`text-[10px] mt-1.5 font-medium text-center ${done ? 'text-primary' : 'text-slate-300'}`}>{step}</span>
                    </div>
                    {!isLast && <div className={`flex-1 h-0.5 mb-5 mx-1 ${done && completedSteps.includes(ALL_TIMELINE_STEPS[idx + 1]) ? 'bg-primary' : 'bg-slate-200'}`} />}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Submitted On</div>
              <div className="font-semibold text-slate-800">{complaint.date}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Priority</div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRIORITY_CONFIG[complaint.priority].bg} ${PRIORITY_CONFIG[complaint.priority].color}`}>
                {complaint.priority}
              </span>
            </div>
            {complaint.assignedTo && (
              <div className="bg-slate-50 rounded-lg p-3 col-span-2">
                <div className="text-xs text-slate-400 mb-1">Assigned To</div>
                <div className="font-semibold text-slate-800">{complaint.assignedTo}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── UserDashboard ──────────────────────────────────────────────────────────────
export function UserDashboard() {
  const [filter, setFilter] = useState<string>('ALL')
  const [selectedComplaint, setSelectedComplaint] = useState<typeof MOCK_COMPLAINTS[0] | null>(null)

  // Use rich mock data for display
  const complaints = MOCK_COMPLAINTS
  const active = complaints.filter(c => !['RESOLVED', 'REJECTED'].includes(c.status)).length
  const pending = complaints.filter(c => c.status === 'REGISTERED').length
  const resolved = complaints.filter(c => c.status === 'RESOLVED').length
  const inProgress = complaints.filter(c => c.status === 'IN_PROGRESS').length

  const filters = ['ALL', 'REGISTERED', 'VERIFIED', 'IN_PROGRESS', 'RESOLVED']
  const filtered = filter === 'ALL' ? complaints : complaints.filter(c => c.status === filter)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-blue-900 p-6 text-white md:p-8">
        <div aria-hidden="true" className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold text-blue-200">Student portal</p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Your campus requests</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">Check progress, follow up on repairs, or report a new maintenance issue.</p>
          </div>
          <Link to="/dashboard/register" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-white px-4 text-sm font-semibold text-indigo-900 shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:self-auto">
            <PlusCircle aria-hidden="true" className="h-4 w-4" /> Report an issue
          </Link>
        </div>
      </section>

      <section aria-label="Request summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Active Complaints', value: active, icon: Activity, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', trend: '+1 this week' },
          { label: 'Pending Review', value: pending, icon: Clock, iconBg: 'bg-amber-100', iconColor: 'text-amber-600', trend: 'Awaiting officer' },
          { label: 'In Progress', value: inProgress, icon: BarChart2, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', trend: 'Being worked on' },
          { label: 'Resolved', value: resolved, icon: CheckCircle, iconBg: 'bg-green-100', iconColor: 'text-green-600', trend: 'All time' },
        ].map(stat => (
          <Card key={stat.label} className="border-slate-200 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}>
                <stat.icon aria-hidden="true" className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <div className="min-w-0"><div className="flex items-center gap-2"><span className="text-2xl font-bold tabular-nums text-slate-950">{stat.value}</span><ArrowUpRight aria-hidden="true" className="h-4 w-4 text-slate-400" /></div>
                <div className="text-sm font-semibold text-slate-800">{stat.label}</div>
                <div className="mt-0.5 text-xs text-slate-500">{stat.trend}</div></div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-col gap-4 border-b border-slate-100 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-lg font-bold">My requests</CardTitle>
            <CardDescription>Open a request to see its repair timeline and details.</CardDescription>
          </div>
          <div aria-label="Filter requests" className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`min-h-10 rounded-full border px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 ${
                  filter === f ? 'border-indigo-800 bg-indigo-800 text-white' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {f === 'ALL' ? 'All' : STATUS_CONFIG[f]?.label ?? f}
                {f === 'ALL' && <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${filter === f ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-700'}`}>{complaints.length}</span>}
              </button>
            ))}
          </div>
        </CardHeader>

        <div className="divide-y divide-slate-50">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle aria-hidden="true" className="mb-3 h-10 w-10 text-slate-300" />
              <p className="font-semibold text-slate-800">No requests in this view</p>
              <p className="mt-1 text-sm text-slate-500">Choose another status or submit a new request.</p>
            </div>
          )}
          {filtered.map(complaint => {
            const pCfg = PRIORITY_CONFIG[complaint.priority]
            return (
              <button
                type="button"
                key={complaint.id}
                onClick={() => setSelectedComplaint(complaint)}
                className="group flex min-h-20 w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-700 md:px-6"
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {CATEGORY_ICONS[complaint.category] ?? <Wrench className="w-4 h-4" />}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-xs text-slate-400">{complaint.id}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${pCfg.bg} ${pCfg.color}`}>
                      {complaint.priority}
                    </span>
                  </div>
                  <div className="truncate text-sm font-semibold text-slate-900">
                    {complaint.category} — {complaint.description.slice(0, 55)}...
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0" /> {complaint.location}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Tag aria-hidden="true" className="h-3.5 w-3.5" /> {complaint.date}
                    </span>
                  </div>
                </div>

                {/* Status + Arrow */}
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={complaint.status} />
                  <ChevronRight aria-hidden="true" className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3 md:px-6">
            <Link to="/dashboard/history" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-indigo-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">
              View request history <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        )}
      </Card>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <ComplaintDetailModal complaint={selectedComplaint} onClose={() => setSelectedComplaint(null)} />
      )}
    </div>
  )
}
