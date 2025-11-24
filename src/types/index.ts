export interface StudentProfile {
  name: string;
  email: string;
  degree: string;
  skillBadges: string[];
  testScores: {
    verbal: number | null;
    numerical: number | null;
    logical: number | null;
    diagrammatic: number | null;
    critical: number | null;
    situational: number | null;
  };
}

export interface EmployerProfile {
  companyName: string;
  recruiterName: string;
  email: string;
}

export interface AssessmentState {
  selectedArea: string | null;
  selectedMode: string | null;
  questionnaireAnswers: string[];
  results: {
    verbal: number | null;
    numerical: number | null;
    logical: number | null;
    diagrammatic: number | null;
    critical: number | null;
    situational: number | null;
  };
}

export interface MockCandidate {
  id: number;
  name: string;
  degree: string;
  matchScore: number;
  skills: string[];
}
