import styles from "./Nav.module.css";
import { useNavigate } from "react-router-dom";

export function Nav() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Supposons que tu as un slice d'authentification

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  // const handleLogoutClick = () => {
  //   dispatch(logout()); // Déclencher une action de déconnexion
  //   navigate("/"); // Rediriger après déconnexion
  // };

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
        <a
          role="button"
          className={styles.mainNavItem}
          onClick={handleSignInClick}
        >
          <i className="fa fa-user-circle"></i>
          <p>Sign In</p>
        </a>
      </div>
    </nav>
  );
}

// NOTE AFTER REDUX MANIP :

{
  /* <nav className={styles.mainNav}>
<a role="button" className={styles.mainNavLogo} onClick={handleLogoClick}>
  <img
    className={styles.image}
    src={argentBankLogo}
    alt="Argent Bank Logo"
  />
  <h1 className={styles.srOnly}>Argent Bank</h1>
</a>
<div>
isLoggedIn ? (
  <a
    role="button"
    className={styles.mainNavItem}
    onClick={handleSignInClick}
  >
    <i className="fa fa-user-circle"></i>

     <p>Logout</p> 
  </a>

 ) : (
    <a
      role="button"
      className={styles.mainNavItem}
      onClick={handleSignInClick}
    >
      <i className="fa fa-user-circle"></i>
      <p>Sign In</p>
    </a> 
  )
</div>
</nav> */
}
