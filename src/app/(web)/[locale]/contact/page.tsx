import ContactCard from '@/components/ContactCard/ContactCard';
import ContactForm from '@/components/ContactForm/ContactForm';
import ContactStack from '@/components/ContactStack/ContactStack';
import { Link } from '@/navigation';
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { groq } from 'next-sanity';
import { client } from '../../../../../sanity/lib/client';
import { ContactPage } from './contact';

const query = groq`
 *[_id == 'cab326df-5143-4392-afde-ea79617b7b9d'][0] {
  pageBuilder[0] {
    departments[] {
      _key,
      'department': department[$locale],
      people[] {
        _key,
        name,
        'position': position[$locale],
        phone,
        email,
        region
      }
    }
  }
}
`;

interface Props {
  params: {
    locale: string;
  };
}

const getPageData = async (locale: string) =>
  await client.fetch<ContactPage>(query, { locale });

export default async function Contact({ params: { locale } }: Props) {
  const data = await getPageData(locale);

  const { departments } = data.pageBuilder;

  return (
    <main>
      <Container as='section' maxW='container.xl' py={20}>
        <Heading textAlign='center' mb={16} color='gray.700'>
          {locale === 'en' ? 'Contact' : 'Kontakt'}
        </Heading>
        <ContactStack locale={locale} mb={16} />

        <Box mb={16}>
          <ContactForm locale={locale} variant='outline' />
        </Box>

        <Stack spacing={2} mb={16} mx={2}>
          <Flex align='center' gap={2}>
            <Text
              color='gray.600'
              textTransform='uppercase'
              fontSize='sm'
              fontWeight='semibold'
            >
              {locale === 'en' ? 'Company ID:' : 'IČO:'}
            </Text>
            <Text>34120297</Text>
          </Flex>

          {locale === 'sk' && (
            <Flex align='center' gap={2}>
              <Text
                color='gray.600'
                textTransform='uppercase'
                fontSize='sm'
                fontWeight='semibold'
              >
                DIČ:
              </Text>
              <Text>2020414517</Text>
            </Flex>
          )}

          <Flex align='center' gap={2}>
            <Text
              color='gray.600'
              textTransform='uppercase'
              fontSize='sm'
              fontWeight='semibold'
            >
              {locale === 'en' ? 'VAT No.:' : 'IČ DPH:'}
            </Text>
            <Text>SK2020414517</Text>
          </Flex>

          <Text fontSize='sm' color='gray.600'>
            {locale === 'en'
              ? 'The Company MIKRON SLOVAKIA, s.r.o. is registered at'
              : 'Spoločnosť MIKRON SLOVAKIA, s.r.o. je registrovaná na'}{' '}
            <Link
              style={{ textDecoration: 'underline' }}
              href='https://www.orsr.sk/vypis.asp?ID=2854&SID=9&P=0'
            >
              {locale === 'en'
                ? 'District court in  Bratislava I, insert No. 105389/B.'
                : 'Okresnom súde v Bratislave I, vložka č. 105389/B.'}
            </Link>
          </Text>
        </Stack>

        <Stack spacing={8} divider={<Divider />}>
          {departments.map((department) => (
            <Box key={department._key}>
              <Heading
                as='h3'
                color='gray.500'
                fontSize='md'
                fontWeight='bold'
                textTransform='uppercase'
                ml={2}
                mb={6}
              >
                {department.department}
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
                {department.people.map((person) => (
                  <ContactCard
                    key={person._key}
                    name={person.name}
                    position={person.position}
                    phone={person.phone}
                    email={person.email}
                    region={person.email}
                  />
                ))}
              </SimpleGrid>
            </Box>
          ))}
        </Stack>
      </Container>
    </main>
  );
}
