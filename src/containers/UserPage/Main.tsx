import { AccountWidget } from "../../components/UserPage/AccountWidget";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/authSlice";
import { RootState, AppDispatch } from "../../redux/store";
import styles from "./MainUser.module.css";

export function MainUser() {
  const dispatch: AppDispatch = useDispatch();

  const { token, firstName, lastName } = useSelector(
    (state: RootState) => state.auth
  );

 // Utilisation de useEffect pour surveiller le token et naviguer une fois qu'il est disponible
 useEffect(() => {
  const fetchProfile = async () => {
    if (!token) return; // Vérifie si le token est présent avant d'appeler fetchUserProfile au lieu de lancer fetch et attendre le token
    try {
      await dispatch(fetchUserProfile()).unwrap(); // Utilise unwrap pour gérer les erreurs
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  fetchProfile(); // Appelle la fonction pour récupérer le profil si token est présent
}, [token, dispatch]); // Ajoute dispatch aux dépendances

  return (
    <main className={`${styles.main} ${styles.bgDark}`}>
      <div className={styles.header}>
        <h1>
          Welcome back <br />
          {firstName ? `${firstName} ${lastName}!` : "Loading..."}
        </h1>
        <button className={styles.editButton}>Edit Name</button>
      </div>
      <h2 className={styles.srOnly}>Accounts</h2>
      <AccountWidget
        h3="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <AccountWidget
        h3="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <AccountWidget
        h3="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  );
}
