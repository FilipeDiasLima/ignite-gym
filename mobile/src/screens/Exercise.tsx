import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  Box,
  HStack,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";

import BodySvg from "@assets/body.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import SeriesSvg from "@assets/series.svg";
import { Button } from "@components/Button";
import { GoBackHeader } from "@components/GoBackHeader";
import { Loading } from "@components/Loading";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useEffect, useState } from "react";

type RouteParams = {
  exerciseId: string;
  dayEN: string;
};

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [sendingRegister, setSendingRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [exerciseData, setExerciseData] = useState<ExerciseDTO>(
    {} as ExerciseDTO
  );

  const route = useRoute();
  const toast = useToast();

  const { exerciseId, dayEN } = route.params as RouteParams;

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const { data } = await api.get(
        `/schedule/exercise/${dayEN}/${exerciseId}`
      );

      setExerciseData(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);

      await api.post(`/history`, { exercise_id: exerciseId });
      toast.show({
        title: "Parabéns! Exercício concluído.",
        placement: "top",
        bgColor: "green.700",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <GoBackHeader
        title={exerciseData.name}
        subtitle={exerciseData.group}
        subtitleSvg={<BodySvg />}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          {exerciseData.id && (
            <VStack p={8}>
              <Box rounded="lg" mb={3} overflow="hidden">
                <Image
                  w="full"
                  h={80}
                  source={{
                    uri: `${api.defaults.baseURL}/exercise/demo/${exerciseData.demo}`,
                  }}
                  alt="exercicio"
                  resizeMode="cover"
                  rounded="lg"
                />
              </Box>

              <Box bg="gray.600" rounded="md" pb={4} px={4}>
                <HStack
                  alignItems="center"
                  justifyContent="space-around"
                  mb={6}
                  mt={5}
                >
                  <HStack>
                    <SeriesSvg />
                    <Text textTransform="capitalize" color="gray.200" ml="2">
                      {exerciseData.series}
                    </Text>
                    <Text color="gray.200" ml="1">
                      séries
                    </Text>
                  </HStack>
                  <HStack>
                    <RepetitionsSvg />
                    <Text textTransform="capitalize" color="gray.200" ml="2">
                      {exerciseData.repetitions}
                    </Text>
                    <Text color="gray.200" ml="1">
                      repetições
                    </Text>
                  </HStack>
                </HStack>

                <Button
                  isLoading={sendingRegister}
                  onPress={handleExerciseHistoryRegister}
                  title="Marcar como realizado"
                />
              </Box>
            </VStack>
          )}
        </ScrollView>
      )}
    </VStack>
  );
}
