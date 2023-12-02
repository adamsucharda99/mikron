'use client';

import logo from '@/../public/logo/logo.jpg';
import {
  Box,
  Container,
  Flex,
  IconButton,
  List,
  Slide,
  Text,
} from '@chakra-ui/react';
import { Titillium_Web } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import NavItem from './NavItem';
import Link from 'next/link';

const titilliumWeb = Titillium_Web({ subsets: ['latin'], weight: ['700'] });

interface Props {
  locale: string;
}

export default function Header({ locale }: Props) {
  const [navOpen, setNavOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <>
      <Flex
        borderBottom='1px'
        borderColor='gray.300'
        bg='white'
        position='sticky'
        zIndex={2}
        as='header'
      >
        <Container
          maxW='container.xl'
          height={{ base: 20, md: 24 }}
          display='flex'
          alignItems='stretch'
          justifyContent='space-between'
          as='nav'
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
            hideFrom='md'
            onClick={() => setNavOpen(!navOpen)}
          />

          {/* Desktop nav */}
          <List display='flex' flexDirection='row' gap={3} hideBelow='md'>
            <NavItem
              variant='desktop'
              onClick={() => setProductsOpen(!productsOpen)}
            >
              Produkty
            </NavItem>
            <NavItem href='/contact' variant='desktop'>
              Kontakt
            </NavItem>
          </List>
        </Container>
      </Flex>

      {/* Mobile nav */}
      <Slide
        in={navOpen}
        direction='top'
        style={{ position: 'static' }}
        unmountOnExit
      >
        <Flex bg='white' shadow='md' px={4} py={8} hideFrom='md'>
          <List width='100%' display='flex' flexDir='column' gap={3}>
            <NavItem variant='mobile'>Produkty</NavItem>
            <NavItem href='/contact' variant='mobile'>
              Kontakt
            </NavItem>
          </List>
        </Flex>
      </Slide>

      {/* Products menu */}
      <Slide
        in={productsOpen}
        direction='top'
        style={{ position: 'static' }}
        unmountOnExit
      >
        <Flex bg='white' shadow='md' px={4} py={8} hideBelow='md'></Flex>
      </Slide>
    </>
  );
}
