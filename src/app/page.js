import styles from "./page.module.css";

import CurrencyExchange from "./currency-exchange/currency-exchange";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <h1>Currency Exchange App</h1>
      </header>
      <main className={styles.main}>
        <CurrencyExchange />
      </main>
      <footer className={styles.footer}>
        <h4>Example developed by V.A. Ochenin</h4>
      </footer>
    </div>
  );
}
