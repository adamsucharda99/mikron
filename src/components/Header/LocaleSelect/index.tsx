import {
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuList,
  Text,
} from '@chakra-ui/react';
import LocaleSelectItem from './LocaleSelectItem';

interface Props {
  locale: string;
}

export default function LocaleSelect({ locale }: Props) {
  return (
    <Menu>
      <MenuButton
        as={Flex}
        cursor='pointer'
        align='center'
        _hover={{ bg: 'gray.100' }}
        px={4}
        py={4}
        alignSelf={{ base: 'stretch', lg: 'center' }}
        borderRadius='sm'
        bg={{ base: 'gray.100', lg: 'none' }}
      >
        <Text textTransform='uppercase' fontWeight='medium' color='gray.600'>
          {locale}
        </Text>
      </MenuButton>
      <MenuList
        as={Flex}
        direction='column'
        py={2}
        ml={{ base: -4, lg: 0 }}
        minW={{ base: '100vw', lg: 24 }}
        border='none'
        borderRadius={{ base: 'none', lg: 'xs' }}
      >
        <MenuGroup>
          <LocaleSelectItem locale='sk'>sk</LocaleSelectItem>
          <LocaleSelectItem locale='en'>en</LocaleSelectItem>
        </MenuGroup>
        <MenuDivider color='gray.300' />
        <MenuGroup>
          <LocaleSelectItem redirect='https://www.mikronmoravia.cz/'>
            cz
          </LocaleSelectItem>
          <LocaleSelectItem redirect='https://www.mikronhungaria.hu/'>
            hu
          </LocaleSelectItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
