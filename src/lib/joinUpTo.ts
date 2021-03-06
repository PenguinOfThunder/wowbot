/**
 * A fancier version of String.join() with maximum string length limits.
 * @param a An array of strings
 * @param delimiter The delimiter to join on
 * @param maxLength The maximum length
 * @returns A string with as many elements of a as will fit in less than maxLength characters
 */
export function joinUpTo(
  a: string[],
  delimiter = ",",
  maxLength: number
): string {
  let str = "";
  for (let i = 0; i < a.length; i++) {
    // Stop if next will overflow
    if (str.length + a[i].length + (i > 0 ? delimiter.length : 0) > maxLength) {
      break;
    }
    if (i > 0) {
      str += delimiter;
    }
    str += a[i];
  }
  return str;
}
