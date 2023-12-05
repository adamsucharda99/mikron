'use client';

import { Container, Flex, Grid, GridItem, List } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ProductMenuData } from '../ProductMenuData';
import ListHeading from './ListHeading';
import ProductMenuItem from './ProductMenuItem';
import { Link } from '@/navigation';

interface Props {
  locale: string;
  productMenuData: ProductMenuData;
  isOpen: boolean;
}

export default function ProductMenu({
  locale,
  productMenuData,
  isOpen,
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

  return (
    <Flex bg='white' shadow='md' px={4} py={8} hideBelow='md'>
      <Container maxW='container.xl'>
        <Grid templateColumns='repeat(4, 1fr)' gap={4} flex={1}>
          <GridItem>
            <ListHeading>
              {locale === 'en' ? 'Products' : 'Produkty'}
            </ListHeading>
            <List spacing={2}>
              {categories.items
                .filter((item) => !item.fields.parent)
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
          </GridItem>

          {parent && (
            <GridItem>
              <ListHeading>
                {
                  categories.items.find((item) => item.fields.slug === parent)
                    ?.fields.name
                }
              </ListHeading>
              <List spacing={2}>
                {categories.items
                  .filter((item) => item.fields.parent?.fields.slug === parent)
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
            </GridItem>
          )}

          {child && (
            <GridItem>
              <ListHeading>
                {locale === 'en' ? 'Manufacturer' : 'Výrobca'}
              </ListHeading>
              <List spacing={2}>
                {getManufacturersByChild(child).map((item) => (
                  <ProductMenuItem
                    key={item.fields.slug}
                    onClick={() => setManufacturer(item.fields.slug)}
                    active={item.fields.slug === manufacturer}
                  >
                    {item.fields.name}
                  </ProductMenuItem>
                ))}
              </List>
            </GridItem>
          )}

          {manufacturer && (
            <GridItem>
              <ListHeading>
                {
                  manufacturers.items.find(
                    (item) => item.fields.slug === manufacturer
                  )?.fields.name
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
                        {`${item.fields.name} ${
                          locale === 'en' ? 'Series' : 'Séria'
                        }`}
                      </ProductMenuItem>
                    </Link>
                  ))}
              </List>
            </GridItem>
          )}
        </Grid>
      </Container>
    </Flex>
  );
}
