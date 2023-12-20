import { Divider, Stack } from '@chakra-ui/react';
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdShareLocation,
} from 'react-icons/md';
import ContactItem from './ContactStackItem';

interface Props {
  locale: string;
  [key: string]: any;
}

export default function ContactStack({ locale, ...props }: Props) {
  return (
    <Stack divider={<Divider />} {...props}>
      <ContactItem
        label={locale === 'en' ? 'Address' : 'Adresa'}
        values={['Svetlá 8, 811 02 Bratislava, Slovenská republika']}
      />
      <ContactItem
        label={
          locale === 'en'
            ? 'Office and postal address'
            : 'Prevádzka a korešpondenčná adresa'
        }
        values={
          locale === 'en'
            ? ['Nitrianska 13, 940 01 Nové Zámky, Slovakia']
            : ['Nitrianska 13, 940 01 Nové Zámky, Slovenská republika']
        }
        icon={<MdShareLocation />}
      />
      <ContactItem
        label='Email'
        icon={<MdOutlineEmail />}
        values={['mikron@mikron.sk']}
      />
      <ContactItem
        label={locale === 'en' ? 'Phone' : 'Telefón'}
        icon={<MdOutlinePhone />}
        values={['0042135 / 6428 648', '00421 35 / 6428 649']}
      />
    </Stack>
  );
}
