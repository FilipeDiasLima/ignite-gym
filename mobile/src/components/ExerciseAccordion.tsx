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
} from "native-base";
import { useState } from "react";
import { Button } from "./Button";
import { List } from "react-native-paper";

type Props = {
  data: ExerciseDTO;
};

export function ExerciseAccordion({ data }: Props) {
  const { Accordion, Item } = List;

  const [isOpen, setIsOpen] = useState(false);
  const [isToFailureSeries, setIsToFailureSeries] = useState(false);
  const [isToFailureRepetitions, setIsToFailureRepetitions] = useState(false);

  function handleAccordion() {
    setIsOpen(!isOpen);
  }

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

          <Button title="Adicionar" h={10} />
        </VStack>
      </>
    </Accordion>
  );
}
