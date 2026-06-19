import { describe, it, expect } from 'vitest'
import { sicilianRepertoire } from './sicilian'
import { isTraineeTurn, movesAfter, pickMainMove } from './repertoire-tree'
import type { RepertoireMove } from './types'

describe('movesAfter', () => {
  it('returns the root moves for an empty line', () => {
    // Arrange
    const line: string[] = []

    // Act
    const moves = movesAfter(sicilianRepertoire, line)

    // Assert
    expect(moves.map((move) => move.san)).toEqual(['e4'])
  })

  it("returns White's replies to the Sicilian", () => {
    // Arrange
    const line = ['e4', 'c5']

    // Act
    const moves = movesAfter(sicilianRepertoire, line)

    // Assert
    expect(moves.map((move) => move.san)).toContain('Nf3')
    expect(moves.length).toBeGreaterThanOrEqual(4)
  })

  it('returns an empty list for an off-book line', () => {
    // Arrange
    const line = ['e4', 'e5']

    // Act
    const moves = movesAfter(sicilianRepertoire, line)

    // Assert
    expect(moves).toEqual([])
  })
})

describe('isTraineeTurn', () => {
  it('is false when the opponent (White) is to move', () => {
    // Arrange
    const line = ['e4', 'c5']

    // Act
    const traineeTurn = isTraineeTurn(sicilianRepertoire, line)

    // Assert
    expect(traineeTurn).toBe(false)
  })

  it('is true when the trainee (Black) is to move', () => {
    // Arrange
    const line = ['e4']

    // Act
    const traineeTurn = isTraineeTurn(sicilianRepertoire, line)

    // Assert
    expect(traineeTurn).toBe(true)
  })
})

describe('pickMainMove', () => {
  it('prefers the best-quality move', () => {
    // Arrange
    const moves: RepertoireMove[] = [
      { san: 'Bc4', quality: 'good', children: [] },
      { san: 'Nf3', quality: 'best', children: [] },
      { san: 'd4', quality: 'sideline', children: [] },
    ]

    // Act
    const main = pickMainMove(moves)

    // Assert
    expect(main?.san).toBe('Nf3')
  })

  it('returns undefined for an empty list', () => {
    // Arrange
    const moves: RepertoireMove[] = []

    // Act
    const main = pickMainMove(moves)

    // Assert
    expect(main).toBeUndefined()
  })
})
