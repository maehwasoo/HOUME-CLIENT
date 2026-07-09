export const formatDate = (date: string) => {
  return date.replace(
    /(\d{4})-(\d{2})-(\d{2})/,
    (_, y, m, d) => `${y.slice(2)}.${m}.${d}`
  );
};
