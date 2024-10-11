import styles from "./MainUser.module.css";
import { AccountWidget } from "../../components/UserPage/AccountWidget";

export function MainUser() {
  return (
    <main className={`${styles.main} ${styles.bgDark}`}>
      <div className={styles.header}>
        <h1>
          Welcome back <br></br>
          Tony Jarvis!
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