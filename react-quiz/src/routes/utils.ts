export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
  // spread the array, creating a new array
  // Math.random is quickfix for making a random function to shuffle the answer array so the answer won't always be in the same spot