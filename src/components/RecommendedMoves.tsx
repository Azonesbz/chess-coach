import type { MoveQuality, RepertoireMove } from '../features/repertoire/types'

const QUALITY_BADGE: Record<MoveQuality, { label: string; className: string }> = {
  best: { label: 'Meilleur', className: 'bg-amber-400/15 text-amber-300' },
  good: { label: 'Bon', className: 'bg-emerald-400/15 text-emerald-300' },
  sideline: { label: 'Annexe', className: 'bg-slate-600/40 text-slate-300' },
}

interface RecommendedMovesProps {
  moves: RepertoireMove[]
  onPick?: (san: string) => void
}

export function RecommendedMoves({ moves, onPick }: RecommendedMovesProps) {
  return (
    <ul className="flex flex-col gap-2">
      {moves.map((move) => {
        const badge = QUALITY_BADGE[move.quality]
        return (
          <li key={move.san}>
            <button
              type="button"
              onClick={() => onPick?.(move.san)}
              className="flex w-full flex-col gap-1 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-left transition hover:border-slate-500 hover:bg-slate-800"
            >
              <span className="flex items-center gap-2">
                <span className="font-mono text-slate-100">{move.san}</span>
                <span
                  className={`rounded px-2 py-0.5 text-xs ${badge.className}`}
                >
                  {badge.label}
                </span>
              </span>
              {move.comment && (
                <span className="text-sm text-slate-400">{move.comment}</span>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
