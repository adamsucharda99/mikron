import { client } from '@/contentful';
import {
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
  const res = await client.getEntries({
    content_type: 'series',
    'fields.slug': slug,
    include: 1,
    locale,
  });

  if (res.items.length) {
    return res.items[0];
  } else {
    notFound();
  }
}

export default async function Product({ params }: Props) {
  const { locale, slug } = params;

  const series = (await getSeries(slug, locale)) as unknown as Series;
  const { name, manufacturer, images, seriesParameters, description } =
    series.fields;

  return (
    <main>
      <Container as='section' maxW='container.xl'>
        <SimpleGrid columns={{ lg: 2 }} spacing={8} alignItems='center'>
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
                {name} {locale === 'en' ? 'Series' : 'Séria'}
              </Heading>
            </Flex>
            <Stack spacing={3} sx={{ li: { ml: 4 } }}>
              {documentToReactComponents(description)}
            </Stack>
            <Flex gap={3} mt={2}>
              <Button variant='brand'>
                {locale === 'en' ? 'Contact' : 'Kontakt'}
              </Button>
              <Button variant='outline'>
                {locale === 'en' ? 'Catalog' : 'Katalóg'}
              </Button>
            </Flex>
          </Flex>
        </SimpleGrid>
      </Container>
    </main>
  );
}
