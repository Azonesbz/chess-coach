import { toNumberedMoves } from './move-list'

export function MoveList({ line }: { line: string[] }) {
  const rows = toNumberedMoves(line)
  if (rows.length === 0) return null
  return (
    <ol className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm text-slate-300">
      {rows.map((row) => (
        <li key={row.number} className="flex gap-1.5">
          <span className="text-slate-500">{row.number}.</span>
          <span>{row.white}</span>
          {row.black && <span>{row.black}</span>}
        </li>
      ))}
    </ol>
  )
}
