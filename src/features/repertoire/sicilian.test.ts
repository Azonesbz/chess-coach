import { describe, it, expect } from 'vitest'
import { isLegalLine } from '../chess/chess-position'
import { sicilianRepertoire } from './sicilian'
import type { RepertoireMove } from './types'

/** Toutes les lignes racine→nœud sous forme de séquences de SAN. */
function collectLines(
  moves: RepertoireMove[],
  prefix: string[] = [],
): string[][] {
  return moves.flatMap((move) => {
    const line = [...prefix, move.san]
    return [line, ...collectLines(move.children, line)]
  })
}

describe('sicilianRepertoire', () => {
  it('trains the Black side', () => {
    // Arrange
    const repertoire = sicilianRepertoire

    // Act
    const { trainee } = repertoire

    // Assert
    expect(trainee).toBe('black')
  })

  it('starts every line with 1.e4 c5', () => {
    // Arrange
    const firstWhiteMove = sicilianRepertoire.root[0]

    // Act
    const firstBlackReply = firstWhiteMove.children[0]

    // Assert
    expect(firstWhiteMove.san).toBe('e4')
    expect(firstBlackReply.san).toBe('c5')
  })

  it('contains only legal move sequences', () => {
    // Arrange
    const lines = collectLines(sicilianRepertoire.root)

    // Act
    const illegalLines = lines.filter((line) => !isLegalLine(line))

    // Assert
    expect(illegalLines).toEqual([])
  })

  it('exposes a non-trivial tree of variations', () => {
    // Arrange
    const lines = collectLines(sicilianRepertoire.root)

    // Act
    const deepestLine = lines.reduce(
      (longest, line) => (line.length > longest.length ? line : longest),
      [] as string[],
    )

    // Assert
    expect(lines.length).toBeGreaterThan(15)
    expect(deepestLine.length).toBeGreaterThanOrEqual(10)
  })
})
