import { useState } from 'react'
import { TrainerScreen } from './features/trainer/TrainerScreen'
import { OpeningTreeView } from './features/tree-view/OpeningTreeView'
import { sicilianRepertoire } from './features/repertoire/sicilian'

type Mode = 'practice' | 'explore'

const TABS: { id: Mode; label: string }[] = [
  { id: 'practice', label: 'Entraînement' },
  { id: 'explore', label: 'Explorer' },
]

export default function App() {
  const [mode, setMode] = useState<Mode>('practice')
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="flex flex-wrap items-center gap-4 border-b border-slate-800 px-6 py-4">
        <div className="mr-auto flex items-center gap-3">
          <div
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-xl text-amber-400"
          >
            ♞
          </div>
          <div>
            <h1 className="text-lg leading-tight font-medium">Chess Coach</h1>
            <p className="text-sm text-slate-400">
              Entraîneur d'ouvertures · Défense sicilienne
            </p>
          </div>
        </div>
        <nav className="flex gap-1 rounded-lg border border-slate-800 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                mode === tab.id
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        {mode === 'practice' ? (
          <TrainerScreen />
        ) : (
          <OpeningTreeView repertoire={sicilianRepertoire} />
        )}
      </main>
    </div>
  )
}
