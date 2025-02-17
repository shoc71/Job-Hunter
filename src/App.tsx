import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import HomePage from "./pages/HomePage"
import ErrorPage from "./pages/ErrorPage"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AboutMePage from "./pages/AboutMePage"
import ContactMePage from "./pages/ContactMePage"
import SelectedCandidatesPage from "./pages/SelectedCandidatesPage"


function App() { 

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div style={{
      backgroundColor: isDarkMode ? 'black' : 'white',
      minHeight: '100vh',
      color: isDarkMode ? 'white' : 'black'
    }}>
      <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path="/about" element={< AboutMePage />} />
        <Route path="/contact-me" element={< ContactMePage />} />
        <Route path="/selected" element={< SelectedCandidatesPage />} />
        <Route path="*" element={< ErrorPage />} />
      </Routes>
      < Footer />
    </div>
  )
}

export default App
