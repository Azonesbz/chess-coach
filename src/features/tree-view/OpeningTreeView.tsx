import { flattenRepertoire } from './tree-layout'
import type { Repertoire } from '../repertoire/types'

export function OpeningTreeView({ repertoire }: { repertoire: Repertoire }) {
  const rows = flattenRepertoire(repertoire.root)
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
      <p className="mb-3 text-sm text-slate-400">
        Arbre des variations · {repertoire.name}
      </p>
      {rows.map((row) => (
        <div key={row.id} className="flex items-stretch">
          {Array.from({ length: row.depth }).map((_, level) => (
            <span
              key={level}
              className="w-[18px] shrink-0 border-l border-slate-800"
            />
          ))}
          <div className="flex items-center gap-2 py-0.5 pl-2">
            <span
              className={`font-mono text-sm ${row.quality === 'best' ? 'text-amber-300' : 'text-slate-200'}`}
            >
              {row.san}
            </span>
            {row.quality === 'best' && (
              <span className="text-xs text-amber-400">★</span>
            )}
            {row.comment && (
              <span className="max-w-[280px] truncate text-xs text-slate-500">
                {row.comment}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
