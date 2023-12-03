import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import cncMachine from '@/../public/cnc-machine.jpg';
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';

interface Props {
  params: { locale: string };
}

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <main>
      <Flex h='50vh' position='relative'>
        <Image
          src={cncMachine}
          alt='predaj a servis cnc strojov a pásových píl'
          fill
          sizes='100vw'
          style={{ objectFit: 'cover' }}
        />
        <Box h='100%' w='100%' bg='black' position='absolute' opacity={0.75} />
        <Container
          maxW='container.xl'
          as={Flex}
          zIndex={2}
          direction='column'
          gap={6}
          color='white'
          align='center'
          justify='center'
        >
          <Heading as='h1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
            cum.
          </Heading>
          <Text fontSize='xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            commodi enim in harum possimus eos voluptatem eligendi iusto! Est,
            reiciendis.
          </Text>
        </Container>
      </Flex>
    </main>
  );
}
