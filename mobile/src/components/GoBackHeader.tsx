import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import { SvgProps } from "react-native-svg";

type Props = {
  title: string;
  titleSec?: string;
  subtitle?: string;
  subtitleSvg?: ReactNode;
};

export function GoBackHeader({
  subtitle,
  subtitleSvg,
  title,
  titleSec,
}: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack px={8} bg="gray.600" pt={12}>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
      </TouchableOpacity>

      <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
        <Heading
          color="gray.100"
          fontSize="lg"
          flexShrink={1}
          fontFamily="heading"
        >
          {title}
          <Text
            color="green.500"
            fontSize="lg"
            flexShrink={1}
            fontFamily="heading"
          >
            {titleSec}
          </Text>
        </Heading>

        <HStack alignItems="center">
          {subtitleSvg}
          <Text
            color="gray.200"
            ml={1}
            fontSize="lg"
            textTransform="capitalize"
          >
            {subtitle}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
}
