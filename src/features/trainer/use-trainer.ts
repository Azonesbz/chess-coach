import { useCallback, useMemo, useState } from 'react'
import { fenAfterMoves } from '../chess/chess-position'
import { isTraineeTurn, movesAfter } from '../repertoire/repertoire-tree'
import { attemptMove, opponentReply } from './trainer-logic'
import type { San } from '../chess/types'
import type { Repertoire, RepertoireMove } from '../repertoire/types'
import type { AttemptResult } from './types'

/** Joue les réponses adverses tant que ce n'est pas au camp entraîné (ou fin de ligne). */
function playOpponentMoves(repertoire: Repertoire, line: San[]): San[] {
  let current = line
  while (!isTraineeTurn(repertoire, current)) {
    const reply = opponentReply(repertoire, current)
    if (!reply) break
    current = [...current, reply.san]
  }
  return current
}

export interface TrainerController {
  line: San[]
  fen: string
  isTraineeTurn: boolean
  isComplete: boolean
  recommendedMoves: RepertoireMove[]
  lastAttempt: AttemptResult | null
  playMove: (san: San) => void
  reset: () => void
}

export function useTrainer(repertoire: Repertoire): TrainerController {
  const [line, setLine] = useState<San[]>(() =>
    playOpponentMoves(repertoire, []),
  )
  const [lastAttempt, setLastAttempt] = useState<AttemptResult | null>(null)

  const reset = useCallback(() => {
    setLine(playOpponentMoves(repertoire, []))
    setLastAttempt(null)
  }, [repertoire])

  const playMove = useCallback(
    (san: San) => {
      const result = attemptMove(repertoire, line, san)
      setLastAttempt(result)
      if (result.verdict === 'correct') {
        setLine(playOpponentMoves(repertoire, [...line, san]))
      }
    },
    [repertoire, line],
  )

  const recommendedMoves = useMemo(
    () => movesAfter(repertoire, line),
    [repertoire, line],
  )
  const fen = useMemo(() => fenAfterMoves(line), [line])

  return {
    line,
    fen,
    isTraineeTurn: isTraineeTurn(repertoire, line),
    isComplete: recommendedMoves.length === 0,
    recommendedMoves,
    lastAttempt,
    playMove,
    reset,
  }
}
