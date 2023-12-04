'use client';

import { Container, Flex, Grid, GridItem, List } from '@chakra-ui/react';
import { CategoryData } from '../contentful';
import ListHeading from './ListHeading';
import ProductMenuItem from './ProductMenuItem';

interface Props {
  locale: string;
  categories: CategoryData;
}

export default function ProductMenu({ locale, categories }: Props) {
  return (
    <Flex bg='white' shadow='md' px={4} py={8} hideBelow='md'>
      <Container maxW='container.xl'>
        <Grid templateColumns='repeat(4, 1fr)' gap={4} flex={1}>
          <GridItem>
            <ListHeading>Produkty</ListHeading>
            <List spacing={2}>
              <ProductMenuItem>Frezovanie</ProductMenuItem>
            </List>
          </GridItem>
        </Grid>
      </Container>
    </Flex>
  );
}
