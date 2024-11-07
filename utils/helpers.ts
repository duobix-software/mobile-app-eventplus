function capitalize(word: string) {
  if (word.length === 0) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 3)
    .join("")
    .toUpperCase();
}

function currencyFormat(number: any) {
  return new Intl.NumberFormat("fr", {
    style: "currency",
    currency: "dzd",
  }).format(number);
}

function assert(condition: any, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

export { capitalize, getInitials, assert, currencyFormat };
