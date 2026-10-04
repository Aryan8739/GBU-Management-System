import { Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <Outlet />
    </div>
  )
}
