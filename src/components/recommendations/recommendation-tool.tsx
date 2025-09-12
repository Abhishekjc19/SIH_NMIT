'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateRecommendationsAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, List, Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2" />}
      Get Recommendations
    </Button>
  );
}

export function RecommendationTool() {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(generateRecommendationsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.recommendations) {
        toast({
            variant: "destructive",
            title: "Something went wrong",
            description: state.message,
        });
    }
    if (state.recommendations) {
        formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Find Your Next Course</CardTitle>
        <CardDescription>Tell us what you've learned and what you're interested in, and our AI will suggest courses for you.</CardDescription>
      </CardHeader>
      <form ref={formRef} action={dispatch}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="learningHistory">My Learning History</Label>
            <Textarea
              id="learningHistory"
              name="learningHistory"
              placeholder="e.g., Introduction to Python, Basic HTML & CSS, etc. (one per line)"
              rows={4}
              aria-describedby="learningHistory-error"
            />
            {state.errors?.learningHistory && (
              <p id="learningHistory-error" className="text-sm text-destructive">{state.errors.learningHistory[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferences">My Interests & Preferences</Label>
            <Textarea
              id="preferences"
              name="preferences"
              placeholder="e.g., I want to build mobile apps, I'm interested in data visualization, I prefer project-based courses..."
              rows={4}
              aria-describedby="preferences-error"
            />
            {state.errors?.preferences && (
                <p id="preferences-error" className="text-sm text-destructive">{state.errors.preferences[0]}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
      {state.recommendations && state.recommendations.length > 0 && (
        <div className="p-6 pt-0">
            <Alert>
                <List className="h-4 w-4" />
                <AlertTitle>Your Personalized Recommendations!</AlertTitle>
                <AlertDescription>
                    <ul className="mt-2 list-disc list-inside space-y-1">
                        {state.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                        ))}
                    </ul>
                </AlertDescription>
            </Alert>
        </div>
      )}
    </Card>
  );
}
