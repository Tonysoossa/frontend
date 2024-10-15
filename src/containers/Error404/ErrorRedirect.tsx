import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./error404.module.css";

export function ErrorRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 20000);
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  const handleHomePageBtn = () => {
    navigate("/");
  };
  const handleLogPageBtn = () => {
    navigate("/login");
  };

  return (
    <>
      <div className={styles.errorContainer}>
        <p className={styles.errorPageText}>Our apologizes, an error occured. Your account isn't found in our databased. Make sure that the email and password are correct. </p>
        <div className={styles.redirectItems}>
          <button onClick={handleHomePageBtn} className={styles.redirectBtn}>
            Home page
          </button>
          <button onClick={handleLogPageBtn} className={styles.redirectBtn}>
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}
