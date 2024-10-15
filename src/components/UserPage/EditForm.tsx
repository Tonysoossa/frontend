import styles from "../../containers/UserPage/MainUser.module.css";
import { useDispatch } from "react-redux";
import { closeForm } from "../../redux/btnSlice";
import { useRef } from "react";

interface editFormProps {
  userName: string;
  firstName: string;
  lastName: string;
}

export function EditForm({ userName, firstName, lastName }: editFormProps) {
  const dispatch = useDispatch();
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);

  // NOTE BTN HANDLERS : NOTE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  NOTE

  const handleCancelBtn = () => {
    dispatch(closeForm());
  };

  const handleVibrate = (inputRef: React.RefObject<HTMLInputElement>) => {
    const failedRequestvibration = inputRef.current;

    // Vérifie si l'input existe avant d'appliquer l'animation
    if (failedRequestvibration) {
      failedRequestvibration.classList.add(styles.vibrate);
      const timeout = setTimeout(() => {
        failedRequestvibration.classList.remove(styles.vibrate);
      }, 500);
      return () => clearTimeout(timeout); // Durée de l'animation
    }
  };

  return (
    <form className={styles.formContainer}>
      <h1>Edit user info</h1>
      <div className={styles.editInputWrapper}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" defaultValue={userName} />
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
        <button type="submit">Save</button>
        <button onClick={handleCancelBtn} className={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
}
