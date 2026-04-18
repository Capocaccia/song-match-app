import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Song } from "../types";
import styles from "./SongCard.module.css";

interface Props {
  song: Song;
  isMatched: boolean;
}

export function SongCard({ song, isMatched }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: song.id, disabled: isMatched });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.card} ${isMatched ? styles.matched : ""}`}
      {...listeners}
      {...attributes}
    >
      <span className={styles.title}>{song.title}</span>
      <span className={styles.artist}>{song.artist}</span>
    </div>
  );
}
