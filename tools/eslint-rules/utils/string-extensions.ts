export const SNAKE_CASE_REGEX = /(_[a-z0-9])/g;
const replacer = (_match: string, p1: string) => p1.slice(1).toUpperCase();
export const toCamelCase = (s: string) => s.replace(SNAKE_CASE_REGEX, replacer);
