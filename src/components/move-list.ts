export interface NumberedMove {
  number: number
  white: string
  black?: string
}

/** Regroupe une liste de demi-coups en coups complets numérotés. */
export function toNumberedMoves(line: string[]): NumberedMove[] {
  const rows: NumberedMove[] = []
  for (let i = 0; i < line.length; i += 2) {
    rows.push({ number: i / 2 + 1, white: line[i], black: line[i + 1] })
  }
  return rows
}
