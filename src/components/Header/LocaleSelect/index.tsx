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
        py={2}
        alignSelf='center'
        borderRadius='sm'
      >
        <Text textTransform='uppercase' fontWeight='medium' color='gray.600'>
          {locale}
        </Text>
      </MenuButton>
      <MenuList as={Flex} direction='column' py={2} minW={24}>
        <MenuGroup>
          <LocaleSelectItem locale='sk'>sk</LocaleSelectItem>
          <LocaleSelectItem locale='en'>en</LocaleSelectItem>
        </MenuGroup>
        <MenuDivider />
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
