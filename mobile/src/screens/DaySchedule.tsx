import { ExerciseAccordion } from "@components/ExerciseAccordion";
import { GoBackHeader } from "@components/GoBackHeader";
import { GroupsHorizontalList } from "@components/GroupsHorizontalList";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";

type RouteParams = {
  day: string;
};

export default function DaySchedule() {
  const route = useRoute();
  const toast = useToast();

  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState("antebraço");
  const [groups, setGroups] = useState<string[]>([]);
  const groupsSelected = ["Costas", "Bíceps", "Antebraço"];

  const [isLoading, setIsLoading] = useState(false);

  const { day } = route.params as RouteParams;

  async function fetchGroups() {
    try {
      const response = await api.get("/groups");
      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <GoBackHeader title={`Treino de `} titleSec={day} />

      <Text mt={5} mb={-5} px={8} color="gray.200" fontSize="md">
        {groupsSelected.map(
          (group, index) =>
            group + (index === groupsSelected.length - 1 ? "" : " - ")
        )}
      </Text>

      <GroupsHorizontalList
        groupSelected={groupSelected}
        setGroupSelected={(group) => setGroupSelected(group)}
        groups={groups}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HStack justifyContent="space-between" px={8} mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios selecionados
            </Heading>
            <Text color="gray.200" fontSize="sm">
              2
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            showsVerticalScrollIndicator={false}
            px={8}
            _contentContainerStyle={{
              paddingBottom: 20,
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExerciseAccordion data={item} />}
          />
        </>
      )}
    </VStack>
  );
}
