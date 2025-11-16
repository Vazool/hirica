import { useState } from 'react';
import { useLocation } from 'wouter';
import { StudentLayout } from '@/components/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Mic, 
  MessageSquare, 
  ClipboardList, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';

const QUESTIONNAIRE_QUESTIONS = [
  {
    id: '1',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 'O(log n)',
  },
  {
    id: '2',
    question: 'Which JavaScript method is used to add an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 'push()',
  },
  {
    id: '3',
    question: 'What does CSS stand for?',
    options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
    correctAnswer: 'Cascading Style Sheets',
  },
  {
    id: '4',
    question: 'Which HTTP method is used to update a resource?',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correctAnswer: 'PUT',
  },
  {
    id: '5',
    question: 'What is React primarily used for?',
    options: ['Backend development', 'Database management', 'Building user interfaces', 'Server configuration'],
    correctAnswer: 'Building user interfaces',
  },
];

export default function SkillsAssessment() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [mode, setMode] = useState<'select' | 'questionnaire'>('select');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = ((currentQuestion + 1) / QUESTIONNAIRE_QUESTIONS.length) * 100;

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONNAIRE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    QUESTIONNAIRE_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    
    const score = Math.round((correct / QUESTIONNAIRE_QUESTIONS.length) * 100);
    
    toast({
      title: 'Assessment Complete!',
      description: `You scored ${score}%. Redirecting to feedback...`,
    });
    
    setTimeout(() => {
      setLocation('/student/feedback');
    }, 1500);
  };

  if (mode === 'select') {
    return (
      <StudentLayout>
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Skills Assessment</h1>
            <p className="text-muted-foreground">Choose your assessment mode and showcase your abilities</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover-elevate opacity-60">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mic className="w-7 h-7 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-chart-3/20 text-chart-3" data-testid="badge-speak-coming-soon">
                    Coming Soon
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Speak to AI</h3>
                  <p className="text-sm text-muted-foreground">
                    Answer questions verbally using our advanced voice recognition system
                  </p>
                </div>
                <Button className="w-full" disabled data-testid="button-speak-mode">
                  Start Speaking
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-elevate opacity-60">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <Badge variant="secondary" className="bg-chart-3/20 text-chart-3" data-testid="badge-chat-coming-soon">
                    Coming Soon
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Chat with AI</h3>
                  <p className="text-sm text-muted-foreground">
                    Interactive conversation-based assessment with our AI interviewer
                  </p>
                </div>
                <Button className="w-full" disabled data-testid="button-chat-mode">
                  Start Chatting
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-elevate border-primary/50">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ClipboardList className="w-7 h-7 text-primary" />
                  </div>
                  <Badge className="bg-primary text-primary-foreground" data-testid="badge-questionnaire-available">
                    Available
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Classic Questionnaire</h3>
                  <p className="text-sm text-muted-foreground">
                    Traditional multiple-choice assessment to evaluate your technical knowledge
                  </p>
                </div>
                <Button 
                  className="w-full gap-2" 
                  onClick={() => setMode('questionnaire')}
                  data-testid="button-questionnaire-mode"
                >
                  Start Assessment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground">Assessment Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Take your time and read each question carefully</li>
                    <li>• You can navigate back to previous questions</li>
                    <li>• Your progress is saved automatically</li>
                    <li>• Detailed feedback will be provided after completion</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </StudentLayout>
    );
  }

  const currentQ = QUESTIONNAIRE_QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === QUESTIONNAIRE_QUESTIONS.length - 1;
  const allAnswered = QUESTIONNAIRE_QUESTIONS.every(q => answers[q.id]);

  return (
    <StudentLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground">Skills Assessment</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {QUESTIONNAIRE_QUESTIONS.length}
              </p>
            </div>
            <Badge variant="outline" data-testid="text-progress">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-bar" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl" data-testid="text-question">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQ.id] || ''}
              onValueChange={(value) => handleAnswer(currentQ.id, value)}
            >
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate"
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} data-testid={`radio-option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer text-base"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="gap-2"
            data-testid="button-previous"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {QUESTIONNAIRE_QUESTIONS.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuestion
                    ? 'bg-primary'
                    : answers[QUESTIONNAIRE_QUESTIONS[index].id]
                    ? 'bg-accent'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="gap-2"
              data-testid="button-submit"
            >
              Submit Assessment
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
              className="gap-2"
              data-testid="button-next"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
