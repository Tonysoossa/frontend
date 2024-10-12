import styles from "./Nav.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; //
import { logout } from "../../redux/authSlice";
import { RootState } from "../../redux/store";

export function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialisation du dispatch
  const { token } = useSelector((state: RootState) => state.auth);

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleLogoClick = () => navigate("/");

  const handleLogoutClick = () => {
    dispatch(logout()); // Déconnexion en utilisant Redux
    sessionStorage.removeItem("authToken");
    navigate("/"); // Rediriger vers la page d'accueil après la déconnexion
  };

  return (
    <nav className={styles.mainNav}>
      <a role="button" className={styles.mainNavLogo} onClick={handleLogoClick}>
        <img
          className={styles.image}
          src="/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className={styles.srOnly}>Argent Bank</h1>
      </a>
      <div>
        {token ? ( // Si l'utilisateur est connecté (token existe)
          <a
            role="button"
            className={styles.mainNavItem}
            onClick={handleLogoutClick}
          >
            <i className="fa fa-user-circle"></i>
            <p>Logout</p>{" "}
            {/* Afficher "Logout" si l'utilisateur est connecté */}
          </a>
        ) : (
          <a
            role="button"
            className={styles.mainNavItem}
            onClick={handleSignInClick}
          >
            <i className="fa fa-user-circle"></i>
            <p>Sign In</p>{" "}
            {/* Afficher "Sign In" si l'utilisateur n'est pas connecté */}
          </a>
        )}
      </div>
    </nav>
  );
}
