'use server';

import { z } from 'zod';
import { getPersonalizedCourseRecommendations } from '@/ai/flows/personalized-course-recommendations';

const recommendationSchema = z.object({
  learningHistory: z.string().min(10, 'Please describe your learning history in more detail.'),
  preferences: z.string().min(10, 'Please describe your preferences in more detail.'),
});

export type RecommendationFormState = {
  message: string;
  recommendations?: string[];
  errors?: {
    learningHistory?: string[];
    preferences?: string[];
  };
};

export async function generateRecommendationsAction(
  prevState: RecommendationFormState,
  formData: FormData
): Promise<RecommendationFormState> {
  const validatedFields = recommendationSchema.safeParse({
    learningHistory: formData.get('learningHistory'),
    preferences: formData.get('preferences'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { learningHistory, preferences } = validatedFields.data;

  try {
    const result = await getPersonalizedCourseRecommendations({
      learningHistory: learningHistory.split('\n'),
      preferences: preferences,
      numRecommendations: 5,
    });
    
    if (result.courseRecommendations && result.courseRecommendations.length > 0) {
      return {
        message: 'Here are your personalized recommendations!',
        recommendations: result.courseRecommendations,
      };
    } else {
      return { message: 'We couldn’t generate recommendations based on your input. Please try again with more details.' };
    }
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred on the server. Please try again later.' };
  }
}
