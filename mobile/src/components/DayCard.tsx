import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  nameDay: string;
  groups: string[];
};

export function DayCard({ nameDay, groups, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        py={3}
        px={4}
        rounded="md"
        mb={4}
      >
        <VStack flex={1}>
          <Heading
            textTransform="capitalize"
            fontSize="lg"
            color="white"
            fontFamily="heading"
          >
            {nameDay}
          </Heading>

          <Text
            textTransform="capitalize"
            fontSize="sm"
            color="gray.200"
            mt={1}
            numberOfLines={2}
          >
            {groups && groups.length > 0
              ? groups.map(
                  (group, index) =>
                    group + (index === groups.length - 1 ? "" : " - ")
                )
              : "Sem treino"}
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
