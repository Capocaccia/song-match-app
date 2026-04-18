export interface Song {
  id: string;
  title: string;
  artist: string;
}

export interface User {
  id: string;
  name: string;
}

/** Map of songId → userId */
export type Matches = Record<string, string>;

export interface Submission {
  participantName: string;
  matches: Matches;
  submittedAt: string; // ISO timestamp
}
