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
import { ProductMenuData } from '../../../app/[locale]/productMenuData';
import ListHeading from './ListHeading';
import ProductMenuItem from './ProductMenuItem';

interface Props {
  locale: string;
  productMenuData: ProductMenuData;
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
  const [parent, setParent] = useState<string | null>('');
  const [child, setChild] = useState<string | null>('');
  const [manufacturer, setManufacturer] = useState<string | null>('');

  const { categories, manufacturers, series } = productMenuData;

  useEffect(() => {
    setParent(null);
    setChild(null);
    setManufacturer(null);
  }, [isOpen]);

  const getManufacturersByChild = (childSlug: string) => {
    const seriesFromCategory = series.items.filter(
      (item) => item.fields.category.fields.slug === childSlug
    );

    const manufacturerSlugs = seriesFromCategory.map(
      (series) => series.fields.manufacturer.fields.slug
    );

    return manufacturers.items.filter((item) =>
      manufacturerSlugs.includes(item.fields.slug)
    );
  };

  const parentList = (
    <>
      <ListHeading>{locale === 'en' ? 'Products' : 'Produkty'}</ListHeading>
      <List spacing={2}>
        {categories.items
          .filter((item) => !item.fields.parent)
          .reverse()
          .map((item) => (
            <ProductMenuItem
              key={item.fields.slug}
              onClick={() => {
                setChild(null);
                setManufacturer(null);
                setParent(item.fields.slug);
              }}
              active={item.fields.slug === parent}
            >
              {item.fields.name}
            </ProductMenuItem>
          ))}
      </List>
    </>
  );

  const childList = (
    <>
      <ListHeading>
        {
          categories.items.find((item) => item.fields.slug === parent)?.fields
            .name
        }
      </ListHeading>
      <List spacing={2}>
        {categories.items
          .filter((item) => item.fields.parent?.fields.slug === parent)
          .reverse()
          .map((item) => (
            <ProductMenuItem
              key={item.fields.slug}
              onClick={() => {
                setManufacturer(null);
                setChild(item.fields.slug);
              }}
              active={item.fields.slug === child}
            >
              {item.fields.name}
            </ProductMenuItem>
          ))}
      </List>
    </>
  );

  const manufacturerList = (
    <>
      <ListHeading>{locale === 'en' ? 'Manufacturer' : 'Výrobca'}</ListHeading>
      <List spacing={2}>
        {getManufacturersByChild(child!).map((item) => (
          <ProductMenuItem
            key={item.fields.slug}
            onClick={() => setManufacturer(item.fields.slug)}
            active={item.fields.slug === manufacturer}
          >
            {item.fields.name}
          </ProductMenuItem>
        ))}
      </List>
    </>
  );

  const seriesList = (
    <>
      <ListHeading>
        {
          manufacturers.items.find((item) => item.fields.slug === manufacturer)
            ?.fields.name
        }
      </ListHeading>
      <List spacing={2}>
        {series.items
          .filter(
            (item) =>
              item.fields.category.fields.slug === child &&
              item.fields.manufacturer.fields.slug === manufacturer
          )
          .map((item) => (
            <Link
              key={item.fields.slug}
              href={`/products/${child}/${item.fields.slug}`}
            >
              <ProductMenuItem>
                {`${item.fields.name} ${locale === 'en' ? 'Series' : 'Séria'}`}
              </ProductMenuItem>
            </Link>
          ))}
      </List>
    </>
  );

  if (mobile && setProductsOpen) {
    const handleBack = () =>
      manufacturer
        ? setManufacturer(null)
        : child
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
        {manufacturer
          ? seriesList
          : child
          ? manufacturerList
          : parent
          ? childList
          : parentList}
      </Flex>
    );
  }

  return (
    <Flex bg='white' px={4} py={8} hideBelow='lg'>
      <Container maxW='container.xl'>
        <Grid templateColumns='repeat(4, 1fr)' gap={4} flex={1}>
          <GridItem>{parentList}</GridItem>

          {parent && <GridItem>{childList}</GridItem>}

          {child && <GridItem>{manufacturerList}</GridItem>}

          {manufacturer && <GridItem>{seriesList}</GridItem>}
        </Grid>
      </Container>
    </Flex>
  );
}
