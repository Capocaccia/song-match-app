import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { SONGS, USERS } from "../data";
import type { Matches, Song } from "../types";
import { SongCard } from "../components/SongCard";
import { UserSlot } from "../components/UserSlot";
import styles from "./MatchingPage.module.css";

interface Props {
  participantName: string;
  onSubmit: (matches: Matches) => void;
}

export function MatchingPage({ participantName, onSubmit }: Props) {
  const [matches, setMatches] = useState<Matches>({});
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [submitError, setSubmitError] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const song = SONGS.find((s) => s.id === event.active.id);
    setActiveSong(song ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveSong(null);
    const { active, over } = event;
    if (!over) return;

    const songId = active.id as string;
    const userId = over.id as string;

    // Verify the drop target is a valid user slot
    if (!USERS.find((u) => u.id === userId)) return;

    setMatches((prev) => {
      const next = { ...prev };
      // Remove any existing assignment of this song
      Object.keys(next).forEach((k) => {
        if (next[k] === userId) delete next[k]; // clear previous song on that user
      });
      next[songId] = userId;
      return next;
    });
  }

  function handleRemove(songId: string) {
    setMatches((prev) => {
      const next = { ...prev };
      delete next[songId];
      return next;
    });
  }

  function handleSubmit() {
    if (Object.keys(matches).length < SONGS.length) {
      setSubmitError(
        `Please match all ${SONGS.length} songs before submitting.`
      );
      return;
    }
    setSubmitError("");
    onSubmit(matches);
  }

  const matchedSongIds = new Set(Object.keys(matches));

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>🎵 Song Match</h1>
          <p className={styles.greeting}>
            Hi <strong>{participantName}</strong> — drag each song to who you
            think submitted it!
          </p>
        </header>

        <div className={styles.body}>
          {/* Songs column */}
          <section className={styles.column}>
            <h2 className={styles.columnTitle}>Songs</h2>
            <div className={styles.songList}>
              {SONGS.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isMatched={matchedSongIds.has(song.id)}
                />
              ))}
            </div>
          </section>

          {/* Users column */}
          <section className={styles.column}>
            <h2 className={styles.columnTitle}>People</h2>
            <div className={styles.userList}>
              {USERS.map((user) => {
                const songId = Object.keys(matches).find(
                  (k) => matches[k] === user.id
                );
                const matchedSong = SONGS.find((s) => s.id === songId);
                return (
                  <UserSlot
                    key={user.id}
                    user={user}
                    matchedSong={matchedSong}
                    onRemove={handleRemove}
                  />
                );
              })}
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <p className={styles.progress}>
            {Object.keys(matches).length} / {SONGS.length} matched
          </p>
          {submitError && <p className={styles.error}>{submitError}</p>}
          <button className={styles.submitBtn} onClick={handleSubmit}>
            Submit answers
          </button>
        </footer>
      </div>

      {/* Drag overlay — renders the card under the cursor */}
      <DragOverlay>
        {activeSong ? (
          <SongCard song={activeSong} isMatched={false} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
