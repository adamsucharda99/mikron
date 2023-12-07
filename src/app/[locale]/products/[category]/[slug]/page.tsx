import ContactModalButton from '@/components/ContactModalButton';
import ParameterTable from '@/components/ParameterTable';
import { client } from '@/contentful';
import { Link } from '@/navigation';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Series } from './series';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const res = await client.getEntries({
    content_type: 'series',
  });

  return res.items.map((item) => ({ slug: item.fields.slug }));
}

async function getSeries(slug: string, locale: string) {
  const series = await client.getEntries({
    content_type: 'series',
    'fields.slug': slug,
    include: 1,
    locale,
  });

  const machines = await client.getEntries({
    content_type: 'machine',
    'fields.series.sys.id': series.items[0].sys.id,
  });

  if (series.items.length) {
    return { ...series.items[0], machines };
  } else {
    notFound();
  }
}

export default async function Product({ params }: Props) {
  const { locale, slug } = params;

  const { fields, machines } = (await getSeries(
    slug,
    locale
  )) as unknown as Series;
  const { name, manufacturer, images, description } = fields;

  return (
    <main>
      <Container maxW='container.xl'>
        <SimpleGrid
          columns={{ lg: 2 }}
          spacing={8}
          alignItems='center'
          minH='50vh'
          as='section'
        >
          <Image
            src={'https:' + images[0].fields.file.url}
            width={images[0].fields.file.details.image.width}
            height={images[0].fields.file.details.image.height}
            alt={name}
          />
          <Flex direction='column' gap={6} py={12}>
            <Flex direction='column'>
              <Text fontWeight='medium' color='gray.600'>
                {manufacturer.fields.name}
              </Text>
              <Heading color='gray.800'>
                {`${name} ${locale === 'en' ? 'Series' : 'Séria'}`}
              </Heading>
            </Flex>
            <Stack spacing={3} sx={{ li: { ml: 4 } }}>
              {documentToReactComponents(description)}
            </Stack>
            <Flex gap={3} mt={2}>
              <ContactModalButton locale={locale} />
              {fields.catalog && (
                <Link
                  href={'https:' + fields.catalog.fields.file.url}
                  target='_blank'
                >
                  <Button variant='outline'>
                    {locale === 'en' ? 'Catalog' : 'Katalóg'}
                  </Button>
                </Link>
              )}
            </Flex>
          </Flex>
        </SimpleGrid>

        {machines.items.length > 0 && (
          <Box py={8}>
            <Heading
              as='h3'
              fontSize='2xl'
              color='gray.700'
              fontWeight='semibold'
              textAlign='center'
            >
              {locale === 'en' ? 'Parameters' : 'Parametre'}
            </Heading>
            <ParameterTable machines={machines.items} />
          </Box>
        )}
      </Container>
    </main>
  );
}
