import { describe, it, expect } from 'vitest'
import { buildSquareStyles, HIGHLIGHT } from './board-theme'

describe('buildSquareStyles', () => {
  it('highlights both squares of the last move', () => {
    // Arrange
    const highlights = { lastMove: { from: 'f1', to: 'b5' } }

    // Act
    const styles = buildSquareStyles(highlights)

    // Assert
    expect(styles.f1.backgroundColor).toBe(HIGHLIGHT.lastMove)
    expect(styles.b5.backgroundColor).toBe(HIGHLIGHT.lastMove)
  })

  it('marks the king square when in check', () => {
    // Arrange
    const highlights = { check: 'e8' }

    // Act
    const styles = buildSquareStyles(highlights)

    // Assert
    expect(styles.e8.backgroundColor).toBe(HIGHLIGHT.check)
  })

  it('renders a hint on each suggested square', () => {
    // Arrange
    const highlights = { suggestions: ['d7', 'd5'] }

    // Act
    const styles = buildSquareStyles(highlights)

    // Assert
    expect(styles.d7.background).toContain(HIGHLIGHT.suggestion)
    expect(styles.d5.background).toContain(HIGHLIGHT.suggestion)
  })

  it('returns no styles when there is nothing to highlight', () => {
    // Arrange
    const highlights = {}

    // Act
    const styles = buildSquareStyles(highlights)

    // Assert
    expect(styles).toEqual({})
  })
})
