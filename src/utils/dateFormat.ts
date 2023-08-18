const monthsName = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Sep",
  "October",
  "Nov",
  "Dec",
];

export function dateFormat(date: string) {
  if (!date) {
    return "";
  }
  const localDate = new Date(date);
  const month = monthsName[localDate.getMonth()];
  const day = localDate.getDate();
  const year = localDate.getFullYear();
  return `${month} ${day}, ${year}`;
}
