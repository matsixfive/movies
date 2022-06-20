import { allNumbersToString } from "./allNumbersToString";

export const standardize = (str: string) => {
  return allNumbersToString(
    str
      .toLowerCase()
      // remove all except letters and numbers (on front end as well)
      .replace(/[^A-Za-z0-9\ ]+/g, "")
      .replace(/\s\s+/g, " ") // replace tabs, spaces, newlines with one space
  )
    .split(" ")
    .filter(word => word.length !== 0);
};
