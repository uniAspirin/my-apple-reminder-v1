export function getCurrnetMonthInShort() {
  const date = new Date();
  return new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
}

export function getCurrnetDay() {
  return new Date().getDate();
}

export function getDaysInCurrentMonth() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
