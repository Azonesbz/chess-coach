import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { sicilianRepertoire } from '../repertoire/sicilian'
import { useTrainer } from './use-trainer'

describe('useTrainer', () => {
  it('auto-plays the opening move so the trainee is to move', () => {
    // Arrange / Act
    const { result } = renderHook(() => useTrainer(sicilianRepertoire))

    // Assert
    expect(result.current.line).toEqual(['e4'])
    expect(result.current.isTraineeTurn).toBe(true)
    expect(result.current.recommendedMoves.map((move) => move.san)).toEqual([
      'c5',
    ])
  })

  it('advances and auto-replies after a correct move', () => {
    // Arrange
    const { result } = renderHook(() => useTrainer(sicilianRepertoire))

    // Act
    act(() => result.current.playMove('c5'))

    // Assert
    expect(result.current.line).toEqual(['e4', 'c5', 'Nf3'])
    expect(result.current.lastAttempt?.verdict).toBe('correct')
    expect(result.current.recommendedMoves.map((move) => move.san)).toEqual([
      'd6',
    ])
  })

  it('keeps the position and flags an incorrect move', () => {
    // Arrange
    const { result } = renderHook(() => useTrainer(sicilianRepertoire))

    // Act
    act(() => result.current.playMove('e5'))

    // Assert
    expect(result.current.line).toEqual(['e4'])
    expect(result.current.lastAttempt?.verdict).toBe('incorrect')
  })

  it('reset returns to the opening position', () => {
    // Arrange
    const { result } = renderHook(() => useTrainer(sicilianRepertoire))
    act(() => result.current.playMove('c5'))

    // Act
    act(() => result.current.reset())

    // Assert
    expect(result.current.line).toEqual(['e4'])
    expect(result.current.lastAttempt).toBeNull()
  })
})
