import ContactModalButton from '@/components/ContactModalButton';
import ParameterTable from '@/components/ParameterTable';
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
import { groq } from 'next-sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client } from '../../../../../../../sanity/lib/client';
import { Series } from './series';

const querySeries = groq`
  *[_type == 'series'] {
    'slug': slug.current
  }
`;

const querySeriesBySlug = groq`
  *[_type == 'series' && slug.current == $slug][0] {
  name,
  'manufacturer': manufacturer -> name,
  image,
  catalog,
  'description': description[$locale],
  'machines': *[_type == 'machine' && series._ref == ^._id]
}
`;

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  const res: { slug: string }[] = await client.fetch(querySeries);

  return res;
}

async function getSeries(slug: string, locale: string) {
  const series: Series = await client.fetch(querySeriesBySlug, {
    slug,
    locale,
  });

  return series ? series : notFound();
}

export default async function Product({ params }: Props) {
  const { locale, slug } = params;

  const { name, manufacturer, image, catalog, description, machines } =
    await getSeries(slug, locale);

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
                {manufacturer}
              </Text>
              <Heading color='gray.800'>
                {`${name} ${locale === 'en' ? 'Series' : 'Séria'}`}
              </Heading>
            </Flex>
            {description && <Stack spacing={3} sx={{ li: { ml: 4 } }}></Stack>}
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
