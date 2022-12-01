import { useState } from "react";
import { Heading, VStack, SectionList, Text } from "native-base";
import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "26.06.22",
      data: ["Puxada alta", "Remada sentada"],
    },
    {
      title: "28.06.22",
      data: ["Puxada alta", "Remada sentada"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        px={8}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            color="gray.200"
            fontSize="md"
            mt={10}
            mb={3}
            fontFamily="heading"
          >
            {section.title}
          </Heading>
        )}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há histórico de exercícios ainda. {"\n"}Vamos fazer exercícios
            hoje?
          </Text>
        )}
      />
    </VStack>
  );
}
