'use client';

import logo from '@/../public/logo/logo.jpg';
import { usePathname } from '@/navigation';
import {
  Box,
  Collapse,
  Container,
  Flex,
  IconButton,
  List,
  Text,
  useOutsideClick,
} from '@chakra-ui/react';
import { Titillium_Web } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { ProductMenuDataParent } from '../../app/(web)/[locale]/productMenuData';
import LocaleSelect from './LocaleSelect';
import NavItem from './NavItem';
import ProductMenu from './ProductMenu';

const titilliumWeb = Titillium_Web({ subsets: ['latin'], weight: ['700'] });

export const navbarHeight = { base: 20, md: 24 };

interface Props {
  locale: string;
  productMenuData: ProductMenuDataParent[];
}

export default function Header({ locale, productMenuData }: Props) {
  const [navOpen, setNavOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const ref = useRef<any>();
  const pathname = usePathname();

  useOutsideClick({
    ref,
    handler: () => {
      setNavOpen(false);
      setProductsOpen(false);
    },
  });

  useEffect(() => {
    setProductsOpen(false), setNavOpen(false);
  }, [pathname]);

  return (
    <Box
      position='fixed'
      zIndex={999}
      w='100vw'
      as='header'
      ref={ref}
      shadow={navOpen || productsOpen ? 'md' : 'none'}
    >
      <Flex borderBottom='1px' borderColor='gray.300' bg='white' as='nav'>
        <Container
          maxW='container.xl'
          height={navbarHeight}
          display='flex'
          alignItems='stretch'
          justifyContent='space-between'
        >
          {/* Logo container */}
          <Flex as={Link} href='/' alignItems='center' gap={3}>
            <Box w={{ base: 8, md: 9 }}>
              <Image src={logo} alt='logo' />
            </Box>
            <Text
              fontSize='2xl'
              textTransform='uppercase'
              className={titilliumWeb.className}
              color='brand'
            >
              Mikron
            </Text>
          </Flex>

          {/* Mobile menu icon */}
          <IconButton
            aria-label='navigation'
            color='gray.700'
            fontSize={24}
            variant='ghost'
            size='lg'
            icon={<MdMenu />}
            alignSelf='center'
            hideFrom='lg'
            onClick={() => setNavOpen(!navOpen)}
          />

          {/* Desktop nav */}
          <Flex gap={8} hideBelow='lg'>
            <List display='flex' flexDirection='row' gap={3}>
              <NavItem
                variant='desktop'
                onClick={() => setProductsOpen(!productsOpen)}
              >
                {locale === 'en' ? 'Products' : 'Produkty'}
              </NavItem>
              <NavItem href='/contact' variant='desktop'>
                {locale === 'en' ? 'Contact' : 'Kontakt'}
              </NavItem>
            </List>
            <LocaleSelect locale={locale} />
          </Flex>
        </Container>
      </Flex>

      {/* Products menu */}
      <Collapse in={productsOpen} animateOpacity>
        <ProductMenu
          locale={locale}
          productMenuData={productMenuData}
          isOpen={productsOpen}
        />
      </Collapse>

      {/* Mobile nav */}
      <Collapse in={navOpen} animateOpacity>
        <Flex bg='white' px={4} py={8} hideFrom='lg'>
          {productsOpen ? (
            <ProductMenu
              locale={locale}
              productMenuData={productMenuData}
              isOpen={productsOpen}
              mobile
              setProductsOpen={setProductsOpen}
            />
          ) : (
            <List width='100%' display='flex' flexDir='column' gap={3}>
              <NavItem variant='mobile' onClick={() => setProductsOpen(true)}>
                {locale === 'en' ? 'Products' : 'Produkty'}
              </NavItem>
              <NavItem href='/contact' variant='mobile'>
                {locale === 'en' ? 'Contact' : 'Kontakt'}
              </NavItem>
              <LocaleSelect locale={locale} />
            </List>
          )}
        </Flex>
      </Collapse>
    </Box>
  );
}
