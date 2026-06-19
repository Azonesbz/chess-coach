import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Avec `globals: false`, Testing Library n'enregistre pas son cleanup
// automatiquement : on le branche ici pour isoler chaque test.
afterEach(() => {
  cleanup()
})
