import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  Textarea,
} from '@chakra-ui/react';

interface Props {
  locale: string;
  [key: string]: any;
}

export default function ContactForm({ locale, ...props }: Props) {
  return (
    <Card as='form' shadow='none' {...props}>
      <CardBody>
        <Stack spacing={6} color='gray.700'>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <FormControl>
              <FormLabel>{locale === 'en' ? 'Name' : 'Meno'}</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type='email' />
            </FormControl>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <FormControl>
              <FormLabel>
                {locale === 'en' ? 'Company' : 'Názov spoločnosti'}
              </FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>
                {locale === 'en' ? 'Phone number' : 'Telefónne číslo'}
              </FormLabel>
              <Input />
            </FormControl>
          </SimpleGrid>
          <FormControl>
            <FormLabel> {locale === 'en' ? 'Message' : 'Správa'}</FormLabel>
            <Textarea size='md' />
          </FormControl>
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex direction='column' gap={6} flex={1}>
          <Checkbox>
            {locale === 'en'
              ? 'By selecting this, you agree to our privacy policy.'
              : 'Súhlasím so spracovaním osobných údajov.'}
          </Checkbox>
          <Button variant='brand' role='submit' alignSelf={{ lg: 'start' }}>
            {locale === 'en' ? 'Submit' : 'Odoslať'}
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}
