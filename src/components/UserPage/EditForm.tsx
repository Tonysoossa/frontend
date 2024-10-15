import styles from "../../containers/UserPage/MainUser.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { closeForm } from "../../redux/btnSlice";
import { useRef } from "react";
import { updateUserName } from "../../redux/authSlice"; 

interface editFormProps {
  userName: string;
  firstName: string;
  lastName: string;
}

export function EditForm({ userName, firstName, lastName }: editFormProps) {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const userNameRef = useRef<HTMLInputElement | null>(null);

  // NOTE BTN HANDLERS NOTENOTENOTENOTENOTENOTENOTENOTENOTENOTE

  const handleCancelBtn = () => {
    dispatch(closeForm());
  };

  const handleSaveBtn = (e: React.FormEvent) => {
    e.preventDefault(); // NOTE Empêche le comportement par défaut de la soumission du formulaire
    const updatedUserName = userNameRef.current?.value;

    if (updatedUserName && updatedUserName !== userName) {
      dispatch(updateUserName({ userName: updatedUserName }))
        .unwrap()
        .then(() => {
          dispatch(closeForm());
        })
        .catch((err) => {
          console.error("Failed to update userName:", err);
        });
    }
  };

  const handleVibrate = (inputRef: React.RefObject<HTMLInputElement>) => {
    const failedRequestvibration = inputRef.current;

    // NOTE Vérifie si l'input existe avant d'appliquer l'animation
    if (failedRequestvibration) {
      failedRequestvibration.classList.add(styles.vibrate);
      const timeout = setTimeout(() => {
        failedRequestvibration.classList.remove(styles.vibrate);
      }, 500);
      return () => clearTimeout(timeout);
    }
  };

  return (
    <form className={styles.formContainer}>
      <h1>Edit user info</h1>
      <div className={styles.editInputWrapper}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          defaultValue={userName}
          ref={userNameRef}
        />
      </div>
      <div className={styles.editInputWrapper}>
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          defaultValue={firstName}
          readOnly
          ref={firstNameRef}
          onClick={() => handleVibrate(firstNameRef)}
          className={styles.editFormInputFilter}
        />
      </div>
      <div className={styles.editInputWrapper}>
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          defaultValue={lastName}
          readOnly
          onClick={() => handleVibrate(lastNameRef)}
          ref={lastNameRef}
          className={styles.editFormInputFilter}
        />
      </div>
      <div className={styles.editFormBtnWrapper}>
        <button onClick={handleSaveBtn} type="submit">
          Save
        </button>
        <button onClick={handleCancelBtn} className={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
}
