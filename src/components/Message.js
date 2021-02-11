import { Box, HStack, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export default function Message() {
  return (
    <Box m="0 !important" p="5" bg="gray.100" _hover={{ bg: 'gray.200' }}>
      <Flex align="flex-start">
        <Image borderRadius="md" src="https://picsum.photos/50" />
        <Box ml={2} w="800px">
          <HStack justifyContent="space-between">
            <Text fontSize="sm" fontWeight="bold">
              Oski Bear
            </Text>
            <Text fontSize="sm">3:22 PM</Text>
          </HStack>
          <Text fontSize="sm" color="grey">
            Yoo, what is the hw for today?
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
