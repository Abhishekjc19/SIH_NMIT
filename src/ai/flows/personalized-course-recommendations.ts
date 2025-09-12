// src/ai/flows/personalized-course-recommendations.ts
'use server';

/**
 * @fileOverview A flow for providing personalized course recommendations based on user learning history and preferences.
 *
 * - getPersonalizedCourseRecommendations - A function that retrieves personalized course recommendations for a user.
 * - PersonalizedCourseRecommendationsInput - The input type for the getPersonalizedCourseRecommendations function.
 * - PersonalizedCourseRecommendationsOutput - The return type for the getPersonalizedCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCourseRecommendationsInputSchema = z.object({
  learningHistory: z.array(
    z.string().describe('Titles of courses the user has previously taken.')
  ).describe('The user learning history, as a list of course titles.'),
  preferences: z.string().describe('The user preferences for future courses.'),
  numRecommendations: z.number().default(3).describe('The number of course recommendations to return.'),
});
export type PersonalizedCourseRecommendationsInput = z.infer<typeof PersonalizedCourseRecommendationsInputSchema>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  courseRecommendations: z.array(
    z.string().describe('Recommended course title.')
  ).describe('A list of personalized course recommendations.'),
});
export type PersonalizedCourseRecommendationsOutput = z.infer<typeof PersonalizedCourseRecommendationsOutputSchema>;

export async function getPersonalizedCourseRecommendations(
  input: PersonalizedCourseRecommendationsInput
): Promise<PersonalizedCourseRecommendationsOutput> {
  return personalizedCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCourseRecommendationsPrompt',
  input: {schema: PersonalizedCourseRecommendationsInputSchema},
  output: {schema: PersonalizedCourseRecommendationsOutputSchema},
  prompt: `You are a course recommendation system.

  Based on the user's learning history and preferences, provide {{numRecommendations}} personalized course recommendations.

  Learning History: {{learningHistory}}
  Preferences: {{preferences}}

  Return the course recommendations as a list of course titles.
  Do not include any additional information other than the course titles.
  Follow exactly the schema specified. Do not include any extra text.

  Course Recommendations:`,
});

const personalizedCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCourseRecommendationsFlow',
    inputSchema: PersonalizedCourseRecommendationsInputSchema,
    outputSchema: PersonalizedCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
