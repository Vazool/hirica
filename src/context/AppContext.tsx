import { createContext, useContext, useState, ReactNode } from 'react';
import { StudentProfile, EmployerProfile, AssessmentState } from '../types';

interface AppContextType {
  studentProfile: StudentProfile | null;
  setStudentProfile: (profile: StudentProfile | null) => void;
  employerProfile: EmployerProfile | null;
  setEmployerProfile: (profile: EmployerProfile | null) => void;
  assessmentState: AssessmentState;
  setAssessmentState: (state: AssessmentState) => void;
  updateTestScore: (area: keyof AssessmentState['results'], score: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [employerProfile, setEmployerProfile] = useState<EmployerProfile | null>(null);
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    selectedArea: null,
    selectedMode: null,
    questionnaireAnswers: [],
    results: {
      verbal: null,
      numerical: null,
      logical: null,
      diagrammatic: null,
      critical: null,
      situational: null,
    },
  });

  const updateTestScore = (area: keyof AssessmentState['results'], score: number) => {
    setAssessmentState(prev => ({
      ...prev,
      results: {
        ...prev.results,
        [area]: score,
      },
    }));

    setStudentProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        testScores: {
          ...prev.testScores,
          [area]: score,
        },
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        studentProfile,
        setStudentProfile,
        employerProfile,
        setEmployerProfile,
        assessmentState,
        setAssessmentState,
        updateTestScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
