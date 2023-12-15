'use client';

import { Link } from '@/navigation';
import {
  Container,
  Flex,
  Grid,
  GridItem,
  IconButton,
  List,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import {
  ProductMenuDataChild,
  ProductMenuDataParent,
} from '../../../app/(web)/[locale]/productMenuData';
import ListHeading from './ListHeading';
import ProductMenuItem from './ProductMenuItem';

interface Props {
  locale: string;
  productMenuData: ProductMenuDataParent[];
  isOpen: boolean;
  mobile?: true;
  setProductsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductMenu({
  locale,
  productMenuData,
  isOpen,
  mobile,
  setProductsOpen,
}: Props) {
  const [parent, setParent] = useState<ProductMenuDataParent | null>(null);
  const [child, setChild] = useState<ProductMenuDataChild | null>(null);

  useEffect(() => {
    setParent(null);
    setChild(null);
  }, [isOpen]);

  const parentList = (
    <>
      <ListHeading>{locale === 'en' ? 'Products' : 'Produkty'}</ListHeading>
      <List spacing={2}>
        {productMenuData.map((item, index) => (
          <ProductMenuItem
            key={index}
            onClick={() => {
              setChild(null);
              setParent(item);
            }}
            active={item === parent}
          >
            {item.name}
          </ProductMenuItem>
        ))}
      </List>
    </>
  );

  const childList = (
    <>
      <ListHeading>{parent?.name}</ListHeading>
      <List spacing={2}>
        {parent?.children?.map((item, index) => (
          <ProductMenuItem
            key={index}
            onClick={() => {
              setChild(item);
            }}
            active={item === child}
          >
            {item.name}
          </ProductMenuItem>
        ))}
      </List>
    </>
  );

  const seriesList = (
    <>
      <ListHeading>{child?.name}</ListHeading>
      <List spacing={2}>
        {child?.series?.map((item) => (
          <Link key={item._id} href={`/products/${child.name}/${item._id}`}>
            <ProductMenuItem manufacturer={item.manufacturer}>
              {`${item.name} ${locale === 'en' ? 'Series' : 'Séria'}`}
            </ProductMenuItem>
          </Link>
        ))}
      </List>
    </>
  );

  if (mobile && setProductsOpen) {
    const handleBack = () =>
      child
        ? setChild(null)
        : parent
        ? setParent(null)
        : setProductsOpen(false);

    return (
      <Flex direction='column' flex={1} gap={2}>
        <IconButton
          icon={<MdArrowBack />}
          aria-label='back'
          fontSize={24}
          color='gray.600'
          borderRadius='sm'
          size='lg'
          alignSelf='start'
          onClick={handleBack}
          variant='ghost'
        />
        {child ? seriesList : parent ? childList : parentList}
      </Flex>
    );
  }

  return (
    <Flex bg='white' px={4} py={8} hideBelow='lg'>
      <Container maxW='container.xl'>
        <Grid templateColumns='repeat(3, 1fr)' gap={4} flex={1}>
          <GridItem>{parentList}</GridItem>
          {parent && <GridItem>{childList}</GridItem>}
          {child && <GridItem>{seriesList}</GridItem>}
        </Grid>
      </Container>
    </Flex>
  );
}
