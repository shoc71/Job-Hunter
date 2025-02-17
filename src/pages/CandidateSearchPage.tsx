import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchGithub, searchGithubUser } from "../api/API.tsx";

export interface CandidateDetails {
  id: number;
  login: string;
  name?: string | null;
  email?: string | null;
  bio?: string | null;
  avatar_url: string;
  html_url: string;
  added?: boolean;
}

const CandidateSearchPage = () => {
  const [candidates, setCandidates] = useState<CandidateDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to get selected candidates from localStorage
  const getSelectedCandidates = (): CandidateDetails[] => {
    const stored = localStorage.getItem("selectedCandidates");
    return stored ? JSON.parse(stored) : [];
  };

  // Save selected candidates to localStorage
  const saveSelectedCandidates = (selected: CandidateDetails[]) => {
    localStorage.setItem("selectedCandidates", JSON.stringify(selected));
  };

  // Fetch random candidates from GitHub
  const loadRandomCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const users = await searchGithub();
      const detailedCandidatesPromises = users.map((user: any) =>
        searchGithubUser(user.login)
      );
      const detailedCandidates: CandidateDetails[] = await Promise.all(
        detailedCandidatesPromises
      );

      // Mark candidates as added if they are already in localStorage
      const selectedCandidates = getSelectedCandidates();
      const updatedCandidates = detailedCandidates.map((c) => ({
        ...c,
        added: selectedCandidates.some((s) => s.id === c.id),
      }));

      setCandidates(updatedCandidates);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle candidate selection state
  const toggleCandidate = (candidate: CandidateDetails) => {
    let selectedCandidates = getSelectedCandidates();
    const isSelected = selectedCandidates.some((c) => c.id === candidate.id);

    if (isSelected) {
      selectedCandidates = selectedCandidates.filter((c) => c.id !== candidate.id);
    } else {
      selectedCandidates.push(candidate);
    }
    saveSelectedCandidates(selectedCandidates);

    // Update the local candidates list so the UI reflects the change
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidate.id ? { ...c, added: !isSelected } : c
      )
    );
  };

  useEffect(() => {
    loadRandomCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-info" onClick={loadRandomCandidates}>
          Refresh Candidates
        </button>
        <Link to="/selected" className="btn btn-secondary">
          View Selected Candidates
        </Link>
      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="col-md-3 col-sm-6 mb-4">
            <div className="card h-100" style={{ maxWidth: "18rem" }}>
              <img
                src={candidate.avatar_url}
                className="card-img-top"
                alt={candidate.login}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {candidate.name ? candidate.name : candidate.login}
                </h5>
                <p className="card-text">
                  <strong>Email:</strong>{" "}
                  {candidate.email ? candidate.email : "No email information present"}
                </p>
                <p className="card-text">
                  <strong>Bio:</strong>{" "}
                  {candidate.bio ? candidate.bio : "No bio information present"}
                </p>
                <a
                  href={candidate.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  View Profile
                </a>
                <button
                  onClick={() => toggleCandidate(candidate)}
                  className={`btn btn-sm ms-2 ${
                    candidate.added ? "btn-danger" : "btn-success"
                  }`}
                >
                  {candidate.added ? "Remove" : "Add"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <button className="btn btn-info" onClick={loadRandomCandidates}>
          Refresh Candidates
        </button>
        <Link to="/selected" className="btn btn-secondary">
          View Selected Candidates
        </Link>
      </div>
    </div>
  );
};

export default CandidateSearchPage;
