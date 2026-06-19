import { describe, it, expect } from 'vitest'
import {
  checkedKingSquare,
  fenAfterMoves,
  isLegalLine,
  lastMoveSquares,
  moveTargetSquare,
  sanForMove,
  turnAfterMoves,
} from './chess-position'

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
// chess.js suit la règle stricte : champ en passant rempli seulement si une
// prise e.p. est réellement possible — ici aucune, d'où "-".
const AFTER_E4_C5 = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2'

describe('fenAfterMoves', () => {
  it('returns the standard start position for an empty line', () => {
    // Arrange
    const line: string[] = []

    // Act
    const fen = fenAfterMoves(line)

    // Assert
    expect(fen).toBe(START_FEN)
  })

  it('replays a Sicilian line into the matching FEN', () => {
    // Arrange
    const line = ['e4', 'c5']

    // Act
    const fen = fenAfterMoves(line)

    // Assert
    expect(fen).toBe(AFTER_E4_C5)
  })
})

describe('isLegalLine', () => {
  it('accepts a legal sequence of moves', () => {
    // Arrange
    const line = ['e4', 'c5', 'Nf3', 'd6']

    // Act
    const legal = isLegalLine(line)

    // Assert
    expect(legal).toBe(true)
  })

  it('rejects a sequence containing an illegal move', () => {
    // Arrange
    const line = ['e4', 'e4']

    // Act
    const legal = isLegalLine(line)

    // Assert
    expect(legal).toBe(false)
  })
})

describe('turnAfterMoves', () => {
  it('is white to move at the start', () => {
    // Arrange
    const line: string[] = []

    // Act
    const turn = turnAfterMoves(line)

    // Assert
    expect(turn).toBe('white')
  })

  it('is black to move after one white move', () => {
    // Arrange
    const line = ['e4']

    // Act
    const turn = turnAfterMoves(line)

    // Assert
    expect(turn).toBe('black')
  })
})

describe('sanForMove', () => {
  it('converts a legal from/to drop into SAN', () => {
    // Arrange
    const fen = START_FEN

    // Act
    const san = sanForMove(fen, 'g1', 'f3')

    // Assert
    expect(san).toBe('Nf3')
  })

  it('returns null for an illegal drop', () => {
    // Arrange
    const fen = START_FEN

    // Act
    const san = sanForMove(fen, 'e2', 'e5')

    // Assert
    expect(san).toBeNull()
  })
})

describe('lastMoveSquares', () => {
  it('returns the from/to of the last move played', () => {
    // Arrange
    const line = ['e4', 'c5']

    // Act
    const squares = lastMoveSquares(line)

    // Assert
    expect(squares).toEqual({ from: 'c7', to: 'c5' })
  })

  it('returns null for an empty line', () => {
    // Arrange
    const line: string[] = []

    // Act
    const squares = lastMoveSquares(line)

    // Assert
    expect(squares).toBeNull()
  })
})

describe('checkedKingSquare', () => {
  it('returns the square of the king in check', () => {
    // Arrange
    const line = ['e4', 'c5', 'Nf3', 'd6', 'Bb5+']

    // Act
    const square = checkedKingSquare(line)

    // Assert
    expect(square).toBe('e8')
  })

  it('returns null when no king is in check', () => {
    // Arrange
    const line = ['e4', 'c5']

    // Act
    const square = checkedKingSquare(line)

    // Assert
    expect(square).toBeNull()
  })
})

describe('moveTargetSquare', () => {
  it('returns the destination square of a SAN move', () => {
    // Arrange
    const fen = fenAfterMoves(['e4', 'c5', 'Nf3', 'd6', 'Bb5+'])

    // Act
    const square = moveTargetSquare(fen, 'Bd7')

    // Assert
    expect(square).toBe('d7')
  })

  it('returns null for a move that is not legal in the position', () => {
    // Arrange
    const fen = START_FEN

    // Act
    const square = moveTargetSquare(fen, 'Bd7')

    // Assert
    expect(square).toBeNull()
  })
})
