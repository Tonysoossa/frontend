import styles from "../../containers/UserPage/MainUser.module.css";

interface AccountWidgetProps {
  h3: string;
  amount: string;
  description: string;
}

export function AccountWidget({ h3, amount, description }: AccountWidgetProps) {
  return (
    <section className={styles.account}>
      <div className={styles.accountContentWrapper}>
        <h3>{h3}</h3>
        <p className={styles.accountAmount}>{amount}</p>
        <p className={styles.accountAmountDescription}>{description}</p>
      </div>
      <div className={`${styles.accountContentWrapper} ${styles.cta}`}>
        <button className={styles.transactionBtn}>View transactions</button>
      </div>
    </section>
  );
}
