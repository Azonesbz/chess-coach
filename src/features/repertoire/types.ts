import type { PieceColor, San } from '../chess/types'

/** Qualité/recommandation d'un coup dans le répertoire. */
export type MoveQuality = 'best' | 'good' | 'sideline'

/**
 * Un nœud de l'arbre d'ouverture : un coup et ses suites.
 * Les `children` alternent les camps (coup adverse, puis le nôtre, etc.).
 */
export interface RepertoireMove {
  san: San
  quality: MoveQuality
  comment?: string
  children: RepertoireMove[]
}

/** Un répertoire complet pour un camp donné. */
export interface Repertoire {
  id: string
  name: string
  description: string
  /** Camp entraîné (le « héros »). */
  trainee: PieceColor
  /** Premiers coups (camp des Blancs, qui commencent). */
  root: RepertoireMove[]
}
