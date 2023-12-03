import {
  Box,
  Container,
  Grid,
  GridItem,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';

interface Props {
  locale: string;
}

export default function Footer({ locale }: Props) {
  return (
    <Box as='footer' py={10} bg='blue.900'>
      <Container maxW='container.xl'>
        <Grid templateColumns='repeat(2, 1fr)'>
          <GridItem>
            <Text
              textTransform='uppercase'
              fontSize='sm'
              fontWeight='semibold'
              opacity={0.75}
              mb={3}
              color='white'
            >
              {locale === 'en' ? 'Contact' : 'Kontakt'}
            </Text>
            <List color='white' spacing={2} fontSize='sm'>
              <Box>
                <ListItem>
                  <Text>Svetlá 8, 811 02 Bratislava</Text>
                </ListItem>
                <ListItem>
                  <Text>Nitrianska 13, 940 01 Nové Zámky</Text>
                </ListItem>
              </Box>
              <ListItem>
                <Text>mikron@mikron.sk</Text>
              </ListItem>
              <Box>
                <ListItem>
                  <Text>0042135 / 6428 648</Text>
                </ListItem>
                <ListItem>
                  <Text>0042135 / 6428 649</Text>
                </ListItem>
              </Box>
            </List>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
