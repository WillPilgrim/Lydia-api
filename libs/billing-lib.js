export function calculateCost(accounts) {
    const rate = accounts <= 3
      ? 0
      : accounts <= 6
        ? 4
        : 10;
  
    return rate * storage * 100;
  }