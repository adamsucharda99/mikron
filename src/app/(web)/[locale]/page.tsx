import cncMachine from '@/../public/cnc-machine.jpg';
import ContactForm from '@/components/ContactForm/ContactForm';
import ContactStack from '@/components/ContactStack/ContactStack';
import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

interface Props {
  params: { locale: string };
}

const sectionPadding = { base: 20, lg: 32 };

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <main>
      <Flex as='section' position='relative' minH='60vh'>
        <Image
          src={cncMachine}
          alt='predaj a servis cnc strojov a pásových píl'
          fill
          sizes='100vw'
          style={{ objectFit: 'cover' }}
        />
        <Box h='100%' w='100%' bg='black' position='absolute' opacity={0.8} />
        <Container
          maxW='container.xl'
          as={Flex}
          zIndex={2}
          direction='column'
          gap={8}
          color='white'
          align='center'
          justify='center'
          textAlign='center'
        >
          <Heading as='h1' fontSize='5xl'>
            {locale === 'en'
              ? 'Leading-Edge CNC Machining Solutions for Industry Professionals'
              : 'CNC obrábacie centrá a pásové píly pre profesionálov v priemysle'}
          </Heading>
          <Text fontSize='xl'>
            {locale === 'en'
              ? 'Enhance your production with our CNC machines: advanced technology, exceptional precision, and robust performance for various industrial applications.'
              : 'Vylepšite svoju výrobu s našimi CNC strojmi: pokročilá technológia, výnimočná presnosť a robustný výkon pre rôzne priemyselné aplikácie.'}
          </Text>
        </Container>
      </Flex>

      <Flex as='section' py={sectionPadding} align='center' bg='gray.50'>
        <Container maxW='container.xl'>
          <SimpleGrid columns={{ lg: 2 }} spacing={8} alignItems='center'>
            <AspectRatio ratio={16 / 9}>
              <iframe
                src='https://www.youtube.com/embed/5mVGR7ja1NE?si=FSidgi3Ut4cN850C'
                title='YouTube video player'
                // @ts-ignore
                frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowfullscreen
              ></iframe>
            </AspectRatio>
            <Flex direction='column' gap={4} color='gray.700'>
              <Text>
                {locale === 'en'
                  ? 'Welcome to our website where we would like to introduce our company - services we provide, metalwork information, our activities, contacts, references and especially our news.'
                  : 'Vítame Vás na našej webovej stránke, kde Vám predstavujeme našu firmu.'}
              </Text>
              <Text>
                {locale === 'en'
                  ? 'You can find the full range of our products and the catalogue with machine descriptions, pictures and technical parameters.'
                  : 'Nájdete tu celý sortiment našich produktov aj s katalógmi, popismi, obrázkami a technickými parametrami.'}
              </Text>
              <Text>
                {locale === 'en'
                  ? 'Our dealers are at your disposal for any requirements and requests ready to offer the best products to meet your needs.'
                  : 'Sú Vám tu tiež k dispozícii rôzne informácie o nás, ako napr. servis, kovovýroba, aktivity, kontakty, referencie a najmä naše novinky vo forme aktualít.'}
              </Text>
              <Text>
                {locale === 'en'
                  ? 'Every year we organize  presentation events and congresses to bring news, provide advices and solutions to your questions. Such events include International Engineering Fair Nitra (Slovakia), International Engineering Fair Brno (Czech Republic), Open House and Congress MIKRON SLOVAKIA  in selected locations in Slovakia.'
                  : '  Naši predajcovia sú Vám k dispozícii pri akejkoľvek požiadavke a potrebe informovať sa a taktiež usporadúvame každoročne niekoľko prezentačných akcií a kongresy, kde sa Vám vždy snažíme priniesť novinky, poskytnúť poradenstvo a riešenie pre Vaše dotazy. Medzi takéto udalosti patria MSV NITRA, MSV BRNO, OPEN HOUSE MIKRON SLOVAKIA a KONGRESY MIKRON SLOVAKIA vo vybranej lokalite na Slovensku.'}
              </Text>
            </Flex>
          </SimpleGrid>
        </Container>
      </Flex>

      <Container as='section' maxW='container.xl' py={sectionPadding}>
        <SimpleGrid gap={10} columns={{ base: 1, lg: 2 }} alignItems='center'>
          <ContactStack locale={locale} />
          <ContactForm locale={locale} variant='outline' />
        </SimpleGrid>
      </Container>
    </main>
  );
}
