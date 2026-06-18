import { Chess } from 'chess.js'
import type { PieceColor, San } from './types'

/** Rejoue une ligne depuis la position initiale ; lève si un coup est illégal. */
function replay(sans: San[]): Chess {
  const chess = new Chess()
  for (const san of sans) {
    chess.move(san)
  }
  return chess
}

/** FEN obtenue après avoir joué la ligne (suppose la ligne légale). */
export function fenAfterMoves(sans: San[]): string {
  return replay(sans).fen()
}

/** Camp au trait après la ligne. */
export function turnAfterMoves(sans: San[]): PieceColor {
  return replay(sans).turn() === 'w' ? 'white' : 'black'
}

/** Vrai si tous les coups de la ligne sont légaux dans l'ordre. */
export function isLegalLine(sans: San[]): boolean {
  try {
    replay(sans)
    return true
  } catch {
    return false
  }
}
