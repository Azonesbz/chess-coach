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

/** Convertit un coup (case de départ → arrivée) en SAN, ou null si illégal. */
export function sanForMove(
  fen: string,
  from: string,
  to: string,
  promotion = 'q',
): San | null {
  const chess = new Chess(fen)
  try {
    return chess.move({ from, to, promotion }).san
  } catch {
    return null
  }
}

/** Cases de départ/arrivée du dernier coup de la ligne (null si vide). */
export function lastMoveSquares(
  sans: San[],
): { from: string; to: string } | null {
  if (sans.length === 0) return null
  const chess = new Chess()
  for (let i = 0; i < sans.length - 1; i += 1) {
    chess.move(sans[i])
  }
  const last = chess.move(sans[sans.length - 1])
  return { from: last.from, to: last.to }
}

/** Case du roi en échec après la ligne, ou null s'il n'y a pas d'échec. */
export function checkedKingSquare(sans: San[]): string | null {
  const chess = replay(sans)
  if (!chess.inCheck()) return null
  const sideInCheck = chess.turn()
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.type === 'k' && cell.color === sideInCheck) return cell.square
    }
  }
  return null
}

/** Case d'arrivée d'un coup SAN dans une position, ou null si illégal. */
export function moveTargetSquare(fen: string, san: San): string | null {
  const chess = new Chess(fen)
  try {
    return chess.move(san).to
  } catch {
    return null
  }
}
