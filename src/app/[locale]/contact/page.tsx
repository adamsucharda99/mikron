import ContactCard from '@/components/ContactCard';
import ContactForm from '@/components/ContactForm';
import ContactStack from '@/components/ContactStack';
import { client } from '@/contentful';
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

interface Props {
  params: {
    locale: string;
  };
}

interface ContactData {
  departments: { items: { sys: { id: string }; fields: { name: string } }[] };
  contacts: {
    items: {
      sys: { id: string };
      fields: {
        name: string;
        department: { sys: { id: string }; fields: { name: string } };
        position?: string;
        phone?: string[];
        email?: string;
        region?: string;
      };
    }[];
  };
}

async function getContactData(locale: string) {
  const departments = await client.getEntries({
    content_type: 'contactDepartment',
    locale,
  });

  const contacts = await client.getEntries({
    content_type: 'contact',
    locale,
  });

  return { departments, contacts };
}

export default async function Contact({ params: { locale } }: Props) {
  const { departments, contacts } = (await getContactData(
    locale
  )) as unknown as ContactData;

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
          {departments.items.reverse().map((department) => (
            <Box key={department.sys.id}>
              <Heading
                as='h3'
                color='gray.500'
                fontSize='md'
                fontWeight='bold'
                textTransform='uppercase'
                ml={2}
                mb={6}
              >
                {department.fields.name}
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
                {contacts.items
                  .filter(
                    (contact) =>
                      contact.fields.department.sys.id === department.sys.id
                  )
                  .reverse()
                  .map((contact) => (
                    <ContactCard
                      key={contact.sys.id}
                      name={contact.fields.name}
                      position={contact.fields.position}
                      phone={contact.fields.phone}
                      email={contact.fields.email}
                      region={contact.fields.region}
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
