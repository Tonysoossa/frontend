import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetError, resetVibrate } from "../../redux/authSlice";
import { RootState, AppDispatch } from "../../redux/store";
import styles from "./Main.module.css";

export function MainLogIn() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, token, vibrate } = useSelector(
    (state: RootState) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  // NOTENOTENOTENOTE BTN HANDLERS NOTENOTENOTENOTENOTENOTENOTE

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    setLocalError(""); // Efface l'erreur locale si nouvelle saisie
  };

  // NOTENOTENOTENOTE useEffect HANDLERS : NOTENOTENOTENOTENOTE

  useEffect(() => {
    dispatch(resetVibrate());  
    return () => {
      dispatch(resetError());  
    };
  }, [location.pathname, dispatch]);
  

  // NOTE Gestion de la redirection si connexion réussie
  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      setLocalError(error); // Met à jour l'erreur locale avec celle du store
    }
  }, [error]);

  return (
    <main className={`${styles.main} ${styles.bgDark}`}>
      <section className={styles.signInContent}>
        <i className={`fa fa-user-circle ${styles.signInIcon}`}></i>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => handleInputChange(setEmail, e.target.value)}
              required
              className={vibrate ? styles.vibration : ""}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInputChange(setPassword, e.target.value)}
              required
              className={vibrate ? styles.vibration : ""}
            />
          </div>
          {localError && (
            <div className={styles.error}>
              Not Authorized, verify email or password
            </div>
          )}
          <div className={styles.inputRemember}>
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className={styles.signInButton} type="submit" name="Login">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
