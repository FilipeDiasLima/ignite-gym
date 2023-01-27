import { HistoryDataProps } from "@dtos/HistoryByDay";
import { HistoryDTO } from "@dtos/HistoryDTO";
import { Heading, View, VStack } from "native-base";
import { HistoryCard } from "./HistoryCard";

type Props = {
  data: HistoryDataProps;
};

export function HistoryContainer({ data }: Props) {
  const name = String(Object.keys(data));
  console.log(data[name]);
  return (
    <VStack my={4}>
      <Heading
        color="gray.200"
        fontSize="md"
        fontFamily="heading"
        textTransform="capitalize"
        mb={3}
      >
        {Object.keys(data)}
      </Heading>
      {data[name].map((exercise) => (
        <HistoryCard key={exercise.exercise_id} data={exercise} />
      ))}
    </VStack>
  );
}
