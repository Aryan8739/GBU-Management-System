import { useMemo, useState } from 'react'
import { Activity, ArrowDownRight, ArrowUpRight, CheckCircle2, Clock3, Download, Server, ShieldCheck, Users, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

const activityItems = [
  { id: 'EVT-8421', action: 'Officer account created', actor: 'System Admin', area: 'User management', time: 'Today, 10:42 AM', level: 'Info' },
  { id: 'EVT-8418', action: 'Work order marked complete', actor: 'Ramesh Kumar', area: 'Work orders', time: 'Today, 10:16 AM', level: 'Success' },
  { id: 'EVT-8412', action: 'Failed sign-in attempt', actor: 'Unknown user', area: 'Authentication', time: 'Today, 9:54 AM', level: 'Warning' },
  { id: 'EVT-8406', action: 'Service health check passed', actor: 'Monitoring service', area: 'Infrastructure', time: 'Today, 9:30 AM', level: 'Success' },
]

const levelStyle: Record<string, string> = {
  Info: 'border-blue-200 bg-blue-50 text-blue-800',
  Success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  Warning: 'border-amber-200 bg-amber-50 text-amber-800',
}

export function AdminDashboard() {
  const [exportMessage, setExportMessage] = useState('')
  const metrics = [
    { label: 'Accounts', value: '1,284', detail: 'Across all roles', icon: Users, tone: 'bg-violet-50 text-violet-700', delta: '+8.2%', positive: true },
    { label: 'Open requests', value: '36', detail: '12 need assignment', icon: Wrench, tone: 'bg-amber-50 text-amber-800', delta: '−4.1%', positive: true },
    { label: 'Resolved this month', value: '219', detail: '91% within target', icon: CheckCircle2, tone: 'bg-emerald-50 text-emerald-800', delta: '+12.6%', positive: true },
    { label: 'Avg. response time', value: '4.2h', detail: 'Campus-wide average', icon: Clock3, tone: 'bg-blue-50 text-blue-800', delta: '−0.8h', positive: true },
  ]

  const downloadReport = () => {
    const rows = [['Metric', 'Value'], ['Accounts', '1284'], ['Open requests', '36'], ['Resolved this month', '219'], ['Average response time', '4.2 hours']]
    const file = new Blob([rows.map(row => row.join(',')).join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'gbu-cms-overview.csv'
    anchor.click()
    URL.revokeObjectURL(url)
    setExportMessage('Overview report downloaded.')
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold text-indigo-700">System overview</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">Good morning, administrator</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Monitor service activity, review account health, and keep campus maintenance running.</p></div><Button onClick={downloadReport} className="min-h-11 gap-2 self-start bg-indigo-800 text-white hover:bg-indigo-700 sm:self-auto"><Download aria-hidden="true" className="h-4 w-4" />Export overview</Button></section>
      {exportMessage && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">{exportMessage}</p>}

      <section aria-label="System metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(metric => <Card key={metric.label} className="border-slate-200 shadow-sm"><CardContent className="p-5"><div className="flex items-start justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${metric.tone}`}><metric.icon aria-hidden="true" className="h-5 w-5" /></div><span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">{metric.positive ? <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /> : <ArrowDownRight aria-hidden="true" className="h-3.5 w-3.5" />}{metric.delta}</span></div><div className="mt-4 text-3xl font-bold tabular-nums text-slate-950">{metric.value}</div><div className="mt-1 text-sm font-semibold text-slate-800">{metric.label}</div><div className="mt-1 text-xs text-slate-500">{metric.detail}</div></CardContent></Card>)}</section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="border-slate-200 shadow-sm"><CardHeader className="flex flex-row items-start justify-between gap-3"><div><CardTitle className="text-lg font-bold">Service activity</CardTitle><CardDescription>Request volume by week · current month</CardDescription></div><Badge className="border border-emerald-200 bg-emerald-50 text-emerald-800"><Activity aria-hidden="true" className="mr-1 h-3.5 w-3.5" />Live</Badge></CardHeader><CardContent><div role="img" aria-label="Bar chart showing requests rising from 34 in week one to 58 in week four" className="grid h-56 grid-cols-4 items-end gap-4 border-b border-l border-slate-200 px-4 pb-0 pt-4 sm:gap-8">{[{ week: 'Week 1', value: 34, height: '48%' }, { week: 'Week 2', value: 42, height: '61%' }, { week: 'Week 3', value: 49, height: '74%' }, { week: 'Week 4', value: 58, height: '90%' }].map(bar => <div key={bar.week} className="flex h-full flex-col items-center justify-end gap-2"><span className="text-xs font-semibold tabular-nums text-slate-600">{bar.value}</span><div className="w-full max-w-16 rounded-t-md bg-indigo-700 transition-[height]" style={{ height: bar.height }} /><span className="-mb-6 mt-2 text-xs text-slate-500">{bar.week}</span></div>)}</div><div className="mt-10 flex items-center justify-between text-xs text-slate-500"><span>New maintenance requests</span><span className="font-semibold text-slate-700">183 total</span></div></CardContent></Card>

        <Card className="border-slate-200 shadow-sm"><CardHeader><CardTitle className="text-lg font-bold">Platform health</CardTitle><CardDescription>Latest service checks</CardDescription></CardHeader><CardContent className="space-y-4">{[{ name: 'Complaint portal', detail: 'All systems operational', value: '99.98%' }, { name: 'Authentication', detail: 'No active incidents', value: 'Healthy' }, { name: 'Database backups', detail: 'Last backup · 9:30 AM', value: 'Healthy' }].map(service => <div key={service.name} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-3"><div className="flex gap-3"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700"><Server aria-hidden="true" className="h-4 w-4" /></span><div><p className="text-sm font-semibold text-slate-900">{service.name}</p><p className="mt-0.5 text-xs text-slate-500">{service.detail}</p></div></div><span className="text-xs font-bold text-emerald-800">{service.value}</span></div>)}<Link to="/admin/logs" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-indigo-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">Review system logs <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></CardContent></Card>
      </section>

      <Card className="border-slate-200 shadow-sm"><CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-slate-100"><div><CardTitle className="text-lg font-bold">Recent activity</CardTitle><CardDescription>Latest account and service events</CardDescription></div><Link to="/admin/logs" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-indigo-800 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700">View all</Link></CardHeader><CardContent className="divide-y divide-slate-100 p-0">{activityItems.slice(0, 3).map(item => <div key={item.id} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 items-start gap-3"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600"><ShieldCheck aria-hidden="true" className="h-4 w-4" /></span><div className="min-w-0"><p className="text-sm font-semibold text-slate-900">{item.action}</p><p className="mt-0.5 text-xs text-slate-500">{item.actor} · {item.area} · {item.id}</p></div></div><div className="flex items-center justify-between gap-3 sm:justify-end"><Badge className={`${levelStyle[item.level]} border`}>{item.level}</Badge><span className="text-xs text-slate-500">{item.time}</span></div></div>)}</CardContent></Card>
    </div>
  )
}

export function AdminLogsPage() {
  const [level, setLevel] = useState('All events')
  const logs = useMemo(() => level === 'All events' ? activityItems : activityItems.filter(item => item.level === level), [level])
  return <div className="mx-auto max-w-7xl space-y-6"><div><p className="text-sm font-semibold text-indigo-700">Governance</p><h2 className="mt-1 text-2xl font-bold text-slate-950">System logs</h2><p className="mt-2 text-sm text-slate-600">Review account, work-order, and service events.</p></div><Card className="border-slate-200 shadow-sm"><CardHeader className="flex flex-row items-center justify-between gap-4"><div><CardTitle className="text-lg font-bold">Event history</CardTitle><CardDescription>{logs.length} events in this view</CardDescription></div><label className="sr-only" htmlFor="log-level">Filter by severity</label><select id="log-level" value={level} onChange={event => setLevel(event.target.value)} className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700"><option>All events</option><option>Info</option><option>Success</option><option>Warning</option></select></CardHeader><CardContent className="divide-y divide-slate-100 p-0">{logs.map(item => <div key={item.id} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-slate-900">{item.action}</p><p className="mt-1 text-xs text-slate-500">{item.actor} · {item.area} · {item.id}</p></div><div className="flex items-center gap-3"><Badge className={`${levelStyle[item.level]} border`}>{item.level}</Badge><span className="text-xs text-slate-500">{item.time}</span></div></div>)}</CardContent></Card></div>
}

export function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)
  return <div className="mx-auto max-w-4xl space-y-6"><div><p className="text-sm font-semibold text-indigo-700">Configuration</p><h2 className="mt-1 text-2xl font-bold text-slate-950">System settings</h2><p className="mt-2 text-sm text-slate-600">Manage the operational defaults for the campus maintenance portal.</p></div><Card className="border-slate-200 shadow-sm"><CardHeader><CardTitle className="text-lg font-bold">Service preferences</CardTitle><CardDescription>These settings are local demo controls until a system configuration service is connected.</CardDescription></CardHeader><CardContent className="space-y-5"><label className="flex items-start gap-3 rounded-xl border border-slate-200 p-4"><input type="checkbox" defaultChecked className="mt-1 h-4 w-4 accent-indigo-700" /><span><span className="block text-sm font-semibold text-slate-900">Notify officers about urgent requests</span><span className="mt-1 block text-sm text-slate-500">Flag high-priority maintenance requests for review.</span></span></label><label className="flex items-start gap-3 rounded-xl border border-slate-200 p-4"><input type="checkbox" defaultChecked className="mt-1 h-4 w-4 accent-indigo-700" /><span><span className="block text-sm font-semibold text-slate-900">Daily service summary</span><span className="mt-1 block text-sm text-slate-500">Include open, overdue, and completed work orders.</span></span></label><div><label htmlFor="sla" className="mb-2 block text-sm font-semibold text-slate-900">Target first response</label><select id="sla" defaultValue="24" className="min-h-11 w-full max-w-xs rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700"><option value="12">12 hours</option><option value="24">24 hours</option><option value="48">48 hours</option></select></div><Button onClick={() => setSaved(true)} className="min-h-11 bg-indigo-800 text-white hover:bg-indigo-700">Save preferences</Button>{saved && <p role="status" className="text-sm font-medium text-emerald-800">Preferences saved for this session.</p>}</CardContent></Card></div>
}
