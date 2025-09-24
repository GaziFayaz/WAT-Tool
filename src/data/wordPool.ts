// Comprehensive word pool for Word Association Test (WAT)
// Contains various categories of words to ensure diverse psychological testing

export const WORD_POOL: string[] = [
  // Basic emotions and feelings
  "happy", "sad", "angry", "fear", "joy", "love", "hate", "worry", "calm", "excited",
  "nervous", "confident", "proud", "shame", "guilt", "hope", "despair", "trust", "doubt", "relief",
  
  // Family and relationships
  "mother", "father", "child", "family", "friend", "enemy", "lover", "spouse", "sibling", "relative",
  "neighbor", "colleague", "boss", "teacher", "student", "doctor", "nurse", "police", "judge", "leader",
  
  // Physical objects and nature
  "sun", "moon", "star", "earth", "water", "fire", "air", "tree", "flower", "mountain",
  "ocean", "river", "forest", "desert", "snow", "rain", "storm", "wind", "cloud", "lightning",
  
  // Animals
  "dog", "cat", "bird", "fish", "horse", "cow", "lion", "tiger", "elephant", "snake",
  "rabbit", "mouse", "wolf", "bear", "deer", "fox", "monkey", "eagle", "shark", "whale",
  
  // Colors
  "red", "blue", "green", "yellow", "black", "white", "orange", "purple", "pink", "brown",
  "gray", "silver", "gold", "violet", "crimson", "azure", "emerald", "amber", "ivory", "scarlet",
  
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
  "radio", "camera", "clock", "lamp", "electricity", "energy", "fuel", "oil", "metal", "plastic"
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