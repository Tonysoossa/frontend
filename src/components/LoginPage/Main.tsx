import styles from "./Main.module.css";

export function MainLogIn() {
  return (
    <main className={`${styles.main} ${styles.bgDark}`}>
      <section className={styles.signInContent}>
        <i className={`fa fa-user-circle ${styles.signInIcon}`}></i>
        <h1>Sign In</h1>
        <form>
          <div className={styles.inputWrapper}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required></input>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required></input>
          </div>
          <div className={styles.inputRemember}>
            <input type="checkbox" id="remember-me" required></input>
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
