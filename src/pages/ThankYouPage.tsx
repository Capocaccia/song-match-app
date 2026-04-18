import styles from "./ThankYouPage.module.css";

export function ThankYouPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon}>🎉</div>
        <h1 className={styles.title}>Submitted!</h1>
        <p className={styles.body}>
          Your answers have been saved. Stay tuned for the reveal!
        </p>
      </div>
    </div>
  );
}
