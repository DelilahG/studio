"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GameMode } from "@/lib/types";

interface GameControlsProps {
  onNewGame: () => void;
  gameMode: GameMode;
  onGameModeChange: (mode: GameMode) => void;
  onReset: () => void;
}

const GameControls = ({
  onNewGame,
  gameMode,
  onGameModeChange,
  onReset,
}: GameControlsProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Game Controls</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Game Mode</label>
          <Select value={gameMode} onValueChange={(value: GameMode) => onGameModeChange(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select game mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pvp">Player vs Player</SelectItem>
              <SelectItem value="pva">Player vs AI (Easy)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onReset} variant="destructive">
          New Game
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameControls;
