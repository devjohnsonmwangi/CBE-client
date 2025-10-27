import { useEffect, useState } from 'react'

export default function RedirectDebugOverlay() {
  const [events, setEvents] = useState<Array<{frontendBase: string; target: string; ts: number}>>([])

  useEffect(() => {
    if (!(import.meta as any).DEV) return

    const handler = (e: any) => {
      const detail = e?.detail || {}
      setEvents((s) => [{ frontendBase: detail.frontendBase || window.location.origin, target: detail.target || '', ts: Date.now() }, ...s].slice(0, 10))
    }

    window.addEventListener('dev:redirect', handler as EventListener)
    return () => window.removeEventListener('dev:redirect', handler as EventListener)
  }, [])

  if (!(import.meta as any).DEV) return null

  return (
    <div style={{ position: 'fixed', right: 12, bottom: 12, zIndex: 9999 }}>
      <div className="bg-white border rounded shadow p-3 text-xs w-80">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>Dev Redirects</strong>
        </div>
        <div className="mt-2 space-y-2" style={{ maxHeight: 220, overflow: 'auto' }}>
          {events.length === 0 && <div className="text-muted-foreground">No redirects yet</div>}
          {events.map((ev, i) => (
            <div key={ev.ts + i} className="p-2 border rounded bg-slate-50">
              <div><strong>Target:</strong> <span className="break-words">{ev.target}</span></div>
              <div><strong>Base:</strong> <span className="text-muted-foreground">{ev.frontendBase}</span></div>
              <div className="text-xs text-slate-500">{new Date(ev.ts).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
