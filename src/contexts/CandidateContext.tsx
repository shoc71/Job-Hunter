// src/contexts/CandidateContext.tsx
import { createContext, useState, ReactNode } from 'react';

export interface CandidateDetails {
  id: number;
  login: string;
  name?: string | null;
  email?: string | null;
  bio?: string | null;
  avatar_url: string;
  html_url: string;
}

interface CandidateContextType {
  selectedCandidates: CandidateDetails[];
  addCandidate: (candidate: CandidateDetails) => void;
  rejectCandidate: (id: number) => void;
}

export const CandidateContext = createContext<CandidateContextType>({
  selectedCandidates: [],
  addCandidate: () => {},
  rejectCandidate: () => {},
});

export const CandidateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCandidates, setSelectedCandidates] = useState<CandidateDetails[]>([]);

  const addCandidate = (candidate: CandidateDetails) => {
    setSelectedCandidates((prev) => {
      // Avoid duplicate entries
      if (prev.find((c) => c.id === candidate.id)) return prev;
      return [...prev, candidate];
    });
  };

  const rejectCandidate = (id: number) => {
    setSelectedCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
  };

  return (
    <CandidateContext.Provider value={{ selectedCandidates, addCandidate, rejectCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};
