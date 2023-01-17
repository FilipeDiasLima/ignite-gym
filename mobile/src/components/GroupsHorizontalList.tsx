import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useEffect, useState } from "react";
import { FlatList } from "native-base";
import { Group } from "./Group";

type Props = {
  groupSelected: string;
  setGroupSelected(group: string): void;
  toastResponse(title: string): void;
};

export function GroupsHorizontalList({
  groupSelected,
  toastResponse,
  setGroupSelected,
}: Props) {
  const [groups, setGroups] = useState<string[]>([]);

  async function fetchGroups() {
    try {
      const response = await api.get("/groups");
      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares";
      toastResponse(title);
    }
  }

  function handleGroup(group: string) {
    setGroupSelected(group);
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <FlatList
      data={groups}
      horizontal
      showsHorizontalScrollIndicator={false}
      _contentContainerStyle={{ px: 8 }}
      my={10}
      maxH={10}
      minH={10}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <Group
          name={item}
          onPress={() => handleGroup(item)}
          isActive={groupSelected.toLowerCase() === item.toLowerCase()}
        />
      )}
    />
  );
}
