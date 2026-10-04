import { useMemo, useState } from 'react'
import { AlertTriangle, ArrowUpRight, CalendarDays, CheckCircle2, Clock3, MapPin, Play, Wrench } from 'lucide-react'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

type TaskStatus = 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED'
type Task = { id: string; title: string; location: string; category: string; priority: 'Urgent' | 'Standard'; due: string; status: TaskStatus }

const starterTasks: Task[] = [
  { id: 'WO-2045', title: 'Repair leaking air-conditioning unit', location: 'Admin Block · Room 102', category: 'Electrical', priority: 'Urgent', due: 'Today, 11:30 AM', status: 'IN_PROGRESS' },
  { id: 'WO-2031', title: 'Replace washroom tap', location: 'Hostel A · Ground floor', category: 'Plumbing', priority: 'Standard', due: 'Today, 2:00 PM', status: 'ASSIGNED' },
  { id: 'WO-2028', title: 'Restore corridor lighting', location: 'Academic Block 2 · Floor 1', category: 'Electrical', priority: 'Standard', due: 'Tomorrow, 10:00 AM', status: 'ASSIGNED' },
  { id: 'WO-2022', title: 'Clear blocked drain', location: 'Sports Complex · West entrance', category: 'Plumbing', priority: 'Standard', due: 'Yesterday', status: 'COMPLETED' },
]

const statusText: Record<TaskStatus, string> = { ASSIGNED: 'Assigned', IN_PROGRESS: 'In progress', COMPLETED: 'Completed' }
const statusStyle: Record<TaskStatus, string> = {
  ASSIGNED: 'border-blue-200 bg-blue-50 text-blue-800',
  IN_PROGRESS: 'border-amber-200 bg-amber-50 text-amber-800',
  COMPLETED: 'border-emerald-200 bg-emerald-50 text-emerald-800',
}

export function TechnicianDashboard() {
  const [tasks, setTasks] = useState(starterTasks)
  const [filter, setFilter] = useState<'ALL' | TaskStatus>('ALL')
  const [notice, setNotice] = useState('')
  const visibleTasks = useMemo(() => filter === 'ALL' ? tasks : tasks.filter(task => task.status === filter), [filter, tasks])
  const activeCount = tasks.filter(task => task.status !== 'COMPLETED').length
  const completedCount = tasks.filter(task => task.status === 'COMPLETED').length
  const urgentCount = tasks.filter(task => task.priority === 'Urgent' && task.status !== 'COMPLETED').length

  const advanceTask = (task: Task) => {
    const nextStatus: TaskStatus = task.status === 'ASSIGNED' ? 'IN_PROGRESS' : 'COMPLETED'
    setTasks(current => current.map(item => item.id === task.id ? { ...item, status: nextStatus } : item))
    setNotice(`${task.id} marked ${statusText[nextStatus].toLowerCase()}.`)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white md:p-8">
        <div aria-hidden="true" className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl"><p className="mb-2 text-sm font-semibold text-amber-300">Field operations</p><h2 className="text-2xl font-bold tracking-tight md:text-3xl">Your work, in one place.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Review assignments, update repair progress, and keep your campus visits on schedule.</p></div>
          <a href="#schedule" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><CalendarDays aria-hidden="true" className="h-4 w-4" />View schedule</a>
        </div>
      </section>

      <section aria-label="Task summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Open assignments', value: activeCount, detail: 'Ready for your attention', icon: Wrench, color: 'text-blue-700', tile: 'bg-blue-50' },
          { label: 'In progress', value: tasks.filter(task => task.status === 'IN_PROGRESS').length, detail: 'Work underway', icon: Clock3, color: 'text-amber-700', tile: 'bg-amber-50' },
          { label: 'Completed', value: completedCount, detail: 'Closed work orders', icon: CheckCircle2, color: 'text-emerald-700', tile: 'bg-emerald-50' },
          { label: 'Urgent', value: urgentCount, detail: 'Prioritize these jobs', icon: AlertTriangle, color: 'text-rose-700', tile: 'bg-rose-50' },
        ].map(stat => <Card key={stat.label} className="border-slate-200 shadow-sm"><CardContent className="flex items-center gap-4 p-5"><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.tile} ${stat.color}`}><stat.icon aria-hidden="true" className="h-5 w-5" /></div><div className="min-w-0"><div className="text-2xl font-bold tabular-nums text-slate-950">{stat.value}</div><div className="text-sm font-semibold text-slate-800">{stat.label}</div><div className="text-xs text-slate-500">{stat.detail}</div></div></CardContent></Card>)}
      </section>

      <section id="tasks" className="scroll-mt-24">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="gap-4 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle className="text-lg font-bold">Assigned work orders</CardTitle><CardDescription>Update a job as you move it from assignment to completion.</CardDescription></div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">Show <select value={filter} onChange={event => setFilter(event.target.value as typeof filter)} className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"><option value="ALL">All tasks</option><option value="ASSIGNED">Assigned</option><option value="IN_PROGRESS">In progress</option><option value="COMPLETED">Completed</option></select></label>
          </CardHeader>
          <CardContent className="space-y-3 p-4 md:p-5">
            {notice && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">{notice}</p>}
            {visibleTasks.length === 0 ? <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center"><p className="font-semibold text-slate-800">No tasks in this view</p><p className="mt-1 text-sm text-slate-500">Choose another status to see your work orders.</p></div> : visibleTasks.map(task => <article key={task.id} className="grid gap-4 rounded-xl border border-slate-200 p-4 transition-colors hover:border-slate-300 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="font-mono text-xs font-semibold text-slate-500">{task.id}</span><Badge className={`${statusStyle[task.status]} border`}>{statusText[task.status]}</Badge>{task.priority === 'Urgent' && <Badge className="border border-rose-200 bg-rose-50 text-rose-800">Urgent</Badge>}</div><h3 className="mt-2 font-semibold text-slate-900">{task.title}</h3><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600"><span className="inline-flex items-center gap-1.5"><MapPin aria-hidden="true" className="h-4 w-4 text-slate-400" />{task.location}</span><span>{task.category}</span><span>Due {task.due}</span></div></div>
              <Button disabled={task.status === 'COMPLETED'} onClick={() => advanceTask(task)} className="min-h-11 w-full gap-2 bg-slate-900 text-white hover:bg-slate-700 md:w-auto">{task.status === 'ASSIGNED' ? <><Play aria-hidden="true" className="h-4 w-4" />Start task</> : task.status === 'IN_PROGRESS' ? <><CheckCircle2 aria-hidden="true" className="h-4 w-4" />Complete task</> : 'Completed'}</Button>
            </article>)}
          </CardContent>
        </Card>
      </section>

      <section id="schedule" className="scroll-mt-24 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="border-slate-200 shadow-sm"><CardHeader><CardTitle className="text-lg font-bold">Today’s route</CardTitle><CardDescription>Planned stops based on assigned work orders.</CardDescription></CardHeader><CardContent className="space-y-4">
          {tasks.filter(task => task.status !== 'COMPLETED').slice(0, 3).map((task, index) => <div key={task.id} className="flex gap-3"><div className="flex flex-col items-center"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800">{index + 1}</div>{index < Math.min(activeCount, 3) - 1 && <div className="my-1 h-7 w-px bg-slate-200" />}</div><div className="min-w-0 pb-2"><p className="text-sm font-semibold text-slate-900">{task.location}</p><p className="mt-0.5 text-xs text-slate-500">{task.due} · {task.title}</p></div></div>)}
          {activeCount === 0 && <p className="text-sm text-slate-500">No remaining stops. Your schedule is clear.</p>}
        </CardContent></Card>
        <Card className="border-amber-200 bg-amber-50/60 shadow-sm"><CardContent className="flex h-full flex-col justify-between gap-5 p-5"><div><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800"><CalendarDays aria-hidden="true" className="h-5 w-5" /></div><h3 className="mt-4 font-bold text-slate-900">Keep work orders current</h3><p className="mt-1 text-sm leading-6 text-slate-600">Update each task when work starts or finishes so officers can follow progress.</p></div><a href="#tasks" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700">Go to task list <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></CardContent></Card>
      </section>
    </div>
  )
}
