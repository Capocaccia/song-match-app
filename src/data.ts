// ─── Edit these lists to match your game ───────────────────────────────────

export const SONGS: { id: string; title: string; artist: string }[] = [
  { id: "song-1", title: "Los Angeles Is Burning", artist: "Bad Religion" },
  { id: "song-2", title: "cowboy in LA", artist: "LANY" },
  { id: "song-3", title: "Viva Las Vegas (Cover)", artist: "Dead Kennedys" },
  { id: "song-4", title: "La Grange (2005 Remaster)", artist: "ZZ Top" },
  { id: "song-5", title: "Pink Pony Club", artist: "Chappell Roan" },
  { id: "song-6", title: "Havana (feat. Young Thug)", artist: "Camila Cabello, Young Thug" },
  { id: "song-7", title: "Paris, Tokyo", artist: "Lupe Fiasco" },
  { id: "song-8", title: "Waterloo", artist: "ABBA" },
  { id: "song-9", title: "Hollywood Nights - Remastered 2011", artist: "Bob Seger" },
  { id: "song-10", title: "End of Beginning", artist: "Djo" },
  { id: "song-11", title: "Paradise", artist: "John Prine" },
  { id: "song-12", title: "California - Tchad Blake Mix", artist: "Phantom Planet" },
  { id: "song-13", title: "Moving to Brussels", artist: "Bhi Bhiman" },
  { id: "song-14", title: "Algiers", artist: "The Afghan Whigs" },
  { id: "song-15", title: "London Calling - Remastered", artist: "The Clash" },
  { id: "song-16", title: "No Sleep Till Brooklyn", artist: "Beastie Boys" },
  { id: "song-17", title: "Harder Than You Think", artist: "Public Enemy" },
  { id: "song-18", title: "International Love (feat. Chris Brown)", artist: "Pitbull, Chris Brown" },
  { id: "song-19", title: "Choosin' Texas", artist: "Ella Langley" },
  { id: "song-20", title: "Miami", artist: "Will Smith" },
  { id: "song-21", title: "Rotterdam (Or Anywhere)", artist: "The Beautiful South" },
  { id: "song-22", title: "Save Me, San Francisco", artist: "Train" },
  { id: "song-23", title: "One Night in Bangkok - Vinylshakerz", artist: "Vinylshakerz" },
];

export const USERS: { id: string; name: string }[] = [
  { id: "user-1", name: "amrinton87" },
  { id: "user-2", name: "Bill Naife" },
  { id: "user-3", name: "capocaccia" },
  { id: "user-4", name: "carterhannah3" },
  { id: "user-5", name: "colinbperry" },
  { id: "user-6", name: "Conor M" },
  { id: "user-7", name: "David Bartosh" },
  { id: "user-8", name: "Elster" },
  { id: "user-9", name: "emacadacious" },
  { id: "user-10", name: "Ernie" },
  { id: "user-11", name: "Gerry Branch II" },
  { id: "user-12", name: "hannah" },
  { id: "user-13", name: "Isabel M" },
  { id: "user-14", name: "Jeff Mocini" },
  { id: "user-15", name: "Jessica Gall" },
  { id: "user-16", name: "Jessie Paterson" },
  { id: "user-17", name: "Kris M" },
  { id: "user-18", name: "Lucy B" },
  { id: "user-19", name: "Matt H" },
  { id: "user-20", name: "Matt K" },
  { id: "user-21", name: "Mike Mookie Ham" },
  { id: "user-22", name: "Renae" },
  { id: "user-23", name: "Rushil" },
  { id: "user-24", name: "William VanDolah" },
  { id: "user-25", name: "Yo Andrea!" },
];

/** Correct answer key: songId → userId */
export const ANSWER_KEY: Record<string, string> = {
  "song-1":  "user-2",   // Los Angeles Is Burning → Bill Naife
  "song-2":  "user-5",   // cowboy in LA → colinbperry
  "song-3":  "user-25",  // Viva Las Vegas (Cover) → Yo Andrea!
  "song-4":  "user-7",   // La Grange (2005 Remaster) → David Bartosh
  "song-5":  "user-16",  // Pink Pony Club → Jessie Paterson
  "song-6":  "user-8",   // Havana (feat. Young Thug) → Elster
  "song-7":  "user-11",  // Paris, Tokyo → Gerry Branch II
  "song-8":  "user-15",  // Waterloo → Jessica Gall
  "song-9":  "user-14",  // Hollywood Nights - Remastered 2011 → Jeff Mocini
  "song-10": "user-17",  // End of Beginning → Kris M
  "song-11": "user-12",  // Paradise → hannah
  "song-12": "user-24",  // California - Tchad Blake Mix → William VanDolah
  "song-13": "user-19",  // Moving to Brussels → Matt H
  "song-14": "user-18",  // Algiers → Lucy B
  "song-15": "user-21",  // London Calling - Remastered → Mike Mookie Ham
  "song-16": "user-10",  // No Sleep Till Brooklyn → Ernie
  "song-17": "user-3",   // Harder Than You Think → capocaccia
  "song-18": "user-23",  // International Love (feat. Chris Brown) → Rushil
  "song-19": "user-1",   // Choosin' Texas → amrinton87
  "song-20": "user-13",  // Miami → Isabel M
  "song-21": "user-6",   // Rotterdam (Or Anywhere) → Conor M
  "song-22": "user-20",  // Save Me, San Francisco → Matt K
  "song-23": "user-22",  // One Night in Bangkok - Vinylshakerz → Renae
};
