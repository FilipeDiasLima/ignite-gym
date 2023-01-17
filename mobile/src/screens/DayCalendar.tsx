import { GoBackHeader } from "@components/GoBackHeader";
import { GroupsHorizontalList } from "@components/GroupsHorizontalList";
import { Loading } from "@components/Loading";
import { useRoute } from "@react-navigation/native";
import { Heading, HStack, Text, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";

type RouteParams = {
  day: string;
};

export default function DayCalendar() {
  const route = useRoute();
  const toast = useToast();

  const [toastGroup, setToastGroups] = useState<string>("");
  const [groupSelected, setGroupSelected] = useState("antebraço");

  const groups = ["Costas", "Bíceps", "Antebraço"];

  const [isLoading, setIsLoading] = useState(false);

  const { day } = route.params as RouteParams;

  useEffect(() => {
    if (toastGroup)
      toast.show({
        title: toastGroup,
        placement: "top",
        bgColor: "red.500",
      });
  }, [toastGroup]);

  return (
    <VStack flex={1}>
      <GoBackHeader title={`Treino de `} titleSec={day} />

      <Text mt={5} mb={-5} px={8} color="gray.200" fontSize="md">
        {groups.map(
          (group, index) => group + (index === groups.length - 1 ? "" : " - ")
        )}
      </Text>

      <GroupsHorizontalList
        groupSelected={groupSelected}
        setGroupSelected={(group) => setGroupSelected(group)}
        toastResponse={(title) => setToastGroups(title)}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <HStack justifyContent="space-between" px={8}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios selecionados
          </Heading>
          <Text color="gray.200" fontSize="sm">
            2
          </Text>
        </HStack>
      )}
    </VStack>
  );
}
