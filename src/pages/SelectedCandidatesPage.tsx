import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CandidateContext } from '../contexts/CandidateContext';

const SelectedCandidatesPage = () => {
  const { selectedCandidates, rejectCandidate } = useContext(CandidateContext);

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
                      style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                    />
                  </td>
                  <td>{candidate.name ? candidate.name : "null"}</td>
                  <td>{candidate.email ? candidate.email : "null"}</td>
                  <td>{candidate.bio ? candidate.bio : "null"}</td>
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
