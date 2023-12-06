import cncMachine from '@/../public/cnc-machine.jpg';
import ContactForm from '@/components/ContactForm';
import ContactItem from '@/components/ContactItem';
import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdShareLocation,
} from 'react-icons/md';

interface Props {
  params: { locale: string };
}

const sectionPadding = { base: 12, lg: 16 };

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
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Heading>
          <Text fontSize='xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, veniam.
            Dolorum delectus maiores id molestiae, optio incidunt quasi pariatur
            beatae facere minima commodi provident iusto, accusamus numquam quas
            illo soluta!
          </Text>
        </Container>
      </Flex>

      <Flex as='section' py={sectionPadding} minH='40vh' align='center'>
        <Container maxW='container.xl'>
          <SimpleGrid columns={{ lg: 2 }} spacing={8} alignItems='center'>
            <AspectRatio ratio={16 / 9}>
              <iframe
                src='https://www.youtube.com/embed/5mVGR7ja1NE'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                // @ts-ignore
                allowfullscreen
                frameborder='0'
              />
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
          <Box>
            <Heading
              ml={2}
              as='h3'
              fontSize='3xl'
              color='gray.800'
              textAlign='center'
              mb={6}
            >
              Kontakt
            </Heading>
            <Stack divider={<Divider />}>
              <ContactItem
                label={locale === 'en' ? 'Address' : 'Adresa'}
                values={['Svetlá 8, 811 02 Bratislava, Slovenská republika']}
              />
              <ContactItem
                label={
                  locale === 'en'
                    ? 'Office and postal address'
                    : 'Prevádzka a korešpondenčná adresa'
                }
                values={
                  locale === 'en'
                    ? ['Nitrianska 13, 940 01 Nové Zámky, Slovakia']
                    : ['Nitrianska 13, 940 01 Nové Zámky, Slovenská republika']
                }
                icon={<MdShareLocation />}
              />
              <ContactItem
                label='Email'
                icon={<MdOutlineEmail />}
                values={['mikron@mikron.sk']}
              />
              <ContactItem
                label={locale === 'en' ? 'Phone' : 'Telefón'}
                icon={<MdOutlinePhone />}
                values={['0042135 / 6428 648', '00421 35 / 6428 649']}
              />
            </Stack>
          </Box>
          <ContactForm locale={locale} />
        </SimpleGrid>
      </Container>
    </main>
  );
}
