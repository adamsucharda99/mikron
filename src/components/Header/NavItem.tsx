import { Link } from '@/navigation';
import { ListItem, SystemStyleObject, Text } from '@chakra-ui/react';

import React from 'react';

type Variant = 'desktop' | 'mobile';

interface Props {
  children: React.ReactNode;
  href?: string;
  variant: Variant;
  [key: string]: any;
}

const variants: Record<Variant, SystemStyleObject> = {
  desktop: {
    px: 2,
    borderBottom: '2px',
    borderColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    _hover: {
      borderColor: 'brand',
    },
    transition: '300ms',
    cursor: 'pointer',
  },
  mobile: {
    bg: 'gray.100',
    p: 4,
    borderRadius: 'sm',
    _active: { bg: 'gray.200' },
    cursor: 'pointer',
  },
};

export default function NavItem({ children, href, variant, ...props }: Props) {
  return (
    <ListItem sx={variants[variant]} as={Link} href={href ?? ''} {...props}>
      <Text
        fontSize={variant === 'desktop' ? 'lg' : 'md'}
        fontWeight='medium'
        color='gray.800'
      >
        {children}
      </Text>
    </ListItem>
  );
}
