import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { GoDot } from 'react-icons/go';

type Props = {
  label: string;
  icon?: React.ReactNode;
  values: string[];
};

export default function ContactItem({ label, icon, values }: Props) {
  return (
    <Flex gap={4} py={4} px={2} align='center'>
      <Icon fontSize={24} color='brand'>
        {icon ?? <GoDot />}
      </Icon>
      <Flex direction='column' gap={1}>
        <Text
          textTransform='uppercase'
          fontWeight='semibold'
          color='gray.500'
          fontSize='sm'
        >
          {label}
        </Text>
        <Box>
          {values.map((value, index) => (
            <Text key={index}>{value}</Text>
          ))}
        </Box>
      </Flex>
    </Flex>
  );
}
