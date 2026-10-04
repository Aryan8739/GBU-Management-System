import { useState } from 'react'
import { Search, Filter, MapPin, Tag, ChevronRight, AlertCircle } from 'lucide-react'
import { Card } from '../../components/ui/card'
import { Input } from '../../components/ui/input'

const MOCK_COMPLAINTS = [
  {
    id: 'C-1001', category: 'Electrical', location: 'Hostel A, Room 204',
    description: 'The ceiling fan stopped working and there\'s a flickering light.',
    status: 'VERIFIED', priority: 'High', date: '2026-10-01',
    assignedTo: 'Er. Ramesh Kumar',
  },
  {
    id: 'C-1002', category: 'Plumbing', location: 'Academic Block 3, Floor 2',
    description: 'Leaking pipe near the washroom causing water logging.',
    status: 'IN_PROGRESS', priority: 'Medium', date: '2026-10-02',
    assignedTo: 'Suresh Mishra',
  },
  {
    id: 'C-1003', category: 'Civil', location: 'Library Building',
    description: 'A window pane is broken and glass is on the floor.',
    status: 'REGISTERED', priority: 'Low', date: '2026-10-03',
    assignedTo: null,
  },
  {
    id: 'C-1004', category: 'Horticulture', location: 'Main Gate Garden',
    description: 'Dead plants need to be removed near the main gate.',
    status: 'RESOLVED', priority: 'Low', date: '2026-09-28',
    assignedTo: 'Mohan Lal',
  },
  {
    id: 'C-1005', category: 'Electrical', location: 'Sports Complex',
    description: 'Street lights not working near the basketball court.',
    status: 'RESOLVED', priority: 'Medium', date: '2026-09-25',
    assignedTo: 'Er. Ramesh Kumar',
  },
]

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  REGISTERED:  { label: 'Registered',  color: 'text-amber-700',  bg: 'bg-amber-50 border-amber-200',   dot: 'bg-amber-400'  },
  VERIFIED:    { label: 'Verified',    color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-200',      dot: 'bg-blue-500'   },
  IN_PROGRESS: { label: 'In Progress', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200',  dot: 'bg-purple-500' },
  RESOLVED:    { label: 'Resolved',    color: 'text-green-700',  bg: 'bg-green-50 border-green-200',    dot: 'bg-green-500'  },
  REJECTED:    { label: 'Rejected',    color: 'text-red-700',    bg: 'bg-red-50 border-red-200',        dot: 'bg-red-500'    },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.REGISTERED
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

export function ComplaintsHistory() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = MOCK_COMPLAINTS
    .filter(c => statusFilter === 'ALL' || c.status === statusFilter)
    .filter(c =>
      search === '' ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by ID, category, or location..."
            className="pl-9 h-10 bg-white border-slate-200"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          {['ALL', 'REGISTERED', 'VERIFIED', 'IN_PROGRESS', 'RESOLVED'].map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                statusFilter === f ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              {f === 'ALL' ? 'All' : STATUS_CONFIG[f]?.label ?? f}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <Card className="border border-slate-200 shadow-sm bg-white rounded-xl overflow-hidden">
        <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {filtered.length} complaint{filtered.length !== 1 ? 's' : ''} found
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="w-10 h-10 text-slate-200 mb-3" />
            <p className="text-slate-500 font-medium">No complaints match your search</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting the filter or search query.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filtered.map(c => (
              <div key={c.id} className="px-6 py-4 hover:bg-slate-50/70 cursor-pointer transition-colors flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                  {c.category[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-xs text-slate-400">{c.id}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">{c.date}</span>
                  </div>
                  <div className="font-semibold text-slate-900 text-sm truncate">{c.category} — {c.description.slice(0, 60)}...</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {c.location}
                    </span>
                    {c.assignedTo && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {c.assignedTo}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={c.status} />
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
