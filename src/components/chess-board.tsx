"use client";

import type { Board, Square, Piece as PieceType } from "@/lib/types";
import { PieceComponents } from "@/components/icons/chess-pieces";
import { cn } from "@/lib/utils";

interface ChessBoardProps {
  board: Board;
  onSquareClick: (square: Square) => void;
  selectedPiece: Square | null;
  possibleMoves: string[];
  turn: 'w' | 'b';
  isCheck: boolean;
}

const ChessBoard = ({ board, onSquareClick, selectedPiece, possibleMoves, turn, isCheck }: ChessBoardProps) => {
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const getKingSquare = (): Square | null => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = board[i][j];
            if (piece && piece.type === 'k' && piece.color === turn) {
                return piece.square;
            }
        }
    }
    return null;
  };

  const kingSquare = isCheck ? getKingSquare() : null;

  return (
    <div className="relative aspect-square w-full max-w-lg shadow-2xl rounded-md overflow-hidden border-4 border-primary">
      {ranks.map((rank, i) => (
        <div key={rank} className="flex">
          {files.map((file, j) => {
            const square = `${file}${rank}` as Square;
            const piece = board[i][j] as PieceType | null;
            const isLightSquare = (i + j) % 2 !== 0;
            const isSelected = selectedPiece === square;
            const isPossibleMove = possibleMoves.includes(square);
            const isCheckSquare = kingSquare === square;

            return (
              <div
                key={square}
                onClick={() => onSquareClick(square)}
                className={cn(
                  "relative aspect-square w-[12.5%] h-auto cursor-pointer flex items-center justify-center transition-colors duration-200",
                  isLightSquare ? "bg-background" : "bg-primary text-primary-foreground",
                  { "bg-accent/70": isSelected },
                  { "shadow-[inset_0_0_10px_2px_rgba(255,0,0,0.7)]": isCheckSquare }
                )}
              >
                {piece && (
                  <div className="w-full h-full p-1 transition-transform duration-200 ease-in-out hover:scale-110">
                    {PieceComponents[piece.type][piece.color]({
                      className: "w-full h-full object-contain drop-shadow-lg",
                    })}
                  </div>
                )}
                {isPossibleMove && (
                  <div className="absolute w-1/3 h-1/3 rounded-full bg-accent/50 transition-opacity duration-200"></div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
