import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { ClipboardList, AlertTriangle, Hammer, CheckCircle2, ArrowUpRight, Download, Filter } from 'lucide-react'
import { useState } from 'react'

export function OfficerDashboard() {
  const [assignedIds, setAssignedIds] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [reportMessage, setReportMessage] = useState('')
  const { data: complaints, isLoading } = useQuery({
    queryKey: ['complaints'],
    queryFn: async () => {
      const res = await fetch('/api/complaints')
      return res.json()
    }
  })

  // Simulated dashboard counts based on data
  const total = complaints?.length || 0
  const unassigned = complaints?.filter((c: any) => c.status === 'REGISTERED' && !assignedIds.includes(String(c.id))).length || 0
  const inProgress = (complaints?.filter((c: any) => c.status === 'IN_PROGRESS').length || 0) + assignedIds.length
  const resolved = complaints?.filter((c: any) => c.status === 'RESOLVED').length || 0

  const exportReport = () => {
    const rows = [['Request ID', 'Category', 'Location', 'Status'], ...(complaints || []).map((complaint: any) => [complaint.id, complaint.category, complaint.location, complaint.status])]
    const url = URL.createObjectURL(new Blob([rows.map(row => row.join(',')).join('\n')], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'campus-requests.csv'
    anchor.click()
    URL.revokeObjectURL(url)
    setReportMessage('Request report downloaded.')
  }

  return (
    <div className="space-y-8" style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif" }}>
      {/* Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 to-[#1E3A8A] text-white rounded-2xl overflow-hidden p-6 shadow-lg">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #fff 0%, transparent 60%)' }} />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-blue-200 text-sm mb-1 font-semibold">Overview</p>
            <h2 className="text-2xl font-bold">Officer Command Center</h2>
            <p className="text-blue-200 text-sm mt-1 max-w-lg">
              Review new requests, assign work orders to technicians, and monitor completion rates across campus zones.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button onClick={exportReport} variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white shadow-sm flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Report
            </Button>
          </div>
        </div>
      </div>
      {reportMessage && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">{reportMessage}</p>}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: total || 128, icon: ClipboardList, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', trend: 'All active' },
          { label: 'Unassigned', value: unassigned || 14, icon: AlertTriangle, iconBg: 'bg-red-50', iconColor: 'text-red-600', trend: 'Requires action' },
          { label: 'In Progress', value: inProgress || 45, icon: Hammer, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', trend: 'With technicians' },
          { label: 'Resolved Today', value: resolved || 12, icon: CheckCircle2, iconBg: 'bg-green-50', iconColor: 'text-green-600', trend: 'Verified repairs' },
        ].map(stat => (
          <Card key={stat.label} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white rounded-xl">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center border border-slate-100`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-xs font-semibold text-slate-700">{stat.label}</div>
              <div className="text-[11px] text-slate-400 mt-1">{stat.trend}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Complaints Data Table */}
      <Card className="shadow-sm border border-slate-200 rounded-xl overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4 flex flex-row flex-wrap items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">Recent Complaints</CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-1">
              Assign work orders for new maintenance requests.
            </CardDescription>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600"><Filter aria-hidden="true" className="h-4 w-4" /><span className="sr-only">Filter requests by status</span><select value={statusFilter} onChange={event => setStatusFilter(event.target.value)} className="min-h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"><option value="ALL">All statuses</option><option value="REGISTERED">New</option><option value="VERIFIED">Verified</option><option value="IN_PROGRESS">In progress</option><option value="RESOLVED">Resolved</option></select></label>
        </CardHeader>
        
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-slate-500 font-medium flex items-center justify-center gap-3">
              <svg className="animate-spin w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
              </svg>
              Loading data...
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-100">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[100px] text-xs font-bold text-slate-500 uppercase tracking-wider h-10">ID</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider h-10">Category</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider h-10">Location</TableHead>
                  <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider h-10">Status</TableHead>
                  <TableHead className="text-right text-xs font-bold text-slate-500 uppercase tracking-wider h-10">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints?.filter((complaint: any) => statusFilter === 'ALL' || (assignedIds.includes(String(complaint.id)) ? 'VERIFIED' : complaint.status) === statusFilter).slice(0, 8).map((complaint: any) => (
                  <TableRow key={complaint.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                    <TableCell className="font-mono text-xs text-slate-500">{complaint.id}</TableCell>
                    <TableCell>
                      <div className="font-semibold text-slate-900 text-sm">{complaint.category}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px] mt-0.5" title={complaint.description}>
                        {complaint.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{complaint.location}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                        (assignedIds.includes(String(complaint.id)) || complaint.status === 'VERIFIED') ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        complaint.status === 'REGISTERED' ? 'bg-red-50 text-red-700 border-red-200' :
                        complaint.status === 'IN_PROGRESS' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {assignedIds.includes(String(complaint.id)) ? 'VERIFIED' : complaint.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {complaint.status === 'REGISTERED' && !assignedIds.includes(String(complaint.id)) ? (
                        <Button onClick={() => setAssignedIds(current => [...current, String(complaint.id)])} size="sm" className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white shadow-sm font-semibold h-8 rounded-md px-3 text-xs">
                          Assign
                        </Button>
                      ) : (
                        <Link to="/officer/complaints" className="inline-flex h-8 items-center rounded-md px-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700">View</Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Fallback mock rows if API is empty */}
                {(!complaints || complaints.length === 0) && (
                  <TableRow className="hover:bg-slate-50/80 transition-colors">
                    <TableCell className="font-mono text-xs text-slate-500">C-1042</TableCell>
                    <TableCell>
                      <div className="font-semibold text-slate-900 text-sm">Electrical</div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px] mt-0.5">Air conditioner leaking water</div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">Admin Block, Room 102</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border bg-red-50 text-red-700 border-red-200">
                        REGISTERED
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white shadow-sm font-semibold h-8 rounded-md px-3 text-xs">
                        Assign
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
    </div>
  )
}
