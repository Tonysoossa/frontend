import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import { Nav } from "./containers/Nav/Nav";
import { Footer } from "./containers";
import UnAuth from "./pages/Error404";

function App() {
  return (
    <Router>
      <Nav />
      <div className="general">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/error404" element={<UnAuth />} />
          <Route path="/profile" element={<UserPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
