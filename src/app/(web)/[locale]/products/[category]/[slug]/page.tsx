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
  _id,
  name,
  'manufacturer': manufacturer -> name,
  'imageUrl': image.asset -> url,
  'catalogUrl': catalog.asset -> url,
  'description': description[$locale],
  'machines': *[_type == 'machine' && series._ref == ^._id] {
    _id,
    name,
    machineParameters[]
  },
  seriesParameterGroups[] {
    _key,
    'label': label[$locale],
    seriesParameters[] {
      id,
      'label': label[$locale],
      unit
    }
  },
  machineOrder
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
  const series: Series = await client.fetch(
    querySeriesBySlug,
    {
      slug,
      locale,
    },
    { next: { revalidate: 1 } }
  );

  return series ? series : notFound();
}

export default async function Product({ params }: Props) {
  const { locale, slug } = params;

  const {
    name,
    manufacturer,
    imageUrl,
    catalogUrl,
    description,
    machines,
    seriesParameterGroups,
    machineOrder,
  } = await getSeries(slug, locale);

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
          <Image src={imageUrl} alt={name} width={450} height={450} />
          <Flex direction='column' gap={6} py={12}>
            <Flex direction='column'>
              <Text fontWeight='medium' color='gray.600'>
                {manufacturer}
              </Text>
              <Heading color='gray.800'>
                {`${name} ${locale === 'en' ? 'Series' : 'Séria'}`}
              </Heading>
            </Flex>
            {description && (
              <Stack spacing={3} sx={{ li: { ml: 4 } }}>
                {description.map((block, index) => (
                  <Text as={block.listItem ? 'li' : 'p'} key={index}>
                    {block.children[0].text}
                  </Text>
                ))}
              </Stack>
            )}
            <Flex gap={3} mt={2}>
              <ContactModalButton locale={locale} />
              {catalogUrl && (
                <Link href={catalogUrl} target='_blank'>
                  <Button variant='outline'>
                    {locale === 'en' ? 'Catalog' : 'Katalóg'}
                  </Button>
                </Link>
              )}
            </Flex>
          </Flex>
        </SimpleGrid>

        {machines.length > 0 && (
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
            <ParameterTable
              machines={machines}
              seriesParameterGroups={seriesParameterGroups}
              locale={locale}
              machineOrder={machineOrder}
            />
          </Box>
        )}
      </Container>
    </main>
  );
}
