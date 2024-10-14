import styles from "./Nav.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faVault } from "@fortawesome/free-solid-svg-icons";

export function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, userName } = useSelector((state: RootState) => state.auth);

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleUserIconClick = () => {
    navigate("/profile");
  };

  const handleLogoClick = () => navigate("/");
  const handleLogoutClick = () => {
    dispatch(logout());
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className={styles.mainNav}>
      <a role="button" className={styles.mainNavLogo} onClick={handleLogoClick}>
        {token && <FontAwesomeIcon icon={faVault} className={styles.faVault} />}
        <img
          className={styles.image}
          src="/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className={styles.srOnly}>Argent Bank</h1>
      </a>
      <div>
        {token ? (
          <div className={styles.mainNavItemLoggedIn}>
            <a
              role="button"
              onClick={handleUserIconClick}
              className={styles.userLoggedInText}
            >
              {userName}
            </a>
            <a role="button" onClick={handleUserIconClick}>
              <i className={`fa fa-user-circle ${styles.loggedUserIcon}`}></i>
            </a>
            <a role="button">
              <FontAwesomeIcon icon={faGear} className={styles.gearBtn} />
            </a>

            <a role="button" onClick={handleLogoutClick}>
              <FontAwesomeIcon
                className={styles.faPowerOff}
                icon={faPowerOff}
                style={{ color: "#00bc77" }}
              />
            </a>
          </div>
        ) : (
          <a
            role="button"
            onClick={handleSignInClick}
            className={styles.mainNavItem}
          >
            <i className={`fa fa-user-circle ${styles.userIcon}`}></i>
            <p>Sign In</p>
          </a>
        )}
      </div>
    </nav>
  );
}
