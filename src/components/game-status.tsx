"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GameStatusProps {
  turn: "w" | "b";
  isCheck: boolean;
}

const GameStatus = ({ turn, isCheck }: GameStatusProps) => {
  const turnText = turn === "w" ? "White's Turn" : "Black's Turn";
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Game Status</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <p className="text-lg font-semibold">{turnText}</p>
        {isCheck && (
          <Badge variant="destructive" className="animate-pulse">
            Check!
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default GameStatus;
