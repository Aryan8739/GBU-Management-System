import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import { LoginPage } from '../features/auth/LoginPage'
import { LandingPage } from '../features/public/LandingPage'
import { DocumentationPage } from '../features/public/DocumentationPage'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { UserDashboard } from '../features/complaints/UserDashboard'
import { RegisterComplaint } from '../features/complaints/RegisterComplaint'
import { ComplaintsHistory } from '../features/complaints/ComplaintsHistory'
import { OfficerLayout } from '../layouts/OfficerLayout'
import { OfficerDashboard } from '../features/workOrders/OfficerDashboard'
import { StaffLayout } from '../layouts/StaffLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import { TechnicianLayout } from '../layouts/TechnicianLayout'
import { TechnicianDashboard } from '../features/workOrders/TechnicianDashboard'
import { AdminDashboard, AdminLogsPage, AdminSettingsPage } from '../features/admin/AdminDashboard'
import { StaffDashboard } from '../features/staff/StaffDashboard'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'docs',
        element: <DocumentationPage />
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <UserDashboard />
          },
          {
            path: 'register',
            element: <RegisterComplaint />
          },
          {
            path: 'history',
            element: <ComplaintsHistory />
          }
        ]
      },
      {
        path: 'officer',
        element: <OfficerLayout />,
        children: [
          {
            index: true,
            element: <OfficerDashboard />
          },
          {
            path: 'complaints',
            element: <div className="p-8">All Complaints Management</div>
          },
          {
            path: 'technicians',
            element: <div className="p-8">Technicians Directory</div>
          }
        ]
      },
      {
        path: 'technician',
        element: <TechnicianLayout />,
        children: [
          { index: true, element: <TechnicianDashboard /> },
        ]
      },
      {
        path: 'staff',
        element: <StaffLayout />,
        children: [
          {
            index: true,
            element: <StaffDashboard />
          },
          {
            path: 'register',
            element: <RegisterComplaint />
          },
          {
            path: 'history',
            element: <ComplaintsHistory />
          },
          {
            path: 'settings',
            element: <div className="p-8">Staff Settings</div>
          }
        ]
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />
          },
          {
            path: 'logs',
            element: <AdminLogsPage />
          },
          {
            path: 'settings',
            element: <AdminSettingsPage />
          }
        ]
      }
    ]
  }
])
