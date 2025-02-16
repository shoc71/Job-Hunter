import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ErrorPage from "./pages/ErrorPage"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"


function App() { 

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path="*" element={< ErrorPage />} />
      </Routes>
      < Footer />
    </div>
  )
}

export default App
