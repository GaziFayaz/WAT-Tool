// Comprehensive word pool for Word Association Test (WAT)
// Contains various categories of words to ensure diverse psychological testing

export const WORD_POOL: string[] = [
  // Set 1
  "Lion", "Award", "Achieve", "Assist", "Action", "Agree", "Avoid", "Alone", "Ambition", "Attempt",
  "Appeal", "Air", "Arrive", "Bed", "Blood", "Patient", "Beautiful", "Cut", "Copy", "Home",

  // Basic emotions and feelings
  "happy", "sad", "angry", "fear", "joy", "love", "hate", "worry", "calm", "excited",
  "nervous", "confident", "proud", "shame", "guilt", "hope", "despair", "trust", "doubt", "relief",

  
  // Set 2
  "Able", "Excuse", "Luck", "Good", "Knife", "Cooperate", "Discipline", "Neglect", "Plan", "Life",
  "Win", "Honesty", "Machine", "Afraid", "Load", "Think", "Hobby", "Obtain", "Idea", "Religion",

    // Physical objects and nature
  "sun", "moon", "star", "earth", "water", "fire", "air", "tree", "flower", "mountain",
  "ocean", "river", "forest", "desert", "snow", "rain", "storm", "wind", "cloud", "lightning",


  
  // Set 3
  "Morality", "Innovation", "Attack", "Continue", "Punctuality", "Protect", "Task", "Sleep", "Drop", "Snake",
  "Cockroach", "Garden", "Faith", "Help", "Cinema", "Money", "Peace", "Fine", "Delay", "Character",

    // Body parts
  "head", "eye", "hand", "foot", "heart", "brain", "mouth", "nose", "ear", "face",
  "arm", "leg", "finger", "toe", "neck", "back", "chest", "stomach", "shoulder", "knee",
  
  // Food and drinks
  "bread", "water", "milk", "meat", "fruit", "vegetable", "sugar", "salt", "coffee", "tea",
  "wine", "beer", "cake", "chocolate", "honey", "rice", "fish", "chicken", "apple", "orange",

    
  // Abstract concepts
  "time", "space", "life", "death", "birth", "growth", "change", "power", "strength", "weakness",
  "truth", "lie", "beauty", "ugly", "good", "evil", "right", "wrong", "justice", "freedom",

  // Actions and activities
  "run", "walk", "jump", "sleep", "eat", "drink", "work", "play", "read", "write",
  "sing", "dance", "fight", "help", "hurt", "give", "take", "make", "break", "build",
  
  // Places and locations
  "home", "school", "work", "hospital", "church", "market", "park", "beach", "city", "village",
  "country", "world", "heaven", "hell", "prison", "palace", "castle", "bridge", "road", "path",
  
  // Clothing and objects
  "dress", "shirt", "shoes", "hat", "coat", "ring", "watch", "book", "pen", "paper",
  "table", "chair", "bed", "door", "window", "mirror", "knife", "gun", "sword", "shield",
  
  // Psychological and behavioral terms
  "mind", "soul", "spirit", "memory", "dream", "nightmare", "wish", "desire", "fear", "courage",
  "wisdom", "knowledge", "intelligence", "stupidity", "madness", "sanity", "peace", "war", "battle", "victory",
  
  // Social and cultural concepts
  "religion", "god", "devil", "angel", "demon", "prayer", "sin", "virtue", "honor", "disgrace",
  "tradition", "custom", "law", "rule", "order", "chaos", "society", "culture", "civilization", "primitive",
  
  // Time and seasons
  "morning", "evening", "night", "day", "week", "month", "year", "past", "present", "future",
  "spring", "summer", "autumn", "winter", "birthday", "holiday", "wedding", "funeral", "celebration", "ceremony",
  
  // Technology and modern life
  "computer", "phone", "car", "airplane", "train", "ship", "machine", "robot", "internet", "television",
  "radio", "camera", "clock", "lamp", "electricity", "energy", "fuel", "oil", "metal", "plastic",
  
  // Set 4
  "Risk", "River", "Rope", "Rose", "Run", "Save", "Science", "See", "Select", "Sex",
  "Sharp", "Sick", "Silent", "Simple", "Sing", "Sleep", "Smoke", "Soap", "Society", "Soldier",
  
  // Set 5
  "Sorrow", "Sort", "Source", "Speak", "Speed", "Sports", "Stick", "Stone", "Store", "Strange",
  "Struggle", "Student", "Subject", "Sweet", "Swim", "Sword", "Table", "Take", "Task", "Teacher",
  
  // Set 6
  "Beat", "Bed", "Birth", "Discrimination", "Failure", "Fight", "Genocide", "Kill", "Love", "Lying",
  "Oral", "Physical", "Politics", "Pond", "Poor", "Popular", "Present", "Price", "Proper", "Property",
  
  // Set 7
  "Propose", "Prostitute", "Proud", "Punctual", "Pupil", "Quality", "Quarrel", "Ban", "Quilt", "Race",
  "Rape", "Reach", "Read", "Real", "Refuse", "Relative", "Request", "Respect", "Responsibility", "Reward",
  
  // Set 8
  "Future", "Glory", "Goal", "Greed", "Naughty", "Height", "Imitative", "Insurance", "Justice", "Legend",
  "Logic", "Master", "Quarrel", "Moon", "Motivate", "Patient", "Jealous", "Prepare", "Protect", "Punctuality",
  
  // Set 9
  "Religion", "Confused", "Rest", "Sex", "Rumor", "Guilty", "Alarming", "Snake", "Sorrow", "Stupid",
  "Frighten", "Sweat", "Task", "Trench", "Cruel", "Suspicious", "Corrupt", "Drought", "Fault", "Find",
  
  // Set 10
  "Head", "Leopard", "Obey", "Offer", "Officer", "Boring", "Opportunity", "Order", "Organize", "Pain",
  "Paper", "Parents", "Park", "Past", "Peace", "Porn", "Picture", "Pillar", "Plan", "Policy",
  
  // Set 11
  "Absorb", "Hostile", "Benefit", "Birthday", "Boat", "Pain", "Capture", "Cash", "Reject", "Change",
  "Childhood", "Choice", "Pessimist", "Gender", "Culture", "Custom", "Defend", "Design", "Disagree", "Fade"
];

/**
 * Randomly selects 80 unique words from the word pool
 * @returns Array of 80 randomly selected words
 */
export function getRandomWords(): string[] {
  const shuffled = [...WORD_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 80);
}

/**
 * Gets the total number of words available in the pool
 * @returns Total count of words in the pool
 */
export function getWordPoolSize(): number {
  return WORD_POOL.length;
}