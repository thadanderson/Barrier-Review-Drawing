
import { LevelMap, RouletteItem } from './types';

// Helper to create items quickly
const createItem = (label: string, source: string, tempo?: string): RouletteItem => ({
  id: `${source}-${label}`.replace(/\s+/g, '-').toLowerCase(),
  label,
  source,
  tempo
});

// UCF Inspired Palette: Gold, Black, Dark Gray, White/Off-White
export const COLORS = [
  '#FFC904', // Bright Gold
  '#171717', // Neutral 900 (Black-ish)
  '#BFA100', // Darker Gold
  '#262626', // Neutral 800
  '#EAB308', // Amber 500
  '#000000', // Pure Black
];

export const SARCASTIC_QUOTES = [
  "Oooohhhh, tough draw!",
  "The last student who drew this one is still crying.",
  "I thought we removed this option?!",
  "My condolences.",
  "Have you considered switching majors?",
  "This one builds character. And tendonitis.",
  "I hope you practiced your slow tempos.",
  "Don't worry, nobody plays this one perfectly.",
  "Ah, a classic. A terrible, difficult classic.",
  "Better warm up those wrists.",
  "Oh look, the one everyone skips.",
  "This is what we call a 'learning opportunity'.",
  "Good luck. You'll need it.",
  "Technically possible. Musically? We'll see.",
  "RIP your GPA.",
  "I'd offer help, but I can't play this one either.",
  "Maybe it's not too late to fake an illness?",
];

export const PERCUSSION_DATA: LevelMap = {
  "Snare Deficient": {
    "Roll Rudiments": [
      createItem("1. Single Stroke Roll", "Roll Rudiments", "quarter = 80"),
      createItem("2. Single Stroke Four", "Roll Rudiments", "quarter = 114"),
      createItem("3. Single Stroke Seven", "Roll Rudiments", "quarter = 128"),
      createItem("4. Multiple Bounce", "Roll Rudiments", "quarter = 120"),
      createItem("5. Triple Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("6. Double Stroke Open Roll", "Roll Rudiments", "quarter = 100"),
      createItem("7. Five Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("8. Six Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("9. Seven Stroke Roll", "Roll Rudiments", "quarter = 75/100"),
      createItem("10. Nine Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("11. Ten Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("12. Eleven Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("13. Thirteen Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("14. Fifteen Stroke Roll", "Roll Rudiments", "quarter = 100"),
      createItem("15. Seventeen Stroke Roll", "Roll Rudiments", "quarter = 100"),
    ],
    "Diddle Rudiments": [
      createItem("16. Single Paradiddle", "Diddle Rudiments", "quarter = 150"),
      createItem("17. Double Paradiddle", "Diddle Rudiments", "dotted-quarter = 88"),
      createItem("18. Triple Paradiddle", "Diddle Rudiments", "quarter = 130"),
      createItem("19. Single Paradiddle-Diddle", "Diddle Rudiments", "dotted-quarter = 94"),
    ],
    "Flam Rudiments": [
      createItem("20. Flam", "Flam Rudiments", "quarter = 250"),
      createItem("21. Flam Accent", "Flam Rudiments", "dotted-quarter = 112"),
      createItem("22. Flam Tap", "Flam Rudiments", "quarter = 104"),
      createItem("23. Flamacue", "Flam Rudiments", "quarter = 110"),
      createItem("24. Flam Paradiddle", "Flam Rudiments", "quarter = 88"),
      createItem("25. Single Flammed Mill", "Flam Rudiments", "quarter = 88"),
      createItem("26. Flam Paradiddle-diddle", "Flam Rudiments", "dotted-quarter = 60"),
      createItem("27. Pataflafla", "Flam Rudiments", "quarter = 70"),
      createItem("28. Swiss Army Triplet", "Flam Rudiments", "quarter = 78"),
      createItem("29. Inverted Flam Tap", "Flam Rudiments", "quarter = 74"),
      createItem("30. Flam Drag", "Flam Rudiments", "dotted-quarter = 98"),
    ],
    "Drag Rudiments": [
      createItem("31. Drag", "Drag Rudiments", "quarter = 144"),
      createItem("32. Single Drag Tap", "Drag Rudiments", "quarter = 140"),
      createItem("33. Double Drag Tap", "Drag Rudiments", "dotted-quarter = 70"),
      createItem("34. Lesson 25", "Drag Rudiments", "quarter = 100"),
      createItem("35. Single Dragaddidle", "Drag Rudiments", "quarter = 106"),
      createItem("36. Drag Paradiddle #1", "Drag Rudiments", "dotted-quarter = 68"),
      createItem("37. Drag Paradiddle #2", "Drag Rudiments", "dotted-quarter = 90"),
      createItem("38. Single Ratamacue", "Drag Rudiments", "quarter = 90"),
      createItem("39. Double Ratamacue", "Drag Rudiments", "dotted-quarter = 58"),
      createItem("40. Triple Ratamacue", "Drag Rudiments", "quarter = 90"),
    ],
    "Rudimental Workshop": [
      "Relax and Roll With It", "S.S. IV", "Wormey Singlets", "Long Roll Samba", "High Five",
      "Six Stroke Sally", "Seven", "Number Nine", "Ten Pin", "Eleven",
      "Thirteenth Floor", "Funky and Fifteen", "The Longest Roll", "Buzz Me Up", "Stroke3",
      "Back That Diddle Up", "Double P", "It's a Triple Paradiddle", "S.P.D.", "Flam the P's",
      "Triple Whip", "One Fine Drag (a Diddle)", "D.P. #1", "D.P. #2", "Flam-Bam!",
      "Flam Accent Groove", "Flam Taps in Space", "'Cue It Up", "Pretty Fla", "Swiss Army Triplets",
      "A Familiar Mill", "Inverted Malf Pat", "Year of the Dragon", "Etude S.D.I.", "Etude D.D.T",
      "This Flam's No Drag", "Not Less Than 25", "Cool Maque", "Double Raton", "Triple Ratón"
    ].map(label => createItem(label, "Rudimental Workshop")),
    "Portraits in Rhythm": [
      createItem("Etude 1", "Portraits in Rhythm"),
      createItem("Etude 2", "Portraits in Rhythm"),
      createItem("Etude 4", "Portraits in Rhythm"),
      createItem("Etude 5", "Portraits in Rhythm"),
      createItem("Etude 8", "Portraits in Rhythm"),
    ]
  },
  "Snare 1": {
    "Roll Rudiments": [
      createItem("1. Single Stroke Roll", "Roll Rudiments", "quarter = 90"),
      createItem("2. Single Stroke Four", "Roll Rudiments", "quarter = 162"),
      createItem("3. Single Stroke Seven", "Roll Rudiments", "quarter = 144"),
      createItem("4. Multiple Bounce", "Roll Rudiments", "quarter = 120"),
      createItem("5. Triple Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("6. Double Stroke Open Roll", "Roll Rudiments", "quarter = 120"),
      createItem("7. Five Stroke Roll", "Roll Rudiments", "quarter = 125"),
      createItem("8. Six Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("9. Seven Stroke Roll", "Roll Rudiments", "quarter = 95/120"),
      createItem("10. Nine Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("11. Ten Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("12. Eleven Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("13. Thirteen Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("14. Fifteen Stroke Roll", "Roll Rudiments", "quarter = 120"),
      createItem("15. Seventeen Stroke Roll", "Roll Rudiments", "quarter = 120"),
    ],
    "Diddle Rudiments": [
      createItem("16. Single Paradiddle", "Diddle Rudiments", "quarter = 180"),
      createItem("17. Double Paradiddle", "Diddle Rudiments", "dotted-quarter = 104"),
      createItem("18. Triple Paradiddle", "Diddle Rudiments", "quarter = 160"),
      createItem("19. Single Paradiddle-Diddle", "Diddle Rudiments", "dotted-quarter = 120"),
    ],
    "Flam Rudiments": [
      createItem("20. Flam", "Flam Rudiments", "quarter = 300"),
      createItem("21. Flam Accent", "Flam Rudiments", "dotted-quarter = 160"),
      createItem("22. Flam Tap", "Flam Rudiments", "quarter = 124"),
      createItem("23. Flamacue", "Flam Rudiments", "quarter = 130"),
      createItem("24. Flam Paradiddle", "Flam Rudiments", "quarter = 108"),
      createItem("25. Single Flammed Mill", "Flam Rudiments", "quarter = 108"),
      createItem("26. Flam Paradiddle-diddle", "Flam Rudiments", "dotted-quarter = 78"),
      createItem("27. Pataflafla", "Flam Rudiments", "quarter = 106"),
      createItem("28. Swiss Army Triplet", "Flam Rudiments", "quarter = 100"),
      createItem("29. Inverted Flam Tap", "Flam Rudiments", "quarter = 100"),
      createItem("30. Flam Drag", "Flam Rudiments", "dotted-quarter = 122"),
    ],
    "Drag Rudiments": [
      createItem("31. Drag", "Drag Rudiments", "quarter = 208"),
      createItem("32. Single Drag Tap", "Drag Rudiments", "quarter = 170"),
      createItem("33. Double Drag Tap", "Drag Rudiments", "dotted-quarter = 86"),
      createItem("34. Lesson 25", "Drag Rudiments", "quarter = 124"),
      createItem("35. Single Dragaddidle", "Drag Rudiments", "quarter = 120"),
      createItem("36. Drag Paradiddle #1", "Drag Rudiments", "dotted-quarter = 82"),
      createItem("37. Drag Paradiddle #2", "Drag Rudiments", "dotted-quarter = 120"),
      createItem("38. Single Ratamacue", "Drag Rudiments", "quarter = 114"),
      createItem("39. Double Ratamacue", "Drag Rudiments", "dotted-quarter = 62"),
      createItem("40. Triple Ratamacue", "Drag Rudiments", "quarter = 112"),
    ],
    "Rudimental Workshop": [
      "Relax and Roll With It", "S.S. IV", "Wormey Singlets", "Long Roll Samba", "High Five",
      "Six Stroke Sally", "Seven", "Number Nine", "Ten Pin", "Eleven",
      "Thirteenth Floor", "Funky and Fifteen", "The Longest Roll", "Buzz Me Up", "Stroke3",
      "Back That Diddle Up", "Double P", "It's a Triple Paradiddle", "S.P.D.", "Flam the P's",
      "Triple Whip", "One Fine Drag (a Diddle)", "D.P. #1", "D.P. #2", "Flam-Bam!",
      "Flam Accent Groove", "Flam Taps in Space", "'Cue It Up", "Pretty Fla", "Swiss Army Triplets",
      "A Familiar Mill", "Inverted Malf Pat", "Year of the Dragon", "Etude S.D.I.", "Etude D.D.T",
      "This Flam's No Drag", "Not Less Than 25", "Cool Maque", "Double Raton", "Triple Ratón"
    ].map(label => createItem(label, "Rudimental Workshop")),
    "All-American Drummer": [
      "Etude 127", "Etude 128", "Etude 129", "Etude 132", "Etude 133", "Etude 134",
      "Etude 135", "Etude 136", "Etude 137", "Etude 138", "Etude 139", "Etude 141",
      "Etude 142", "Etude 143", "Etude 144", "Etude 145", "Etude 146", "Etude 149", "Etude 150"
    ].map(label => createItem(label, "All-American Drummer")),
    "Portraits in Rhythm": [
      18, 19, 20, 21, 24, 25, 27, 28, 29, 30, 31, 34, 36, 37, 38, 39, 40, 50
    ].map(num => createItem(`Etude ${num}`, "Portraits in Rhythm"))
  },
  "Snare 2": {
    "Contemporary Studies": [
      1, 2, 6, 9, 14, 16, 17, 21, 24, 28, 29, 31, 32, 37, 40, 43, 58, 62
    ].map(num => createItem(`Etude ${num}`, "Contemporary Studies")),
    "Advanced Snare Drum Studies": [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25
    ].map(num => createItem(`Etude ${num}`, "Advanced Snare Drum Studies"))
  }
};
