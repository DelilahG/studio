"use client";

import { useState, useEffect, useCallback } from "react";
// @ts-ignore
import { Chess } from "chess.js";
import type { Piece, Square, Move } from "@/lib/types";
import ChessBoard from "@/components/chess-board";
import GameControls from "@/components/game-controls";
import GameStatus from "@/components/game-status";
import DifficultySuggester from "@/components/difficulty-suggester";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { GameMode } from "@/lib/types";

export default function Home() {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(game.board());
  const [selectedPiece, setSelectedPiece] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [gameMode, setGameMode] = useState<GameMode>("pvp");
  const [gameOver, setGameOver] = useState({
    isGameOver: false,
    message: "",
  });

  const updateStats = useCallback((result: 'win' | 'loss' | 'draw') => {
    if (gameMode !== 'pva') return;

    const stats = JSON.parse(localStorage.getItem('chessMateStats') || '{"wins": 0, "losses": 0, "draws": 0}');
    stats[result === 'win' ? 'wins' : result === 'loss' ? 'losses' : 'draws']++;
    localStorage.setItem('chessMateStats', JSON.stringify(stats));
  }, [gameMode]);


  const checkGameOver = useCallback(() => {
    if (game.isGameOver()) {
      let message = "Game Over";
      if (game.isCheckmate()) {
        message = `Checkmate! ${
          game.turn() === "w" ? "Black" : "White"
        } wins.`;
        if (gameMode === 'pva') {
          updateStats(game.turn() === 'b' ? 'win' : 'loss');
        }
      } else if (game.isStalemate()) {
        message = "Stalemate! The game is a draw.";
        updateStats('draw');
      } else if (game.isThreefoldRepetition()) {
        message = "Draw by threefold repetition.";
        updateStats('draw');
      } else if (game.isInsufficientMaterial()) {
        message = "Draw due to insufficient material.";
        updateStats('draw');
      }
      setGameOver({ isGameOver: true, message });
    }
  }, [game, gameMode, updateStats]);

  const makeAiMove = useCallback(() => {
    setTimeout(() => {
      const moves = game.moves();
      if (moves.length > 0) {
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        game.move(randomMove);
        setBoard(game.board());
        checkGameOver();
      }
    }, 1000);
  }, [game, checkGameOver]);
  
  useEffect(() => {
    if (gameMode === "pva" && game.turn() === "b") {
      makeAiMove();
    }
  }, [board, gameMode, game, makeAiMove]);


  const handleSquareClick = (square: Square) => {
    if (gameOver.isGameOver) return;

    if (selectedPiece) {
      const move = {
        from: selectedPiece,
        to: square,
        promotion: "q", // always promote to a queen for simplicity
      };

      try {
        const validMove = game.move(move);
        if (validMove) {
          setBoard(game.board());
          setSelectedPiece(null);
          setPossibleMoves([]);
          checkGameOver();
        } else {
          // If the move is invalid, maybe it's a click on another piece of the same color
          const piece = game.get(square);
          if (piece && piece.color === game.turn()) {
            selectPiece(square);
          } else {
            setSelectedPiece(null);
            setPossibleMoves([]);
          }
        }
      } catch (error) {
         // Invalid move, maybe select the new piece
        const piece = game.get(square);
        if (piece && piece.color === game.turn()) {
          selectPiece(square);
        } else {
          setSelectedPiece(null);
          setPossibleMoves([]);
        }
      }
    } else {
      selectPiece(square);
    }
  };

  const selectPiece = (square: Square) => {
    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      setSelectedPiece(square);
      const moves = game.moves({ square: square, verbose: true });
      setPossibleMoves(moves.map((move: Move) => move.to));
    }
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setBoard(newGame.board());
    setSelectedPiece(null);
    setPossibleMoves([]);
    setGameOver({ isGameOver: false, message: "" });
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background font-body">
       <div className="absolute top-4 left-4">
        <h1 className="text-4xl font-headline font-bold text-primary">ChessMate</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
        <div className="flex-grow flex items-center justify-center">
          <ChessBoard
            board={board}
            onSquareClick={handleSquareClick}
            selectedPiece={selectedPiece}
            possibleMoves={possibleMoves}
            turn={game.turn()}
            isCheck={game.isCheck()}
          />
        </div>
        <div className="lg:w-96 flex flex-col gap-6">
          <GameStatus turn={game.turn()} isCheck={game.isCheck()} />
          <GameControls
            onNewGame={resetGame}
            gameMode={gameMode}
            onGameModeChange={setGameMode}
            onReset={resetGame}
          />
          <DifficultySuggester />
        </div>
      </div>
      <AlertDialog open={gameOver.isGameOver}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Game Over</AlertDialogTitle>
            <AlertDialogDescription>{gameOver.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={resetGame}>Play Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
