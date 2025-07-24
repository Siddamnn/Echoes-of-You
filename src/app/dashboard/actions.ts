'use server';

import { generateLyricSummary, type GenerateLyricSummaryInput, type GenerateLyricSummaryOutput } from "@/ai/flows/generate-lyric-summary";
import { getMe } from "@/lib/spotify";

export async function regeneratePoemAction(
  input: GenerateLyricSummaryInput
): Promise<GenerateLyricSummaryOutput> {
  // Optional: re-verify user is logged in
  await getMe();
  
  const poemData = await generateLyricSummary(input);
  return poemData;
}
