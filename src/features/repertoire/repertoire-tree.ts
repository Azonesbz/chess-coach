import { turnAfterMoves } from '../chess/chess-position'
import type { San } from '../chess/types'
import type { MoveQuality, Repertoire, RepertoireMove } from './types'

const QUALITY_RANK: Record<MoveQuality, number> = {
  best: 0,
  good: 1,
  sideline: 2,
}

/** Coups du répertoire disponibles après la ligne (vide si hors-répertoire ou feuille). */
export function movesAfter(
  repertoire: Repertoire,
  line: San[],
): RepertoireMove[] {
  let current = repertoire.root
  for (const san of line) {
    const next = current.find((move) => move.san === san)
    if (!next) return []
    current = next.children
  }
  return current
}

/** Vrai si c'est au camp entraîné de jouer après la ligne. */
export function isTraineeTurn(repertoire: Repertoire, line: San[]): boolean {
  return turnAfterMoves(line) === repertoire.trainee
}

/** Coup « principal » conseillé : meilleure qualité d'abord, ordre stable ensuite. */
export function pickMainMove(
  moves: RepertoireMove[],
): RepertoireMove | undefined {
  return [...moves].sort(
    (a, b) => QUALITY_RANK[a.quality] - QUALITY_RANK[b.quality],
  )[0]
}
