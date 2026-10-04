import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

async function enableMocking() {
  const demoMode = import.meta.env.DEV || import.meta.env.VITE_DEMO_MODE === 'true'
  if (!demoMode) {
    return
  }
  const { worker } = await import('./mocks/browser')
  return worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  })
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
