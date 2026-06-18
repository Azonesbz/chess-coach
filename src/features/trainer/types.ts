import type { RepertoireMove } from '../repertoire/types'

/** Issue de l'évaluation d'un coup du camp entraîné. */
export type MoveVerdict = 'correct' | 'incorrect'

export interface AttemptResult {
  verdict: MoveVerdict
  /** Coups attendus du répertoire à cette position (pour montrer la bonne réponse). */
  expected: RepertoireMove[]
  /** Coup du répertoire correspondant, si le coup joué est correct. */
  played?: RepertoireMove
}
