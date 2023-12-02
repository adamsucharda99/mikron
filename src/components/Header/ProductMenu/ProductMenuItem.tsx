import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { MdChevronRight } from 'react-icons/md';

interface Props {
  children: React.ReactNode;
}

export default function ProductMenuItem({ children }: Props) {
  return (
    <Flex
      justify='space-between'
      align='center'
      p={3}
      cursor='pointer'
      transition='300ms'
      borderRadius='sm'
      _hover={{ bg: 'gray.100' }}
      _active={{ bg: 'gray.300' }}
    >
      <Text color='gray.800'>{children}</Text>
      <Icon fontSize={24} color='gray.600'>
        <MdChevronRight />
      </Icon>
    </Flex>
  );
}
