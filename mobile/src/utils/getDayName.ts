export function getDayName() {
  const days = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];
  const date = new Date();
  const day = days[date.getDay()];
  return day;
}
