import {
  Card,
  CardBody,
  Flex,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';

interface Props {
  name: string;
  position?: string;
  region?: string;
  phone?: string[];
  email?: string;
}

export default function ContactCard({
  name,
  position,
  region,
  phone,
  email,
}: Props) {
  return (
    <Card variant='filled' h='100%'>
      <CardBody as={Flex} direction='column' gap={4}>
        <Stack spacing={0}>
          <Text fontWeight='medium'>{name}</Text>
          <Text fontSize='sm' _firstLetter={{ textTransform: 'capitalize' }}>
            {position}
          </Text>
          <Text fontSize='sm'>{region}</Text>
        </Stack>

        <List spacing={1} fontSize='sm'>
          {phone?.map((number, index) => (
            <ListItem key={index}>{number}</ListItem>
          ))}
          <ListItem fontWeight='medium' color='brand'>
            {email}
          </ListItem>
        </List>
      </CardBody>
    </Card>
  );
}
