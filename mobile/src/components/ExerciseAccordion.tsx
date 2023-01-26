import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";
import {
  Box,
  Divider,
  Heading,
  HStack,
  Image,
  Text,
  View,
  VStack,
  Switch,
  Input,
  useToast,
} from "native-base";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { List } from "react-native-paper";
import { AppError } from "@utils/AppError";

type Props = {
  data: ExerciseDTO;
  day: string;
};

export function ExerciseAccordion({ data, day }: Props) {
  const toast = useToast();
  const { Accordion } = List;
  const [isOpen, setIsOpen] = useState(false);
  const [seriesValue, setSeriesValue] = useState(
    data.series !== "até falhar" ? data.series : ""
  );
  const [repetitionValue, setRepetitionValue] = useState(
    data.repetitions !== "até falhar" ? data.repetitions : ""
  );
  const [isToFailureSeries, setIsToFailureSeries] = useState(
    data.series === "até falhar" || false
  );
  const [isToFailureRepetitions, setIsToFailureRepetitions] = useState(
    data.repetitions === "até falhar" || false
  );
  const [sendingRegister, setSendingRegister] = useState(false);

  async function handleSaveExercise() {
    try {
      setSendingRegister(true);

      await api.post(`/schedule`, {
        day: day.toLowerCase(),
        exercise_id: data.id,
        series: seriesValue,
        repetitions: repetitionValue,
      });
      toast.show({
        title: "Exercício adicionado",
        placement: "top",
        bgColor: "green.700",
      });
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
      setSendingRegister(false);
    }
  }

  function handleAccordion() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setRepetitionValue(isToFailureRepetitions ? "--" : "");
    setSeriesValue(isToFailureSeries ? "--" : "");
  }, [isToFailureRepetitions, isToFailureSeries]);

  return (
    <Accordion
      title={
        <Heading fontSize="lg" color="white" fontFamily="heading">
          {data.name}
        </Heading>
      }
      onPress={handleAccordion}
      left={() => (
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt={data.name}
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />
      )}
      theme={{ colors: { background: "#121214" } }}
      style={{
        borderRadius: !isOpen ? 6 : 0,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: "#29292E",
        marginBottom: 12,
      }}
    >
      <>
        <VStack
          mb={3}
          mt={-3}
          bg="gray.500"
          flex={1}
          p={3}
          borderBottomRadius="md"
          space={2}
        >
          <HStack justifyContent="space-between">
            <Box
              flexDir="row"
              rounded="md"
              bg="gray.700"
              px={5}
              py={3}
              alignItems="center"
              w={173}
              justifyContent="space-between"
              overflow="hidden"
            >
              <Text color={isToFailureSeries ? "red.500" : "gray.200"} w="55%">
                Séries
              </Text>
              <Divider orientation="vertical" mx={4} bg="white" />
              <Input
                color={isToFailureSeries ? "red.500" : "gray.200"}
                isDisabled={isToFailureSeries}
                variant="unstyled"
                keyboardType="numeric"
                placeholder={isToFailureSeries ? "--" : "0"}
                value={isToFailureSeries ? "--" : seriesValue}
                onChangeText={(e) => setSeriesValue(e)}
              />
            </Box>
            <HStack alignItems="center" space={2}>
              <Text color={isToFailureSeries ? "red.500" : "gray.200"}>
                Até a falha
              </Text>
              <Switch
                value={isToFailureSeries}
                size="sm"
                onTrackColor="red.500"
                onValueChange={(e) => setIsToFailureSeries(e)}
              />
            </HStack>
          </HStack>

          <HStack justifyContent="space-between">
            <Box
              flexDir="row"
              rounded="md"
              bg="gray.700"
              px={5}
              py={3}
              alignItems="center"
              w={173}
              justifyContent="space-between"
            >
              <Text
                color={isToFailureRepetitions ? "red.500" : "gray.200"}
                w="55%"
              >
                Repetições
              </Text>
              <Divider orientation="vertical" mx={4} bg="white" />
              <Input
                color={isToFailureRepetitions ? "red.500" : "gray.200"}
                isDisabled={isToFailureRepetitions}
                variant="unstyled"
                keyboardType="numeric"
                placeholder={isToFailureRepetitions ? "--" : "0"}
                value={isToFailureRepetitions ? "--" : repetitionValue}
                onChangeText={(e) => setRepetitionValue(e)}
              />
            </Box>
            <HStack alignItems="center" space={2}>
              <Text color={isToFailureRepetitions ? "red.500" : "gray.200"}>
                Até a falha
              </Text>
              <Switch
                value={isToFailureRepetitions}
                size="sm"
                onTrackColor="red.500"
                onValueChange={(e) => setIsToFailureRepetitions(e)}
              />
            </HStack>
          </HStack>

          <Button
            onPress={handleSaveExercise}
            title="Adicionar"
            h={10}
            isLoading={sendingRegister}
          />
        </VStack>
      </>
    </Accordion>
  );
}
