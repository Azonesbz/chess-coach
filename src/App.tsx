import { TrainerScreen } from './features/trainer/TrainerScreen'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-lg font-medium">Chess Coach</h1>
        <p className="text-sm text-slate-400">
          Entraîneur d'ouvertures · Défense sicilienne
        </p>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <TrainerScreen />
      </main>
    </div>
  )
}
