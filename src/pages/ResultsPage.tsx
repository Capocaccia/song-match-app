import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ANSWER_KEY, SONGS, USERS } from "../data";
import type { Submission } from "../types";
import styles from "./ResultsPage.module.css";

interface SongResult {
  songTitle: string;
  guessed: string;   // name of person they guessed
  correct: string;   // name of correct person
  isCorrect: boolean;
}

interface ScoredSubmission {
  participantName: string;
  score: number;
  submittedAt: string;
  songResults: SongResult[];
}

const TOTAL = Object.keys(ANSWER_KEY).length;
const userMap = Object.fromEntries(USERS.map((u) => [u.id, u.name]));

const MEDAL = ["🥇", "🥈", "🥉"];

export function ResultsPage() {
  if (TOTAL === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>🏆 Leaderboard</h1>
          <p className={styles.status}>Results not yet available. Check back after the event!</p>
        </div>
      </div>
    );
  }
  const [results, setResults] = useState<ScoredSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDocs(collection(db, "submissions"))
      .then((snapshot) => {
        const scored: ScoredSubmission[] = snapshot.docs.map((doc) => {
          const sub = doc.data() as Submission;
          const songResults: SongResult[] = SONGS.map((song) => {
            const guessedUserId = sub.matches?.[song.id];
            const correctUserId = ANSWER_KEY[song.id];
            return {
              songTitle: song.title,
              guessed: guessedUserId ? (userMap[guessedUserId] ?? guessedUserId) : "—",
              correct: userMap[correctUserId] ?? correctUserId,
              isCorrect: guessedUserId === correctUserId,
            };
          });
          return {
            participantName: sub.participantName,
            score: songResults.filter((s) => s.isCorrect).length,
            submittedAt: sub.submittedAt,
            songResults,
          };
        });
        // Sort by score desc, then alphabetically as tiebreaker
        scored.sort(
          (a, b) => b.score - a.score || a.participantName.localeCompare(b.participantName)
        );
        setResults(scored);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load submissions.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>🏆 Leaderboard</h1>
        <p className={styles.subtitle}>
          {TOTAL} songs &middot; {results.length} submission{results.length !== 1 ? "s" : ""}
        </p>

        {loading && <p className={styles.status}>Loading submissions…</p>}
        {error && <p className={styles.statusError}>{error}</p>}

        {!loading && !error && results.length === 0 && (
          <p className={styles.status}>No submissions yet.</p>
        )}

        {!loading && !error && results.length > 0 && (
          <div className={styles.leaderboard}>
            {results.map((r, i) => (
              <details
                key={r.participantName + r.submittedAt}
                className={`${styles.row} ${
                  i === 0 ? styles.gold : i === 1 ? styles.silver : i === 2 ? styles.bronze : ""
                }`}
              >
                <summary className={styles.rowSummary}>
                  <span className={styles.rank}>
                    {i < 3 ? MEDAL[i] : i + 1}
                  </span>
                  <span className={styles.name}>{r.participantName}</span>
                  <span className={styles.score}>
                    {r.score}
                    <span className={styles.total}> / {TOTAL}</span>
                  </span>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${(r.score / TOTAL) * 100}%` }}
                    />
                  </div>
                </summary>
                <table className={styles.songTable}>
                  <thead>
                    <tr>
                      <th className={styles.thSong}>Song</th>
                      <th className={styles.thGuess}>Their guess</th>
                      <th className={styles.thAnswer}>Correct answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.songResults.map((sr) => (
                      <tr key={sr.songTitle} className={sr.isCorrect ? styles.trCorrect : styles.trWrong}>
                        <td className={styles.tdSong}>
                          <span className={styles.resultIcon}>{sr.isCorrect ? "✓" : "✗"}</span>
                          {sr.songTitle}
                        </td>
                        <td className={`${styles.tdGuess} ${sr.isCorrect ? styles.guessCorrect : styles.guessWrong}`}>
                          {sr.guessed}
                        </td>
                        <td className={styles.tdAnswer}>{sr.correct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            ))}
          </div>
        )}

        <details className={styles.answerKey}>
          <summary>Answer Key</summary>
          <ul className={styles.akList}>
            {SONGS.map((s) => (
              <li key={s.id} className={styles.akItem}>
                <span className={styles.akSong}>{s.title}</span>
                <span className={styles.akArrow}>→</span>
                <span className={styles.akUser}>
                  {userMap[ANSWER_KEY[s.id]] ?? "?"}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
