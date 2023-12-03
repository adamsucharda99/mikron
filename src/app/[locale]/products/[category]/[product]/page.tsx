import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

interface Props {
  params: { locale: string };
}

export default function page({ params: { locale } }: Props) {
  return (
    <main>
      <Container as='section' maxW='container.xl' py={12}>
        <SimpleGrid columns={{ lg: 2 }} spacing={8}>
          <Box bg='red' w='100%' h='100%'>
            imgs
          </Box>
          <Flex direction='column' gap={6}>
            <Flex direction='column'>
              <Text fontWeight='medium' color='gray.600'>
                Pinnacle
              </Text>
              <Heading color='gray.800'>
                AX {locale === 'en' ? 'Series' : 'Séria'}
              </Heading>
            </Flex>
            <Text color='gray.800'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In sunt,
              natus cum mollitia tempore accusantium ex deserunt recusandae
              soluta dolor possimus consectetur perspiciatis quidem sapiente
              nihil earum cupiditate explicabo fugiat quia molestias doloremque
              ut non. Reprehenderit, amet deserunt aliquam ut placeat cumque quo
              cum nulla nihil voluptas sit pariatur magni fuga sed corporis
              praesentium, impedit earum nisi ducimus qui. Quisquam.
            </Text>
            <Flex gap={3}>
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
