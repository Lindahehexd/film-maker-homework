import { Box, Flex, Text } from "@chakra-ui/react";
import { texts } from "./textData";

const TextSession1 = () => {
  return (
    <Flex h="100vh" justify="center" align="center" mt="30px">
      <Flex justify="center" align="center" direction="column">
        <Text as="i" fontWeight={700} fontSize="32px">
          {texts.paragraph_1.line1}
        </Text>
        <Text as="i" fontWeight={700} fontSize="32px">
          {texts.paragraph_1.line2}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TextSession1;
