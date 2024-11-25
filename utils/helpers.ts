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

function isValidUrlWithToken(url: string, searchParam: string): boolean {
  try {
    // Check if the string is a valid URL
    const parsedUrl = new URL(url);

    // Check if the token parameter exists
    const result = parsedUrl.searchParams.get(searchParam);

    // Return true if the token is present and the URL is valid
    return result !== null && result !== "";
  } catch (e) {
    // If an error is thrown, it's not a valid URL
    return false;
  }
}

function getQueryParamValue(url: string, paramName: string) {
  try {
    // Parse the URL
    const parsedUrl = new URL(url);

    // Get the value of the specified query parameter
    const paramValue = parsedUrl.searchParams.get(paramName);

    // Return the parameter value or null if it doesn't exist
    return paramValue;
  } catch (e) {
    // If an error is thrown, it's not a valid URL
    return null;
  }
}

export { capitalize, getInitials, assert, currencyFormat, isValidUrlWithToken, getQueryParamValue };
