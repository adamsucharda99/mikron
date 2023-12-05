import { Link, usePathname } from '@/navigation';
import { MenuItem, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  redirect?: string;
  locale?: 'sk' | 'en';
  children: React.ReactNode;
}

export default function LocaleSelectItem({
  redirect,
  locale,
  children,
}: Props) {
  const pathname = usePathname();

  return (
    <MenuItem
      as={Link}
      href={redirect ?? pathname}
      locale={locale}
      px={{ base: 12, lg: 6 }}
      py={{ base: 4, lg: 2 }}
      _hover={{ bg: 'gray.100' }}
    >
      <Text
        textTransform='uppercase'
        color='gray.600'
        fontWeight='bold'
        fontSize='sm'
      >
        {children}
      </Text>
    </MenuItem>
  );
}
