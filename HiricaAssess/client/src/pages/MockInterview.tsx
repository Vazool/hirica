import { useState } from 'react';
import { StudentLayout } from '@/components/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Sparkles, CheckCircle } from 'lucide-react';

const INTERVIEW_QUESTIONS = [
  {
    id: '1',
    question: 'Tell me about a time when you had to work under pressure. How did you handle it?',
    category: 'Behavioral',
  },
  {
    id: '2',
    question: 'Describe a situation where you had to collaborate with a difficult team member. What was your approach?',
    category: 'Teamwork',
  },
  {
    id: '3',
    question: 'Can you give an example of a goal you set and how you achieved it?',
    category: 'Achievement',
  },
];

async function generateMockFeedback(question: string, answer: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return `Great response! Here's some feedback on your answer:

**Strengths:**
- You provided a clear, structured response using the STAR method
- Your example was specific and relevant to the question
- You demonstrated self-awareness and learning

**Areas for Improvement:**
- Consider adding more quantifiable results or metrics
- Expand on the skills you developed from this experience
- Make sure to emphasize your individual contribution

**Overall Assessment:** Your answer shows strong communication skills and the ability to reflect on past experiences. With slight adjustments to include more specific outcomes, this would be an excellent response.`;
}

export default function MockInterview() {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [analyzing, setAnalyzing] = useState<string | null>(null);

  const handleAnalyze = async (questionId: string) => {
    const answer = answers[questionId];
    if (!answer || answer.trim().length < 20) {
      toast({
        title: 'Answer too short',
        description: 'Please provide a more detailed answer (at least 20 characters).',
        variant: 'destructive',
      });
      return;
    }

    setAnalyzing(questionId);
    
    const question = INTERVIEW_QUESTIONS.find(q => q.id === questionId)?.question || '';
    const generatedFeedback = await generateMockFeedback(question, answer);
    
    setFeedback({ ...feedback, [questionId]: generatedFeedback });
    setAnalyzing(null);
    
    toast({
      title: 'Analysis Complete',
      description: 'Your answer has been analyzed. Check the feedback below.',
    });
  };

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">AI Mock Interview</h1>
          <p className="text-muted-foreground">
            Practice your interview skills and receive instant AI-powered feedback
          </p>
        </div>

        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Interview Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use the STAR method (Situation, Task, Action, Result)</li>
                  <li>• Be specific and provide concrete examples</li>
                  <li>• Focus on your individual contributions and outcomes</li>
                  <li>• Keep answers concise but comprehensive (2-3 minutes when spoken)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {INTERVIEW_QUESTIONS.map((question, index) => (
            <Card key={question.id} className="hover-elevate">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" data-testid={`badge-category-${index}`}>
                        {question.category}
                      </Badge>
                      {feedback[question.id] && (
                        <Badge className="bg-accent text-accent-foreground gap-1" data-testid={`badge-analyzed-${index}`}>
                          <CheckCircle className="w-3 h-3" />
                          Analyzed
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg" data-testid={`text-question-${index}`}>
                      {index + 1}. {question.question}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Type your answer here... (Use the STAR method: Situation, Task, Action, Result)"
                    value={answers[question.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                    className="min-h-32 resize-y"
                    data-testid={`textarea-answer-${index}`}
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {(answers[question.id] || '').length} characters
                    </p>
                    <Button
                      onClick={() => handleAnalyze(question.id)}
                      disabled={analyzing === question.id || !answers[question.id]}
                      className="gap-2"
                      data-testid={`button-analyze-${index}`}
                    >
                      <Sparkles className="w-4 h-4" />
                      {analyzing === question.id ? 'Analyzing...' : 'Analyze Answer'}
                    </Button>
                  </div>
                </div>

                {feedback[question.id] && (
                  <Card className="bg-accent/5 border-l-4 border-l-accent">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-accent-foreground" />
                        AI Feedback
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="prose prose-sm max-w-none text-foreground"
                        data-testid={`text-feedback-${index}`}
                      >
                        {feedback[question.id].split('\n').map((line, i) => (
                          <p key={i} className="mb-2">{line}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-foreground">Ready for More Practice?</h3>
              <p className="text-sm text-muted-foreground">
                Complete more mock interviews to improve your confidence and performance
              </p>
              <Button variant="outline" className="mt-4" data-testid="button-new-session">
                Start New Interview Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
