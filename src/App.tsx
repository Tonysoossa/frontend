import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Nav } from "./components/Nav/Nav";
import { Footer } from "./components";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
