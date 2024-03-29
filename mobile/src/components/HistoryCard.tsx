import { HistoryDTO } from "@dtos/HistoryDTO";
import { HStack, Text } from "native-base";

type Props = {
  data: HistoryDTO;
};

export function HistoryCard({ data }: Props) {
  return (
    <HStack
      w="full"
      px={5}
      py={5}
      mb={3}
      bg="gray.600"
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text color="gray.100" fontSize="lg" numberOfLines={1}>
        {data.name}
      </Text>

      <Text color="gray.300" fontSize="md">
        {data.hour}
      </Text>
    </HStack>
  );
}
