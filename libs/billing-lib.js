export function calculateCost(accounts) {
    const rate = accounts <= 3
      ? 0
      : accounts <= 6
        ? 1.2
        : 0.8;
  
    return rate * accounts * 100;
  }