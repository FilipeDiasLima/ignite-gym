import ArrowDownSvg from "@assets/arrow-down-draw.svg";
import { ExerciseCard } from "@components/ExerciseCard";
import { GroupsHorizontalList } from "@components/GroupsHorizontalList";
import { HomeHeader } from "@components/HomeHeader";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { calendar } from "@utils/calendar";
import { getDayName } from "@utils/getDayName";
import {
  Center,
  FlatList,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useCallback, useEffect, useState } from "react";

export function Home() {
  const toast = useToast();
  const { dayEN, dayPT } = getDayName();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const response = await api.get(`/schedule/groups/${dayEN.toLowerCase()}`);
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
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/schedule/exercises/${dayEN.toLowerCase()}/bygroup/${groupSelected}`
      );
      setExercises(response.data);
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

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate("exercise", { exerciseId, dayEN: dayEN.toLowerCase() });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  useEffect(() => {
    groups.length > 0 && setGroupSelected(groups[0]);
  }, [groups]);

  useFocusEffect(
    useCallback(() => {
      groups.length > 0 && fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <HStack
        my={7}
        mb={-5}
        px={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading
          textTransform="uppercase"
          color="green.500"
          fontSize="md"
          fontFamily="heading"
        >
          {dayPT}
        </Heading>
        <Text color="gray.200" fontSize="md" fontFamily="heading">
          Treino de hoje
        </Text>
      </HStack>

      {groups.length > 0 ? (
        <>
          <GroupsHorizontalList
            groupSelected={groupSelected}
            setGroupSelected={(group) => setGroupSelected(group)}
            groups={groups}
          />

          {isLoading ? (
            <Loading />
          ) : (
            <VStack flex={1} px={8}>
              <HStack justifyContent="space-between" mb={5}>
                <Heading color="gray.200" fontSize="md" fontFamily="heading">
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
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ExerciseCard
                    data={item}
                    onPress={() => handleOpenExerciseDetails(item.id)}
                  />
                )}
              />
            </VStack>
          )}
        </>
      ) : (
        <>
          <Center flex={1} px={10}>
            <Text textAlign="center" color="gray.200" fontSize="lg">
              Você ainda não possui um treino,{" "}
              <Text color="green.500" fontSize="lg">
                acesse a agenda
              </Text>{" "}
              patra criar seu treino
            </Text>
          </Center>
          <ArrowDownSvg
            width={200}
            style={{ position: "absolute", bottom: -30, left: 60 }}
          />
        </>
      )}
    </VStack>
  );
}
