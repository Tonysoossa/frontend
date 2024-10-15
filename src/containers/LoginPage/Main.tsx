import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { RootState, AppDispatch } from "../../redux/store";
import styles from "./Main.module.css";
import { useRef } from "react";

export function MainLogIn() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { error, token, vibrate } = useSelector(
    (state: RootState) => state.auth
  );

  // NOTE Pour des raison de sécurité, évite d'exposer les donnée sensible dans le store, ici on gère localement avec useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleVibrate = (inputRef: React.RefObject<HTMLInputElement>) => {
    const failedRequestVibration = inputRef.current;

    // Vérifie si l'input existe avant d'appliquer l'animation
    if (failedRequestVibration) {
      failedRequestVibration.classList.add(styles.vibrate);
      const timeoutId = setTimeout(() => {
        failedRequestVibration.classList.remove(styles.vibrate);
      }, 500); // Durée de l'animation

      return () => clearTimeout(timeoutId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Utilisation de useEffect pour surveiller le token et naviguer une fois qu'il est disponible
  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  });

  useEffect(() => {
    if (error && vibrate) {
      handleVibrate(emailRef);
      handleVibrate(passwordRef);
    }
  }, [error, vibrate]);

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
              onChange={(e) => setEmail(e.target.value)}
              required
              className={vibrate ? styles.vibrate : ""}
            />
          </div>
          {error && <div className={styles.error}>User not recognised</div>}

          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={vibrate ? styles.vibrate : ""}
            />
          </div>

          {error && !error.includes("email") && (
            <div className={styles.error}>Password rejected</div>
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
