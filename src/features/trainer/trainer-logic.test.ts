import { describe, it, expect } from 'vitest'
import { sicilianRepertoire } from '../repertoire/sicilian'
import { attemptMove, isLineComplete, opponentReply } from './trainer-logic'

const NAJDORF_LEAF = [
  'e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4',
  'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be3', 'e5',
]

describe('attemptMove', () => {
  it('accepts a move that is in the repertoire', () => {
    // Arrange
    const line = ['e4']

    // Act
    const result = attemptMove(sicilianRepertoire, line, 'c5')

    // Assert
    expect(result.verdict).toBe('correct')
    expect(result.played?.san).toBe('c5')
  })

  it('rejects an off-book move but still reports the expected ones', () => {
    // Arrange
    const line = ['e4']

    // Act
    const result = attemptMove(sicilianRepertoire, line, 'e5')

    // Assert
    expect(result.verdict).toBe('incorrect')
    expect(result.played).toBeUndefined()
    expect(result.expected.map((move) => move.san)).toContain('c5')
  })
})

describe('opponentReply', () => {
  it('plays 1.e4 from the start', () => {
    // Arrange
    const line: string[] = []

    // Act
    const reply = opponentReply(sicilianRepertoire, line)

    // Assert
    expect(reply?.san).toBe('e4')
  })

  it('plays the main line against the Sicilian', () => {
    // Arrange
    const line = ['e4', 'c5']

    // Act
    const reply = opponentReply(sicilianRepertoire, line)

    // Assert
    expect(reply?.san).toBe('Nf3')
  })

  it('returns undefined at the end of a line', () => {
    // Arrange
    const line = NAJDORF_LEAF

    // Act
    const reply = opponentReply(sicilianRepertoire, line)

    // Assert
    expect(reply).toBeUndefined()
  })
})

describe('isLineComplete', () => {
  it('is true at a leaf position', () => {
    // Arrange
    const line = NAJDORF_LEAF

    // Act
    const complete = isLineComplete(sicilianRepertoire, line)

    // Assert
    expect(complete).toBe(true)
  })

  it('is false mid-line', () => {
    // Arrange
    const line = ['e4']

    // Act
    const complete = isLineComplete(sicilianRepertoire, line)

    // Assert
    expect(complete).toBe(false)
  })
})
