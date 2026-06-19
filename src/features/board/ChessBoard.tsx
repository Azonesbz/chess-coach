import { Chessboard } from 'react-chessboard'
import type { PieceColor } from '../chess/types'
import { buildSquareStyles, SQUARE_COLORS } from './board-theme'
import type { BoardHighlights } from './board-theme'

interface ChessBoardProps {
  fen: string
  orientation: PieceColor
  highlights: BoardHighlights
  /** Retourne true si le coup est accepté (sinon la pièce revient). */
  onMove: (from: string, to: string) => boolean
  allowMoves?: boolean
}

export function ChessBoard({
  fen,
  orientation,
  highlights,
  onMove,
  allowMoves = true,
}: ChessBoardProps) {
  return (
    <Chessboard
      options={{
        position: fen,
        boardOrientation: orientation,
        allowDragging: allowMoves,
        squareStyles: buildSquareStyles(highlights),
        lightSquareStyle: { backgroundColor: SQUARE_COLORS.light },
        darkSquareStyle: { backgroundColor: SQUARE_COLORS.dark },
        boardStyle: { borderRadius: '8px', overflow: 'hidden' },
        onPieceDrop: ({ sourceSquare, targetSquare }) =>
          targetSquare ? onMove(sourceSquare, targetSquare) : false,
      }}
    />
  )
}
