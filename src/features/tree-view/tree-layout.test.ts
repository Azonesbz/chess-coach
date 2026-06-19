import { describe, it, expect } from 'vitest'
import { sicilianRepertoire } from '../repertoire/sicilian'
import { flattenRepertoire } from './tree-layout'

describe('flattenRepertoire', () => {
  it('lists moves depth-first with their depth and side', () => {
    // Arrange
    const root = sicilianRepertoire.root

    // Act
    const rows = flattenRepertoire(root)

    // Assert
    expect(rows[0]).toMatchObject({ san: 'e4', depth: 0, isWhite: true })
    expect(rows[1]).toMatchObject({ san: 'c5', depth: 1, isWhite: false })
  })

  it('assigns a unique id to every node', () => {
    // Arrange
    const rows = flattenRepertoire(sicilianRepertoire.root)

    // Act
    const ids = new Set(rows.map((row) => row.id))

    // Assert
    expect(ids.size).toBe(rows.length)
  })

  it('keeps a parent before its descendants', () => {
    // Arrange
    const ids = flattenRepertoire(sicilianRepertoire.root).map((row) => row.id)

    // Act
    const parentIndex = ids.indexOf('e4/c5/Nf3')
    const childIndex = ids.indexOf('e4/c5/Nf3/d6')

    // Assert
    expect(parentIndex).toBeGreaterThanOrEqual(0)
    expect(childIndex).toBeGreaterThan(parentIndex)
  })
})
