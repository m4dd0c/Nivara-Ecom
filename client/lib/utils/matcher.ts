export function normalizeString(str: string): string {
  // Remove non-alphabetic characters and spaces, and convert to lowercase
  return str.replace(/[^a-zA-Z]/g, "").toLowerCase();
}

export const matchString = (s1: string, s2: string): boolean => {
  if (s1 && s2) {
    if (normalizeString(s1) === normalizeString(s2)) return true;
    else return false;
  }
  return false;
};

export const spacedWords = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/([-_])/g, " $1")
    .trim();
};

export const localizeNum = (num: number) => {
  return num <= 9 ? "0" + num : num;
};
