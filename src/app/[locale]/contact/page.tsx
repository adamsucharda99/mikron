import ContactCard from '@/components/ContactCard';
import { client } from '@/contentful';
import {
  Box,
  Container,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
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
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={8}>
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
