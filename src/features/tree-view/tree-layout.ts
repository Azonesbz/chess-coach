import type { MoveQuality, RepertoireMove } from '../repertoire/types'

export interface TreeRow {
  /** Clé unique = chemin des SAN depuis la racine. */
  id: string
  san: string
  quality: MoveQuality
  comment?: string
  /** Profondeur (0 = premier coup, joué par les Blancs). */
  depth: number
  isWhite: boolean
}

/** Aplatit l'arbre en pré-ordre (DFS) pour un rendu indenté. */
export function flattenRepertoire(
  moves: RepertoireMove[],
  prefix = '',
  depth = 0,
): TreeRow[] {
  return moves.flatMap((move) => {
    const id = prefix ? `${prefix}/${move.san}` : move.san
    const row: TreeRow = {
      id,
      san: move.san,
      quality: move.quality,
      comment: move.comment,
      depth,
      isWhite: depth % 2 === 0,
    }
    return [row, ...flattenRepertoire(move.children, id, depth + 1)]
  })
}
