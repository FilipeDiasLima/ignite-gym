import { HistoryDTO } from "./HistoryDTO";

export type HistoryDataProps = {
  [group: string]: HistoryDTO[];
};

export type HistoryByDayDTO = {
  title: string;
  dayName: string;
  data: HistoryDataProps[];
};
