import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { MdChevronRight } from 'react-icons/md';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  manufacturer?: string;
}

export default function ProductMenuItem({
  children,
  onClick,
  active,
  manufacturer,
}: Props) {
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
      onClick={onClick}
    >
      <Flex gap={2} align='center'>
        <Text
          color={active ? 'brand' : 'gray.800'}
          fontWeight={active ? 'medium' : 'normal'}
          textTransform='capitalize'
        >
          {children}
        </Text>
        {manufacturer && (
          <Text
            color='gray.600'
            textTransform='uppercase'
            fontSize='sm'
            fontWeight='bold'
            h='full'
            bg='gray.100'
            px={2}
            borderRadius='sm'
          >
            {manufacturer}
          </Text>
        )}
      </Flex>
      <Icon fontSize={24} color={active ? 'brand' : 'gray.600'}>
        <MdChevronRight />
      </Icon>
    </Flex>
  );
}
