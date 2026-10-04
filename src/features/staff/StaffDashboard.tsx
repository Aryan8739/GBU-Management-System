import { useMemo, useState } from 'react'
import { ArrowUpRight, CheckCircle2, Clock3, FilePlus2, MapPin, Search, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../../components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

const staffRequests = [
  { id: 'C-1001', category: 'Plumbing', location: 'Hostel A · Block 2', summary: 'Leaking tap in the ground-floor washroom', status: 'IN_PROGRESS', updated: 'Updated today' },
  { id: 'C-1002', category: 'Electrical', location: 'Academic Block 1 · Room 204', summary: 'Ceiling fan stopped working', status: 'REGISTERED', updated: 'Submitted yesterday' },
  { id: 'C-0994', category: 'Civil', location: 'Library Building · Reading room', summary: 'Loose window latch needs repair', status: 'RESOLVED', updated: 'Closed 2 days ago' },
]

const statusLabels: Record<string, string> = { REGISTERED: 'Received', VERIFIED: 'Reviewed', IN_PROGRESS: 'In progress', RESOLVED: 'Resolved', REJECTED: 'Closed' }
const statusStyles: Record<string, string> = {
  REGISTERED: 'border-amber-200 bg-amber-50 text-amber-800',
  VERIFIED: 'border-blue-200 bg-blue-50 text-blue-800',
  IN_PROGRESS: 'border-violet-200 bg-violet-50 text-violet-800',
  RESOLVED: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  REJECTED: 'border-slate-200 bg-slate-100 text-slate-700',
}

export function StaffDashboard() {
  const [filter, setFilter] = useState('ALL')
  const [query, setQuery] = useState('')
  const requests = useMemo(() => staffRequests.filter(request => (filter === 'ALL' || request.status === filter) && `${request.id} ${request.category} ${request.location} ${request.summary}`.toLowerCase().includes(query.toLowerCase())), [filter, query])
  const openCount = staffRequests.filter(request => ['REGISTERED', 'VERIFIED', 'IN_PROGRESS'].includes(request.status)).length
  const resolvedCount = staffRequests.filter(request => request.status === 'RESOLVED').length

  return <div className="mx-auto max-w-7xl space-y-6">
    <section className="flex flex-col gap-4 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8"><div><p className="text-sm font-semibold text-blue-800">Staff portal</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">Keep your requests moving.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Submit a campus issue and follow its progress from review through repair.</p></div><Link to="/staff/register" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2"><FilePlus2 aria-hidden="true" className="h-4 w-4" />Report an issue</Link></section>

    <section aria-label="Request summary" className="grid gap-4 sm:grid-cols-3">{[{ label: 'Requests on file', value: staffRequests.length, detail: 'Submitted by your account', icon: FilePlus2, color: 'bg-blue-50 text-blue-800' }, { label: 'Being handled', value: openCount, detail: 'Under review or repair', icon: Wrench, color: 'bg-amber-50 text-amber-800' }, { label: 'Resolved', value: resolvedCount, detail: 'Completed requests', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-800' }].map(stat => <Card key={stat.label} className="border-slate-200 shadow-sm"><CardContent className="flex items-center gap-4 p-5"><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.color}`}><stat.icon aria-hidden="true" className="h-5 w-5" /></div><div><div className="text-2xl font-bold tabular-nums text-slate-950">{stat.value}</div><div className="text-sm font-semibold text-slate-800">{stat.label}</div><div className="text-xs text-slate-500">{stat.detail}</div></div></CardContent></Card>)}</section>

    <Card className="border-slate-200 shadow-sm"><CardHeader className="gap-4 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle className="text-lg font-bold">Your recent requests</CardTitle><CardDescription>Check the latest update and status for each issue.</CardDescription></div><label className="relative block w-full sm:max-w-xs"><span className="sr-only">Search requests</span><Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search requests" className="min-h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700" /></label></CardHeader>
      <CardContent className="space-y-4 p-4 md:p-5"><div className="flex flex-wrap gap-2" aria-label="Filter requests">{[{ label: 'All requests', value: 'ALL' }, { label: 'In progress', value: 'IN_PROGRESS' }, { label: 'Received', value: 'REGISTERED' }, { label: 'Resolved', value: 'RESOLVED' }].map(option => <button key={option.value} onClick={() => setFilter(option.value)} aria-pressed={filter === option.value} className={`min-h-10 rounded-full border px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${filter === option.value ? 'border-blue-800 bg-blue-800 text-white' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>{option.label}</button>)}</div>
        {requests.length === 0 ? <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center"><p className="font-semibold text-slate-800">No matching requests</p><p className="mt-1 text-sm text-slate-500">Try another filter or search term.</p></div> : <div className="divide-y divide-slate-100">{requests.map(request => <article key={request.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="font-mono text-xs font-semibold text-slate-500">{request.id}</span><Badge className={`${statusStyles[request.status]} border`}>{statusLabels[request.status]}</Badge><span className="text-xs font-medium text-slate-500">{request.category}</span></div><h3 className="mt-2 font-semibold text-slate-900">{request.summary}</h3><p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600"><MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-400" />{request.location}</p><p className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-500"><Clock3 aria-hidden="true" className="h-3.5 w-3.5" />{request.updated}</p></div><Link to="/staff/history" className="inline-flex min-h-11 items-center gap-2 self-start rounded-lg px-3 text-sm font-semibold text-blue-800 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 sm:self-auto">View history <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></article>)}</div>}
      </CardContent>
    </Card>
  </div>
}
