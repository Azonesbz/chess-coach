import type { CSSProperties } from 'react'

/** Couleurs des cases (fixes : valables en thème clair comme sombre). */
export const SQUARE_COLORS = {
  light: '#dbe1ea',
  dark: '#6d7f9d',
} as const

/** Couleurs de surbrillance par rôle. */
export const HIGHLIGHT = {
  lastMove: 'rgba(233, 200, 121, 0.75)',
  check: 'rgba(227, 149, 149, 0.85)',
  suggestion: 'rgba(233, 168, 46, 0.85)',
} as const

export interface BoardHighlights {
  /** Cases de départ/arrivée du dernier coup. */
  lastMove?: { from: string; to: string }
  /** Case du roi en échec. */
  check?: string
  /** Cases d'arrivée des coups conseillés. */
  suggestions?: string[]
}

/** Construit les styles par case attendus par react-chessboard. */
export function buildSquareStyles(
  highlights: BoardHighlights,
): Record<string, CSSProperties> {
  const styles: Record<string, CSSProperties> = {}
  const { lastMove, check, suggestions } = highlights

  if (lastMove) {
    styles[lastMove.from] = { backgroundColor: HIGHLIGHT.lastMove }
    styles[lastMove.to] = { backgroundColor: HIGHLIGHT.lastMove }
  }
  for (const square of suggestions ?? []) {
    styles[square] = {
      background: `radial-gradient(circle, ${HIGHLIGHT.suggestion} 22%, transparent 24%)`,
    }
  }
  if (check) {
    styles[check] = { backgroundColor: HIGHLIGHT.check }
  }
  return styles
}
