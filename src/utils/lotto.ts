export function generateLottoNumbers(
  count: number = 6,
  min: number = 1,
  max: number = 45
): number[] {
  if (count <= 0) {
    return [];
  }
  const availableCount = max - min + 1;
  if (count > availableCount) {
    throw new Error("Requested count exceeds the available number range.");
  }

  const chosen: Set<number> = new Set();
  while (chosen.size < count) {
    const n = Math.floor(Math.random() * availableCount) + min;
    chosen.add(n);
  }
  return Array.from(chosen).sort((a, b) => a - b);
}

export function generateWithBonus(
  mainCount: number = 6,
  min: number = 1,
  max: number = 45
): { numbers: number[]; bonus: number } {
  const numbers = generateLottoNumbers(mainCount, min, max);
  let bonus = numbers[0];
  // Ensure bonus is distinct
  while (numbers.includes(bonus)) {
    bonus = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return { numbers, bonus };
}


