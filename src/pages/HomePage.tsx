import CandidateSearchPage from "./CandidateSearchPage";

const HomePage = () => {
  console.log("GitHub Token:", import.meta.env.VITE_GITHUB_TOKEN);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4">Welcome to GitHub Candidate Finder</h1>
              <p className="lead">
                Discover top GitHub talent with our streamlined candidate search.
                Refresh the list to find new profiles and select your potential candidates.
              </p>
              <a href="#candidates" className="btn btn-primary btn-lg">
                Get Started
              </a>
            </div>
            <div className="col-md-6">
              <img
                src="https://shorturl.at/Os3PN"
                alt="Tech Talent"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Search Section */}
      <section id="candidates" className="py-5">
        <div className="container text-center">
          <CandidateSearchPage />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
