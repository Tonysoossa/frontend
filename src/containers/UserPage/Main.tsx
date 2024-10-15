import { AccountWidget } from "../../components/UserPage/AccountWidget";
import { EditForm } from "../../components/UserPage/EditForm";
import { openForm, closeForm } from "../../redux/btnSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/authSlice";
import { RootState, AppDispatch } from "../../redux/store";
import styles from "./MainUser.module.css";
import { useLocation } from "react-router-dom";

export function MainUser() {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const { token, firstName, lastName, userName } = useSelector(
    (state: RootState) => state.auth
  );
  const formVisible = useSelector(
    (state: RootState) => state.editButton.editFormVisible
  );

  // NOTE useEffect HANDLERS : NOTE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  NOTE

  // Utilisation de useEffect pour surveiller le token et naviguer une fois qu'il est disponible
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      // Vérifie si le token est présent avant d'appeler fetchUserProfile au lieu de lancer fetch et attendre le token
      try {
        await dispatch(fetchUserProfile()).unwrap(); // Utilise unwrap pour gérer les erreurs
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile(); // Appelle la fonction pour récupérer le profil si token est présent
  }, [token, dispatch]); // Ajoute dispatch aux dépendances

  useEffect(() => {
    // Si le token est absent, ferme le formulaire
    if (!token) {
      dispatch(closeForm());
    }
  }, [token, dispatch]);

  // Utilisation de useEffect pour fermer le formulaire sur les changements de page
  useEffect(() => {
    dispatch(closeForm());
  }, [location.pathname, dispatch]);

  // NOTE BTN HANDLERS : NOTE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! NOTE

  const handleEditBtn = () => {
    dispatch(openForm());
  };

  return (
    <main className={`${styles.main} ${styles.bgDark}`}>
      <div className={styles.header}>
        <h1>
          Welcome back <br />
          {firstName ? `${firstName} ${lastName}!` : "Loading..."}
        </h1>
        {!formVisible && (
          <button onClick={handleEditBtn} className={styles.editButton}>
            Edit Name
          </button>
        )}
      </div>

      {formVisible && ( // Affiche le formulaire si formVisible est true
        <EditForm
          userName={userName || ""}
          firstName={firstName || ""}
          lastName={lastName || ""}
        />
      )}
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
