import { FlatList } from "native-base";
import { Group } from "./Group";

type Props = {
  groupSelected: string;
  setGroupSelected(group: string): void;
  groups: string[];
};

export function GroupsHorizontalList({
  groupSelected,
  groups,
  setGroupSelected,
}: Props) {
  function handleGroup(group: string) {
    setGroupSelected(group);
  }

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
