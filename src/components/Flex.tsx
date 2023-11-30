import { Box, BoxProps } from '@mui/joy';
import React from 'react';

interface Props extends BoxProps {
  children: React.ReactNode;
  [key: string]: any;
}

export default function Flex({ children, ...props }: Props) {
  return (
    <Box display='flex' {...props}>
      {children}
    </Box>
  );
}
