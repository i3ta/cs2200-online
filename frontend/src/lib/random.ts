export const randomString = (total: number, chars: string) => {
  let result = "";
  for (let i = 0; i < total; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
