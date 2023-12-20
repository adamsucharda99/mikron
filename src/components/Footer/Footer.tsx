import { Link } from '@/navigation';
import { Box, Container, Text } from '@chakra-ui/react';

interface Props {
  locale: string;
}

export default function Footer({ locale }: Props) {
  return (
    <Box as='footer' py={4} bg='blue.900'>
      <Container maxW='container.xl'>
        <Link href='/'>
          <Text fontSize='sm' color='white' textAlign='right'>
            {locale === 'en' ? 'Ochrana osobných údajov' : 'Privacy policy'}
          </Text>
        </Link>
      </Container>
    </Box>
  );
}
