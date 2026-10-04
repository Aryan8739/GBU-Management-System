import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock Authentication
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = await request.json() as { username?: string; password?: string }
    const accounts = [
      { username: 'student', password: 'student', id: 2, name: 'John Doe', role: 'STUDENT' },
      { username: 'officer', password: 'officer', id: 1, name: 'Admin Officer', role: 'OFFICER' },
      { username: 'admin', password: 'admin', id: 1, name: 'Admin Officer', role: 'OFFICER' },
      { username: 'staff', password: 'staff', id: 3, name: 'Campus Staff', role: 'STAFF' },
      { username: 'technician', password: 'technician', id: 5, name: 'Ramesh Kumar', role: 'TECHNICIAN' },
      { username: 'superadmin', password: 'superadmin', id: 4, name: 'System Admin', role: 'ADMIN' },
    ] as const
    const account = accounts.find(candidate => candidate.username === username && candidate.password === password)
    if (!account) {
      return HttpResponse.json({ message: 'Invalid demo username or password.' }, { status: 401 })
    }
    return HttpResponse.json({
      token: `fake-jwt-token-${account.role.toLowerCase()}`,
      user: { id: account.id, name: account.name, role: account.role },
    })
  }),

  // Mock Complaints
  http.get('/api/complaints', () => {
    return HttpResponse.json([
      { id: 'C-1001', category: 'Plumbing', status: 'REGISTERED', location: 'Hostel A', description: 'Leaking tap' },
      { id: 'C-1002', category: 'Electrical', status: 'VERIFIED', location: 'Academic Block 1', description: 'Fan not working' }
    ])
  })
]
