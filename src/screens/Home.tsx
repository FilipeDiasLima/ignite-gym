import { useState } from "react";
import { Center, HStack, Text, VStack, FlatList, Heading } from "native-base";
import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [groups, setGroups] = useState([
    "costas",
    "ombro",
    "bíceps",
    "tríceps",
    "peitos",
    "quadríceps",
    "posterior",
  ]);
  const [exercises, setExercises] = useState([
    "puxada alta com barra",
    "puxada alta com triângulo",
    "remada sentada",
    "remada curvada",
  ]);
  const [groupSelected, setGroupSelected] = useState("costas");

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise");
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            onPress={() => setGroupSelected(item)}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
          />
        )}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
        />
      </VStack>
    </VStack>
  );
}
