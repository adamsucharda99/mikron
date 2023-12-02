import { Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function ListHeading({ children }: Props) {
  return (
    <Text
      fontWeight='semibold'
      textTransform='uppercase'
      fontSize='sm'
      color='gray.500'
      p={3}
    >
      {children}
    </Text>
  );
}
