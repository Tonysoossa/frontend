import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import { Nav } from "./containers/Nav/Nav";
import { Footer } from "./containers";
import { PrivateRoute } from "./redux/PrivateRoute";

function App() {
  const checktoken = sessionStorage.getItem("authToken")
  ? 'token'
  : 'no token'
  console.log(checktoken)
  return (
    <Router>
      <Nav />
      <div className="general">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
