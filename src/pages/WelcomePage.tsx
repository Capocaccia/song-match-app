import { useState } from "react";
import styles from "./WelcomePage.module.css";

interface Props {
  onStart: (name: string) => void;
}

export function WelcomePage({ onStart }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name to continue.");
      return;
    }
    onStart(trimmed);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>🎵 Song Match</h1>
        <p className={styles.subtitle}>
          Drag each song to the person you think submitted it!
        </p>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <label htmlFor="participant-name" className={styles.label}>
            Your name
          </label>
          <input
            id="participant-name"
            type="text"
            className={styles.input}
            placeholder="e.g. Jordan"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            autoFocus
            autoComplete="off"
            maxLength={60}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btn}>
            Start matching →
          </button>
        </form>
      </div>
    </div>
  );
}
