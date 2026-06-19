import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecommendedMoves } from './RecommendedMoves'
import type { RepertoireMove } from '../features/repertoire/types'

const MOVES: RepertoireMove[] = [
  { san: 'Bd7', quality: 'best', comment: 'Solide.', children: [] },
  { san: 'Nd7', quality: 'good', comment: 'Complexe.', children: [] },
]

describe('RecommendedMoves', () => {
  it('lists each move with its quality label', () => {
    // Arrange / Act
    render(<RecommendedMoves moves={MOVES} />)

    // Assert
    expect(screen.getByText('Bd7')).toBeInTheDocument()
    expect(screen.getByText('Nd7')).toBeInTheDocument()
    expect(screen.getByText('Meilleur')).toBeInTheDocument()
    expect(screen.getByText('Bon')).toBeInTheDocument()
  })

  it('calls onPick with the SAN when a move is clicked', async () => {
    // Arrange
    const onPick = vi.fn()
    render(<RecommendedMoves moves={MOVES} onPick={onPick} />)

    // Act
    await userEvent.click(screen.getByRole('button', { name: /Bd7/ }))

    // Assert
    expect(onPick).toHaveBeenCalledWith('Bd7')
  })
})
