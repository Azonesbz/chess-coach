import { movesAfter, pickMainMove } from '../repertoire/repertoire-tree'
import type { San } from '../chess/types'
import type { Repertoire, RepertoireMove } from '../repertoire/types'
import type { AttemptResult } from './types'

/** Évalue le coup du camp entraîné (SAN) contre le répertoire à la position courante. */
export function attemptMove(
  repertoire: Repertoire,
  line: San[],
  san: San,
): AttemptResult {
  const expected = movesAfter(repertoire, line)
  const played = expected.find((move) => move.san === san)
  return {
    verdict: played ? 'correct' : 'incorrect',
    expected,
    played,
  }
}

/** Coup adverse joué automatiquement (ligne principale), ou undefined en fin de ligne. */
export function opponentReply(
  repertoire: Repertoire,
  line: San[],
): RepertoireMove | undefined {
  return pickMainMove(movesAfter(repertoire, line))
}

/** Vrai si plus aucun coup du répertoire n'est disponible (feuille atteinte). */
export function isLineComplete(repertoire: Repertoire, line: San[]): boolean {
  return movesAfter(repertoire, line).length === 0
}
