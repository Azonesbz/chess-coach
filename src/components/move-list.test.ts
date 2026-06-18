import { describe, it, expect } from 'vitest'
import { toNumberedMoves } from './move-list'

describe('toNumberedMoves', () => {
  it('pairs plies into numbered full moves', () => {
    // Arrange
    const line = ['e4', 'c5', 'Nf3', 'd6', 'Bb5+']

    // Act
    const rows = toNumberedMoves(line)

    // Assert
    expect(rows).toEqual([
      { number: 1, white: 'e4', black: 'c5' },
      { number: 2, white: 'Nf3', black: 'd6' },
      { number: 3, white: 'Bb5+', black: undefined },
    ])
  })

  it('returns an empty list for an empty line', () => {
    // Arrange
    const line: string[] = []

    // Act
    const rows = toNumberedMoves(line)

    // Assert
    expect(rows).toEqual([])
  })
})
