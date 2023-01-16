import { DayCard } from "@components/DayCard";
import { HomeHeader } from "@components/HomeHeader";
import { Center, FlatList, Text, VStack } from "native-base";

export function Calendar() {
  const days = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado-feira",
    "Domingo-feira",
  ];

  const groups = ["Costas", "Bíceps", "Antebraço"];

  return (
    <VStack flex={1}>
      <HomeHeader />

      <Center mt={6} px={10}>
        <Text color="gray.200" fontSize="md" fontWeight="bold">
          Monte sua <Text color="green.500">agenda de treino</Text> da semana
        </Text>
      </Center>

      <FlatList
        data={days}
        px={8}
        mt={6}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <DayCard nameDay={item} groups={groups} />}
      />
    </VStack>
  );
}
