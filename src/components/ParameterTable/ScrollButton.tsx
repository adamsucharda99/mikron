import { IconButton } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface Props {
  direction: 'left' | 'right';
  tableContainerRef: any;
}

export default function ScrollButton({ direction, tableContainerRef }: Props) {
  const handleScroll = () => {
    if (tableContainerRef.current) {
      const newScrollPosition =
        direction === 'left'
          ? tableContainerRef.current.scrollLeft - 240
          : tableContainerRef.current.scrollLeft + 240;

      tableContainerRef.current.scrollTo({
        left: newScrollPosition,
        right: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <IconButton
      aria-label='scroll-right'
      fontSize='40px'
      color='blue.900'
      bg='blue.100'
      _hover={{ bg: 'blue.200' }}
      _active={{ bg: 'blue.300' }}
      borderRadius='full'
      h={12}
      w={12}
      opacity={0.6}
      icon={direction === 'left' ? <MdChevronLeft /> : <MdChevronRight />}
      onClick={handleScroll}
    />
  );
}
