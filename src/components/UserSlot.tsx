import { useDroppable } from "@dnd-kit/core";
import type { Song, User } from "../types";
import styles from "./UserSlot.module.css";

interface Props {
  user: User;
  matchedSong: Song | undefined;
  onRemove: (songId: string) => void;
}

export function UserSlot({ user, matchedSong, onRemove }: Props) {
  const { isOver, setNodeRef } = useDroppable({ id: user.id });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.slot} ${isOver ? styles.over : ""} ${matchedSong ? styles.filled : ""}`}
    >
      <div className={styles.userName}>{user.name}</div>
      {matchedSong ? (
        <div className={styles.matchedSong}>
          <span className={styles.songTitle}>{matchedSong.title}</span>
          <button
            className={styles.removeBtn}
            onClick={() => onRemove(matchedSong.id)}
            aria-label={`Remove ${matchedSong.title} from ${user.name}`}
          >
            ✕
          </button>
        </div>
      ) : (
        <div className={styles.placeholder}>Drop a song here</div>
      )}
    </div>
  );
}
