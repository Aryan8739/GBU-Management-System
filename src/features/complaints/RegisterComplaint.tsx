import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, Upload, AlertCircle, MapPin, Tag, FileText } from 'lucide-react'

const CATEGORIES = [
  { value: 'electrical', label: 'Electrical Maintenance', description: 'Fans, lights, wiring, sockets' },
  { value: 'civil', label: 'Civil Maintenance', description: 'Walls, doors, windows, flooring' },
  { value: 'plumbing', label: 'Plumbing', description: 'Taps, pipes, drainage, water supply' },
  { value: 'horticulture', label: 'Horticulture', description: 'Gardens, plants, green areas' },
  { value: 'it', label: 'IT & Network', description: 'Wi-Fi, computers, network points' },
  { value: 'sanitation', label: 'Sanitation & Hygiene', description: 'Cleaning, washrooms, waste' },
]

const REGIONS = [
  { value: 'hostel_a', label: 'Hostel A (Boys)' },
  { value: 'hostel_b', label: 'Hostel B (Boys)' },
  { value: 'hostel_c', label: 'Hostel C (Girls)' },
  { value: 'academic_block_1', label: 'Academic Block 1' },
  { value: 'academic_block_2', label: 'Academic Block 2' },
  { value: 'academic_block_3', label: 'Academic Block 3' },
  { value: 'library', label: 'Library Building' },
  { value: 'sports', label: 'Sports Complex' },
  { value: 'admin', label: 'Administrative Block' },
  { value: 'cafeteria', label: 'Cafeteria / Mess' },
]

const PRIORITIES = [
  { value: 'low', label: 'Low', desc: 'Can wait a few days', color: 'border-slate-200 text-slate-600' },
  { value: 'medium', label: 'Medium', desc: 'Should be fixed soon', color: 'border-amber-300 text-amber-700' },
  { value: 'high', label: 'High', desc: 'Urgent, affects daily use', color: 'border-red-300 text-red-700' },
]

export function RegisterComplaint() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const dashboardPath = location.pathname.startsWith('/staff') ? '/staff' : '/dashboard'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      const id = `C-${Math.floor(1000 + Math.random() * 9000)}`
      setTicketId(id)
      setSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  // Success screen
  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Complaint Registered!</h2>
        <p className="text-slate-500 mb-6">Your complaint has been logged successfully. You'll receive updates as the status changes.</p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8">
          <div className="text-xs text-slate-500 mb-1">Your Ticket ID</div>
          <div className="text-2xl font-mono font-bold text-primary">{ticketId}</div>
          <div className="text-xs text-slate-400 mt-1">Keep this for tracking</div>
        </div>
        <div className="flex flex-col gap-3">
          <Button onClick={() => navigate(dashboardPath)} className="w-full">Back to Dashboard</Button>
          <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); setSelectedCategory(''); setSelectedPriority(''); setFileName(null) }} className="w-full">
            Submit Another
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Progress Steps */}
      <div className="flex items-center gap-0 mb-8">
        {['Issue Details', 'Location', 'Review & Submit'].map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                step > i + 1 ? 'bg-primary border-primary text-white' :
                step === i + 1 ? 'border-primary text-primary bg-primary/5' :
                'border-slate-200 text-slate-300'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-[10px] mt-1.5 font-medium ${step >= i + 1 ? 'text-primary' : 'text-slate-300'}`}>{s}</span>
            </div>
            {i < 2 && <div className={`flex-1 h-0.5 mb-5 mx-2 ${step > i + 1 ? 'bg-primary' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardHeader className="border-b border-slate-100 px-6 py-5 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900">Register a Complaint</CardTitle>
              <CardDescription className="text-xs mt-0.5">Fill out the form to log a campus maintenance request.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">

            {step === 1 && (
              <>
                {/* Category */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-slate-400" /> Complaint Category *
                  </Label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {CATEGORIES.map(cat => (
                      <button
                        type="button"
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`text-left p-3 border-2 rounded-xl transition-all ${
                          selectedCategory === cat.value
                            ? 'border-primary bg-primary/5'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className={`text-sm font-semibold mb-0.5 ${selectedCategory === cat.value ? 'text-primary' : 'text-slate-800'}`}>
                          {cat.label}
                        </div>
                        <div className="text-[11px] text-slate-400">{cat.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-400" /> Priority Level *
                  </Label>
                  <div className="flex gap-3">
                    {PRIORITIES.map(p => (
                      <button
                        type="button"
                        key={p.value}
                        onClick={() => setSelectedPriority(p.value)}
                        className={`flex-1 p-3 border-2 rounded-xl text-center transition-all ${
                          selectedPriority === p.value
                            ? `border-current bg-opacity-10 ${p.color} bg-current/5`
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`text-sm font-bold ${selectedPriority === p.value ? p.color : 'text-slate-700'}`}>{p.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{p.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">Description *</Label>
                  <Textarea
                    placeholder="Describe the issue in detail. Include what's wrong, when it started, and how it affects you..."
                    className="min-h-[110px] text-sm resize-none"
                    required
                  />
                  <p className="text-xs text-slate-400">The more detail you provide, the faster we can resolve it.</p>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Region */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Campus Region *
                  </Label>
                  <Select required>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select campus area" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map(r => (
                        <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Specific Location */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">Specific Location / Room No. *</Label>
                  <Input placeholder="e.g. Room 204, 2nd Floor, Block B" className="h-11" required />
                  <p className="text-xs text-slate-400">Be as specific as possible to help our team locate the issue quickly.</p>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">Attach Photo / Evidence (Optional)</Label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                      dragOver ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => {
                      e.preventDefault()
                      setDragOver(false)
                      const file = e.dataTransfer.files[0]
                      if (file) setFileName(file.name)
                    }}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    {fileName ? (
                      <div className="flex items-center justify-center gap-2 text-primary font-medium">
                        <CheckCircle className="w-5 h-5" /> {fileName}
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm text-slate-500 font-medium">Drag & drop or <span className="text-primary">browse</span></p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG, PDF up to 10MB</p>
                      </>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) setFileName(file.name)
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-700">Review Your Submission</h3>
                  {[
                    { label: 'Category', value: CATEGORIES.find(c => c.value === selectedCategory)?.label || '—' },
                    { label: 'Priority', value: selectedPriority || '—' },
                    { label: 'Attachment', value: fileName || 'None' },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">{row.label}</span>
                      <span className="text-sm font-semibold text-slate-800">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">By submitting, you confirm that the information provided is accurate. False reports may result in disciplinary action.</p>
                </div>
              </div>
            )}
          </CardContent>

          {/* Footer Buttons */}
          <div className="px-6 pb-6 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => step > 1 ? setStep(s => s - 1) : navigate(dashboardPath)}
            >
              {step > 1 ? 'Back' : 'Cancel'}
            </Button>

            {step < 3 ? (
              <Button
                type="button"
                onClick={() => setStep(s => s + 1)}
                disabled={step === 1 && (!selectedCategory || !selectedPriority)}
              >
                Continue
              </Button>
            ) : (
              <Button type="submit" disabled={submitting} className="min-w-[140px]">
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
                    </svg>
                    Submitting...
                  </span>
                ) : 'Submit Complaint'}
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
