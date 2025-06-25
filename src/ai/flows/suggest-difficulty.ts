// src/ai/flows/suggest-difficulty.ts
'use server';
/**
 * @fileOverview A flow to suggest an appropriate AI difficulty level based on user's past performance.
 *
 * - suggestDifficulty - A function that suggests difficulty level.
 * - SuggestDifficultyInput - The input type for the suggestDifficulty function.
 * - SuggestDifficultyOutput - The return type for the suggestDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDifficultyInputSchema = z.object({
  pastPerformance: z
    .string()
    .describe("A summary of the user's past chess performance, including win/loss ratio, average game length, and any notable strategies used."),
});
export type SuggestDifficultyInput = z.infer<typeof SuggestDifficultyInputSchema>;

const SuggestDifficultyOutputSchema = z.object({
  suggestedDifficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The suggested difficulty level for the AI opponent (easy, medium, or hard).'),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested difficulty level, based on the user’s past performance.'),
});
export type SuggestDifficultyOutput = z.infer<typeof SuggestDifficultyOutputSchema>;

export async function suggestDifficulty(input: SuggestDifficultyInput): Promise<SuggestDifficultyOutput> {
  return suggestDifficultyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDifficultyPrompt',
  input: {schema: SuggestDifficultyInputSchema},
  output: {schema: SuggestDifficultyOutputSchema},
  prompt: `You are an AI chess coach that recommends an appropriate difficulty for a player based on their past performance.

  Analyze the player's past performance and suggest a difficulty level (easy, medium, or hard) that will provide a challenging but fair game.
  Explain your reasoning for the suggestion.

  Past Performance: {{{pastPerformance}}}

  Consider the following guidelines:

  - Easy: Suitable for players who are new to chess or have a low win rate.
  - Medium: Suitable for players with a moderate win rate and some experience with chess strategies.
  - Hard: Suitable for experienced players with a high win rate and a strong understanding of chess strategies.
  `,
});

const suggestDifficultyFlow = ai.defineFlow(
  {
    name: 'suggestDifficultyFlow',
    inputSchema: SuggestDifficultyInputSchema,
    outputSchema: SuggestDifficultyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
