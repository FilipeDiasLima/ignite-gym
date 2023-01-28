import { DayCard } from "@components/DayCard";
import { HomeHeader } from "@components/HomeHeader";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { daysEN, daysPT } from "@utils/getDayName";
import { Center, FlatList, Text, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";

export function Schedule() {
  const toast = useToast();
  const { isReloadSchedule, handleChangeReloadSchedule } = useAuth();

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<[string[]]>([[]]);

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const response = await api.get(`/schedule/groups`);
      setGroups(response.data);
      handleChangeReloadSchedule(false);
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

  function handleOpenDay(dayPT: string, index: number) {
    navigation.navigate("daySchedule", {
      dayPT,
      dayEN: daysEN[index],
      dayGroups: groups[index],
    });
  }

  useEffect(() => {
    fetchGroups();
    isReloadSchedule && fetchGroups();
  }, [, isReloadSchedule]);

  return (
    <VStack flex={1}>
      <HomeHeader />

      <Center mt={6} px={10}>
        <Text color="gray.200" fontSize="md" fontWeight="bold">
          Monte sua <Text color="green.500">agenda de treino</Text> da semana
        </Text>
      </Center>

      <FlatList
        data={daysPT}
        px={8}
        mt={6}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <DayCard
            onPress={() => handleOpenDay(item, index)}
            nameDay={item}
            groups={groups[index]}
          />
        )}
      />
    </VStack>
  );
}
