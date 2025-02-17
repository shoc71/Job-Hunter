import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CandidateDetails } from "./CandidateSearchPage"; // Or define the type here

const SelectedCandidatesPage = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<CandidateDetails[]>([]);

  // Helper to get candidates from localStorage
  const getSelectedCandidates = (): CandidateDetails[] => {
    const stored = localStorage.getItem("selectedCandidates");
    return stored ? JSON.parse(stored) : [];
  };

  // Load candidates when the component mounts
  useEffect(() => {
    setSelectedCandidates(getSelectedCandidates());
  }, []);

  // Remove candidate and update localStorage
  const rejectCandidate = (id: number) => {
    const updatedCandidates = selectedCandidates.filter((candidate) => candidate.id !== id);
    localStorage.setItem("selectedCandidates", JSON.stringify(updatedCandidates));
    setSelectedCandidates(updatedCandidates);
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Selected Candidates</h1>
      {selectedCandidates.length === 0 ? (
        <p>No candidates have been selected.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Bio</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedCandidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>
                    <img
                      src={candidate.avatar_url}
                      alt={candidate.login}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{candidate.name ? candidate.name : candidate.login}</td>
                  <td>{candidate.email ? candidate.email : "No email"}</td>
                  <td>{candidate.bio ? candidate.bio : "No bio"}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => rejectCandidate(candidate.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </div>
  );
};

export default SelectedCandidatesPage;
