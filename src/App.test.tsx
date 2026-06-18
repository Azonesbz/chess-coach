import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the app title', () => {
    // Arrange
    // (no setup needed for a static render)

    // Act
    render(<App />)

    // Assert
    expect(
      screen.getByRole('heading', { name: /chess coach/i }),
    ).toBeInTheDocument()
  })
})
