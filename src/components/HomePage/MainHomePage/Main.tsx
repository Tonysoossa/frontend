import iconChat from "../../../assets/img/icon-chat.png";
import iconMoney from "../../../assets/img/icon-money.png";
import iconSecurity from "../../../assets/img/icon-security.png";
import styles from "./Main.module.css";

export function Main() {
  return (
    <main>
      <div className={styles.hero}>
        <section className={styles.heroContent}>
          <h2 className={styles.srOnly}>Promoted Content</h2>
          <p className={styles.subtitle}>No fees.</p>
          <p className={styles.subtitle}>No minimum deposit.</p>
          <p className={styles.subtitle}>High interest rates.</p>
          <p className={styles.text}>Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className={styles.features}>
        <h2 className={styles.srOnly}>Features</h2>
        <div className={styles.featuresItem}>
          <img src={iconChat} alt="Chat Icon" className={styles.featureIcon} />
          <h3 className={styles.featureItemTitle}>You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        <div className={styles.featuresItem}>
          <img src={iconMoney} alt="Chat Icon" className={styles.featureIcon} />
          <h3 className={styles.featureItemTitle}>
            More savings means higher rates
          </h3>
          <p>
            The more you save with us, the higher your interest rate will be!
          </p>
        </div>
        <div className={styles.featuresItem}>
          <img src={iconSecurity} alt="Chat Icon" className={styles.featureIcon} />
          <h3 className={styles.featureItemTitle}>Security you can trust</h3>
          <p>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </section>
    </main>
  );
}
