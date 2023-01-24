export const daysPT = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];
export const daysEN = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getDayName() {
  const date = new Date();
  const dayPT = daysPT[date.getDay()];
  const dayEN = daysEN[date.getDay()];
  return {
    dayEN,
    dayPT,
  };
}
