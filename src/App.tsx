import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { Matches, Submission } from "./types";
import { WelcomePage } from "./pages/WelcomePage";
import { MatchingPage } from "./pages/MatchingPage";
import { ThankYouPage } from "./pages/ThankYouPage";

type Screen = "welcome" | "matching" | "thankyou";

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [participantName, setParticipantName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleStart(name: string) {
    setParticipantName(name);
    setScreen("matching");
  }

  async function handleSubmit(matches: Matches) {
    setSubmitting(true);
    setSubmitError("");
    try {
      const submission: Submission = {
        participantName,
        matches,
        submittedAt: new Date().toISOString(),
      };
      await addDoc(collection(db, "submissions"), submission);
      setScreen("thankyou");
    } catch (err) {
      console.error("Firestore write failed:", err);
      setSubmitError(
        "Failed to save your submission. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (screen === "welcome") return <WelcomePage onStart={handleStart} />;
  if (screen === "thankyou") return <ThankYouPage />;

  return (
    <>
      {submitting && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            color: "#f1f5f9",
            fontSize: "1.2rem",
            fontWeight: 700,
          }}
        >
          Saving…
        </div>
      )}
      {submitError && (
        <div
          style={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#7f1d1d",
            color: "#fecaca",
            padding: "12px 20px",
            borderRadius: 10,
            zIndex: 9999,
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          {submitError}
        </div>
      )}
      <MatchingPage
        participantName={participantName}
        onSubmit={handleSubmit}
      />
    </>
  );
}
