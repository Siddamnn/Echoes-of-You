'use server';
/**
 * @fileOverview Generates a poetic summary of a user's Spotify listening history.
 *
 * - generateLyricSummary - A function that generates a poetic summary based on user's listening data.
 * - GenerateLyricSummaryInput - The input type for the generateLyricSummary function.
 * - GenerateLyricSummaryOutput - The return type for the generateLyricSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLyricSummaryInputSchema = z.object({
  recentTracks: z.string().describe('A list of the user\'s recently played tracks.'),
  topArtists: z.string().describe('A list of the user\'s top artists.'),
  favoriteGenres: z.string().describe('A list of the user\'s favorite music genres.'),
});
export type GenerateLyricSummaryInput = z.infer<typeof GenerateLyricSummaryInputSchema>;

const GenerateLyricSummaryOutputSchema = z.object({
  poem: z.string().describe('A 3-4 line poetic summary of the user\'s musical taste.'),
});
export type GenerateLyricSummaryOutput = z.infer<typeof GenerateLyricSummaryOutputSchema>;

export async function generateLyricSummary(input: GenerateLyricSummaryInput): Promise<GenerateLyricSummaryOutput> {
  return generateLyricSummaryFlow(input);
}

const generateLyricSummaryPrompt = ai.definePrompt({
  name: 'generateLyricSummaryPrompt',
  input: {schema: GenerateLyricSummaryInputSchema},
  output: {schema: GenerateLyricSummaryOutputSchema},
  prompt: `You are a poet laureate specializing in translating musical taste into lyrical verse.

  Given the following information about a user's listening habits, compose a short, 3-4 line poem that captures the essence of their musical soul, reflecting their mood and personality.

  Recent Tracks: {{{recentTracks}}}
  Top Artists: {{{topArtists}}}
  Favorite Genres: {{{favoriteGenres}}}

  Poem:`,
});

const generateLyricSummaryFlow = ai.defineFlow(
  {
    name: 'generateLyricSummaryFlow',
    inputSchema: GenerateLyricSummaryInputSchema,
    outputSchema: GenerateLyricSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateLyricSummaryPrompt(input);
    return output!;
  }
);
