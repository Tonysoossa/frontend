import iconChat from "../../assets/img/icon-chat.png";
import iconMoney from "../../assets/img/icon-money.png";
import iconSecurity from "../../assets/img/icon-security.png";
import styles from "./Main.module.css";
import { Features } from "../../components/HomePage/Features";

export function Main() {
  return (
    <main>
      <div className={styles.hero}>
        <section className={styles.heroContent}>
          <h2 className={styles.srOnly}>Promoted Content</h2>
          <p className={styles.subtitle}>No fees.</p>
          <p className={styles.subtitle}>No minimum deposit.</p>
          <p className={styles.subtitle}>High interest rates.</p>
          <p className={styles.text}>
            Open a savings account with Argent Bank today!
          </p>
        </section>
      </div>
      <section className={styles.features}>
        <h2 className={styles.srOnly}>Features</h2>
        <Features
          src={iconChat}
          alt="Chat Icon"
          text="You are our #1 priority"
          textParagraphe="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <Features
          src={iconMoney}
          alt="Money Icon"
          text="More savings means higher rates"
          textParagraphe="The more you save with us, the higher your interest rate will be!"
        />
        <Features
          src={iconSecurity}
          alt="Security Icon"
          text="Security you can trust"
          textParagraphe="We use top of the line encryption to make sure your data and money is always safe."
        />
      </section>
    </main>
  );
}
