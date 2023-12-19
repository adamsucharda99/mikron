'use client';

import {
  Button,
  Container,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import ContactForm from '../ContactForm';

interface Props {
  locale: string;
}

export default function ContactModalButton({ locale }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant='brand' onClick={onOpen}>
        {locale === 'en' ? 'Contact' : 'Kontakt'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent maxW='container.xl' mx={6}>
          <ContactForm locale={locale} />
        </ModalContent>
      </Modal>
    </>
  );
}
