import { ExerciseAccordion } from "@components/ExerciseAccordion";
import { GoBackHeader } from "@components/GoBackHeader";
import { GroupsHorizontalList } from "@components/GroupsHorizontalList";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import {
  Heading,
  HStack,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useCallback, useEffect, useState } from "react";

type RouteParams = {
  dayPT: string;
  dayEN: string;
  dayGroups: string[];
};

export default function DaySchedule() {
  const route = useRoute();
  const toast = useToast();
  const { dayEN, dayPT, dayGroups } = route.params as RouteParams;

  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [userExercises, setUserExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState("antebraço");
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUserExercisesByGroup() {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/schedule/exercises/${dayEN.toLowerCase()}/bygroup/${groupSelected}`
      );
      setUserExercises(response.data);
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

  async function handleAddExercise(
    exercise_id: string,
    series: string,
    repetitions: string
  ) {
    try {
      setIsLoading(true);

      await api.post(`/schedule`, {
        day: dayEN.toLowerCase(),
        exercise_id,
        series,
        repetitions,
      });
      toast.show({
        title: "Exercício adicionado",
        placement: "top",
        bgColor: "green.700",
      });
      fetchExercisesByGroup();
      fetchUserExercisesByGroup();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível adicionar o exercício";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemoveExercise(exercise_id: string) {
    try {
      setIsLoading(true);

      await api.delete(
        `/schedule/exercise/${dayEN.toLowerCase()}/${exercise_id}`
      );
      toast.show({
        title: "Exercício removido",
        placement: "top",
        bgColor: "green.700",
      });
      fetchExercisesByGroup();
      fetchUserExercisesByGroup();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível adicionar o exercício";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateExercise(
    exercise_id: string,
    series: string,
    repetitions: string
  ) {
    try {
      setIsLoading(true);

      await api.put(`/schedule`, {
        day: dayEN.toLowerCase(),
        exercise_id,
        series,
        repetitions,
      });
      toast.show({
        title: "Exercício atualizado",
        placement: "top",
        bgColor: "green.700",
      });
      fetchExercisesByGroup();
      fetchUserExercisesByGroup();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível adicionar o exercício";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function removeDuplicates() {
    const found = exercises.map((exercise) => {
      const filter = userExercises.map((ex) => {
        if (ex.id === exercise.id) return ex.id;
      });
      return filter[0] !== undefined && filter[0];
    });
    const parse = found.filter((item) => item);
    const exercisesAux = exercises.filter((exercise) => {
      if (!parse.includes(exercise.id)) return exercise;
    });
    setExercises(exercisesAux);
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
      fetchUserExercisesByGroup();
    }, [groupSelected, dayPT])
  );

  useEffect(() => {
    removeDuplicates();
  }, [userExercises]);

  return (
    <VStack flex={1}>
      <GoBackHeader title={`Treino de `} titleSec={dayPT} />

      <Text
        textTransform="capitalize"
        mt={5}
        mb={-5}
        px={8}
        color="gray.200"
        fontSize="md"
      >
        {dayGroups.map(
          (group, index) =>
            group + (index === dayGroups.length - 1 ? "" : " - ")
        )}
      </Text>

      <GroupsHorizontalList
        groupSelected={groupSelected}
        setGroupSelected={(group) => setGroupSelected(group)}
        groups={groups}
      />

      <ScrollView>
        <VStack px={8}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {userExercises && userExercises.length > 0 && (
                <>
                  <HStack justifyContent="space-between" mb={5}>
                    <Heading
                      color="gray.200"
                      fontSize="md"
                      fontFamily="heading"
                    >
                      Exercícios selecionados
                    </Heading>
                    <Text color="gray.200" fontSize="sm">
                      {userExercises.length}
                    </Text>
                  </HStack>

                  {userExercises.map((exercise) => (
                    <ExerciseAccordion
                      key={exercise.id}
                      data={exercise}
                      day={dayEN}
                      selected
                      isLoading={isLoading}
                      addExercise={handleAddExercise}
                      updateExercise={handleUpdateExercise}
                      removeExercise={handleRemoveExercise}
                    />
                  ))}
                </>
              )}

              <HStack justifyContent="space-between" my={5}>
                <Heading color="gray.200" fontSize="md" fontFamily="heading">
                  Exercícios disponíveis
                </Heading>
                <Text color="gray.200" fontSize="sm">
                  {exercises.length}
                </Text>
              </HStack>

              {exercises.map((exercise) => (
                <ExerciseAccordion
                  key={exercise.id}
                  data={exercise}
                  day={dayEN}
                  isLoading={isLoading}
                  addExercise={handleAddExercise}
                  updateExercise={handleUpdateExercise}
                  removeExercise={handleRemoveExercise}
                />
              ))}
            </>
          )}
        </VStack>
      </ScrollView>
    </VStack>
  );
}
