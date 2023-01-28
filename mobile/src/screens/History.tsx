import { HistoryContainer } from "@components/HistoryContainer";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryByDayDTO } from "@dtos/HistoryByDay";
import { useAuth } from "@hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import {
  Center,
  Heading,
  HStack,
  SectionList,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useCallback, useState } from "react";

export function History() {
  const toast = useToast();
  const { refeshedToken } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get(`/history`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [refeshedToken])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : exercises?.length > 0 ? (
        <SectionList
          sections={exercises}
          px={8}
          keyExtractor={(item) => {
            const name = String(Object.keys(item));
            return name;
          }}
          renderItem={({ item }) => <HistoryContainer data={item} />}
          renderSectionHeader={({ section }) => (
            <HStack
              pt={7}
              pb={3}
              justifyContent="space-between"
              alignItems="center"
              bg="gray.700"
              flex={1}
            >
              <Heading color="green.500" fontSize="md" fontFamily="heading">
                {section.title}
              </Heading>
              <Text color="white" fontSize="md" textTransform="capitalize">
                {section.dayName}
              </Text>
            </HStack>
          )}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: "center" }
          }
        />
      ) : (
        <Center flex={1}>
          <Text color="gray.100" textAlign="center">
            Não há histórico de exercícios ainda. {"\n"}Vamos fazer exercícios
            hoje?
          </Text>
        </Center>
      )}
    </VStack>
  );
}
