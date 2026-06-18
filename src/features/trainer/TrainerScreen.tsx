import { useMemo } from 'react'
import { sicilianRepertoire } from '../repertoire/sicilian'
import { useTrainer } from './use-trainer'
import { ChessBoard } from '../board/ChessBoard'
import type { BoardHighlights } from '../board/board-theme'
import {
  checkedKingSquare,
  lastMoveSquares,
  moveTargetSquare,
  sanForMove,
} from '../chess/chess-position'
import { RecommendedMoves } from '../../components/RecommendedMoves'
import { MoveList } from '../../components/MoveList'

export function TrainerScreen() {
  const trainer = useTrainer(sicilianRepertoire)

  const highlights: BoardHighlights = useMemo(
    () => ({
      lastMove: lastMoveSquares(trainer.line) ?? undefined,
      check: checkedKingSquare(trainer.line) ?? undefined,
      suggestions: trainer.recommendedMoves
        .map((move) => moveTargetSquare(trainer.fen, move.san))
        .filter((square): square is string => square !== null),
    }),
    [trainer.line, trainer.fen, trainer.recommendedMoves],
  )

  const handleMove = (from: string, to: string): boolean => {
    const san = sanForMove(trainer.fen, from, to)
    if (!san) return false
    const isRecommended = trainer.recommendedMoves.some((m) => m.san === san)
    trainer.playMove(san)
    return isRecommended
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="mx-auto w-full max-w-[560px]">
        <ChessBoard
          fen={trainer.fen}
          orientation={sicilianRepertoire.trainee}
          highlights={highlights}
          onMove={handleMove}
        />
        <div className="mt-4">
          <MoveList line={trainer.line} />
        </div>
      </div>

      <aside className="flex flex-col gap-4">
        {trainer.isComplete ? (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            Ligne maîtrisée — bravo ! Recommence pour réviser une autre suite.
          </div>
        ) : (
          <>
            {trainer.lastAttempt?.verdict === 'incorrect' && (
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                Ce n'est pas le coup du répertoire. Essaie l'un des coups
                conseillés.
              </div>
            )}
            <div>
              <h2 className="mb-2 text-sm font-medium text-slate-400">
                Coups recommandés aux Noirs
              </h2>
              <RecommendedMoves
                moves={trainer.recommendedMoves}
                onPick={trainer.playMove}
              />
            </div>
          </>
        )}
        <button
          type="button"
          onClick={trainer.reset}
          className="self-start rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
        >
          Recommencer
        </button>
      </aside>
    </div>
  )
}
