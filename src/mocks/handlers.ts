import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock Authentication
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = (await request.json()) as any
    if (username === 'admin' && password === 'admin') {
      return HttpResponse.json({
        token: 'fake-jwt-token-admin',
        user: { id: 1, name: 'Admin Officer', role: 'OFFICER' }
      })
    }
    if (username === 'staff' && password === 'staff') {
      return HttpResponse.json({
        token: 'fake-jwt-token-staff',
        user: { id: 3, name: 'Campus Staff', role: 'STAFF' }
      })
    }
    if (username === 'technician' && password === 'technician') {
      return HttpResponse.json({
        token: 'fake-jwt-token-technician',
        user: { id: 5, name: 'Ramesh Kumar', role: 'TECHNICIAN' }
      })
    }
    if (username === 'superadmin' && password === 'superadmin') {
      return HttpResponse.json({
        token: 'fake-jwt-token-superadmin',
        user: { id: 4, name: 'System Admin', role: 'ADMIN' }
      })
    }
    return HttpResponse.json({
      token: 'fake-jwt-token-user',
      user: { id: 2, name: 'John Doe', role: 'STUDENT' }
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
