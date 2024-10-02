import argentBankLogo from "../../../../public/argentBankLogo.png";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <nav className={styles.mainNav}>
      <a className={styles.mainNavLogo} href="./index.html">
        <img
          className={styles.image}
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className={styles.srOnly}>Argent Bank</h1>
      </a>
      <div>
        <a className={styles.mainNavItem} href="./sign-in.html">
          <i className="fa fa-user-circle"></i>
          Sign In
        </a>
      </div>
    </nav>
  );
}
