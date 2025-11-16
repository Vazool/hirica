import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { StudentProfile, EmployerProfile } from '@shared/schema';

interface AuthContextType {
  isAuthenticated: boolean;
  accountType: 'student' | 'employer' | null;
  studentProfile: StudentProfile | null;
  employerProfile: EmployerProfile | null;
  signIn: (email: string, password: string, type: 'student' | 'employer') => Promise<boolean>;
  signUp: (data: any) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const VALID_ACCOUNTS = {
  student: { email: 'fred.flintstone@bedrock.com', password: 'password' },
  employer: { email: 'hr@rocksupplies.com', password: 'password' },
};

const MOCK_STUDENT: StudentProfile = {
  id: '1',
  email: 'fred.flintstone@bedrock.com',
  name: 'Fred Flintstone',
  university: 'Bedrock University',
  degree: 'Computer Science',
  graduationYear: '2024',
  skills: ['JavaScript', 'React', 'Problem Solving', 'Communication'],
  assessmentScore: 85,
  assessmentsCompleted: 3,
  skillsMastered: 8,
  upcomingInterviews: 2,
};

const MOCK_EMPLOYER: EmployerProfile = {
  id: '1',
  email: 'hr@rocksupplies.com',
  companyName: 'Rock Supplies Inc.',
  industry: 'Mining & Resources',
  contactPerson: 'Mr. Slate',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  });
  
  const [accountType, setAccountType] = useState<'student' | 'employer' | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('accountType');
      return stored as 'student' | 'employer' | null;
    }
    return null;
  });
  
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('studentProfile');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
  
  const [employerProfile, setEmployerProfile] = useState<EmployerProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('employerProfile');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', String(isAuthenticated));
      localStorage.setItem('accountType', accountType || '');
      if (studentProfile) {
        localStorage.setItem('studentProfile', JSON.stringify(studentProfile));
      } else {
        localStorage.removeItem('studentProfile');
      }
      if (employerProfile) {
        localStorage.setItem('employerProfile', JSON.stringify(employerProfile));
      } else {
        localStorage.removeItem('employerProfile');
      }
    }
  }, [isAuthenticated, accountType, studentProfile, employerProfile]);

  const signIn = async (email: string, password: string, type: 'student' | 'employer'): Promise<boolean> => {
    const validAccount = VALID_ACCOUNTS[type];
    
    if (email === validAccount.email && password.length >= 6) {
      setIsAuthenticated(true);
      setAccountType(type);
      
      if (type === 'student') {
        setStudentProfile(MOCK_STUDENT);
      } else {
        setEmployerProfile(MOCK_EMPLOYER);
      }
      
      return true;
    }
    
    return false;
  };

  const signUp = async (data: any): Promise<boolean> => {
    return true;
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setAccountType(null);
    setStudentProfile(null);
    setEmployerProfile(null);
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accountType,
        studentProfile,
        employerProfile,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
