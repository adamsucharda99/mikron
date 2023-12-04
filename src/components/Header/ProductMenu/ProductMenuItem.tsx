import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { MdChevronRight } from 'react-icons/md';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

export default function ProductMenuItem({ children, onClick, active }: Props) {
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
      <Text
        color={active ? 'brand' : 'gray.800'}
        fontWeight={active ? 'medium' : 'normal'}
        textTransform='capitalize'
      >
        {children}
      </Text>
      <Icon fontSize={24} color={active ? 'brand' : 'gray.600'}>
        <MdChevronRight />
      </Icon>
    </Flex>
  );
}
