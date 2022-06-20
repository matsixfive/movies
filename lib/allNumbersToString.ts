import { numberToString } from "./numberToString";

export const allNumbersToString = (string: string) => {
  let final = "";
  for (const char of string) {
    const numS = parseInt(char);
    if (!Number.isNaN(numS)) {
      const num = numberToString(numS);
      final += " " + num + " ";
    } else {
      final += char;
    }
  }
  return final.replace(/\s\s+/g, " "); // replace tabs, spaces, newlines with one space
};
