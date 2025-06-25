"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { suggestDifficulty, SuggestDifficultyOutput } from "@/ai/flows/suggest-difficulty";
import { Lightbulb } from "lucide-react";

const DifficultySuggester = () => {
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestDifficultyOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedStats = localStorage.getItem("chessMateStats");
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch (e) {
      console.error("Could not load stats from localStorage", e);
    }
  }, []);

  const handleSuggestDifficulty = async () => {
    setLoading(true);
    setError(null);
    setSuggestion(null);

    // Refresh stats from localStorage before making the call
    const currentStats = JSON.parse(localStorage.getItem('chessMateStats') || '{"wins": 0, "losses": 0, "draws": 0}');
    setStats(currentStats);

    const pastPerformance = `Wins: ${currentStats.wins}, Losses: ${currentStats.losses}, Draws: ${currentStats.draws}.`;

    try {
      const result = await suggestDifficulty({ pastPerformance });
      setSuggestion(result);
    } catch (e: any) {
      setError("Failed to get a suggestion. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">AI Coach</CardTitle>
        <CardDescription>Get a personalized difficulty suggestion based on your performance against the AI.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold">Your Performance vs. AI</h4>
          <p className="text-sm text-muted-foreground">
            Wins: {stats.wins} | Losses: {stats.losses} | Draws: {stats.draws}
          </p>
        </div>
        {loading && <p>Thinking...</p>}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {suggestion && (
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Suggestion: Play on {suggestion.suggestedDifficulty.toUpperCase()}</AlertTitle>
            <AlertDescription>{suggestion.reasoning}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSuggestDifficulty} disabled={loading} className="w-full">
          {loading ? "Getting Suggestion..." : "Suggest Difficulty"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DifficultySuggester;
