import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";
import {
  Box,
  Button as NativeBase,
  Divider,
  Heading,
  HStack,
  Image,
  Input,
  Switch,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { List } from "react-native-paper";
import { Button } from "./Button";

type Props = {
  data: ExerciseDTO;
  day: string;
  selected?: boolean;
  isLoading: boolean;
  updateExercise: (
    exercise_id: string,
    series: string,
    repetitions: string
  ) => void;
  removeExercise: (exercise_id: string) => void;
  addExercise: (
    exercise_id: string,
    series: string,
    repetitions: string
  ) => void;
};

export function ExerciseAccordion({
  data,
  selected = false,
  isLoading,
  addExercise,
  removeExercise,
  updateExercise,
}: Props) {
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

  function handleAccordion() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setRepetitionValue(isToFailureRepetitions ? "--" : repetitionValue);
  }, [isToFailureRepetitions]);

  useEffect(() => {
    setSeriesValue(isToFailureSeries ? "--" : seriesValue);
  }, [isToFailureSeries]);

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
                value={seriesValue}
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

          {selected ? (
            <HStack mt={2} justifyContent="space-between">
              <NativeBase
                _pressed={{
                  bg: "transparent",
                }}
                _text={{
                  color: "red.500",
                }}
                isLoading={isLoading}
                w="46%"
                variant="ghost"
                onPress={() => removeExercise(data.id)}
              >
                Remover
              </NativeBase>
              <NativeBase
                isLoading={isLoading}
                onPress={() =>
                  updateExercise(data.id, seriesValue, repetitionValue)
                }
                w="46%"
                bg="green.700"
                _pressed={{
                  bg: "green.500",
                }}
              >
                Salvar
              </NativeBase>
            </HStack>
          ) : (
            <Button
              onPress={() => addExercise(data.id, seriesValue, repetitionValue)}
              title="Adicionar"
              h={10}
              isLoading={isLoading}
            />
          )}
        </VStack>
      </>
    </Accordion>
  );
}
