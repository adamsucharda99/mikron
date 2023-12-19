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
      color='rgba(30, 58, 138, 0.55)'
      bg='rgba(219, 234, 254, 0.45)'
      _hover={{ bg: 'rgba(219, 234, 254, 0.55)' }}
      _active={{ bg: 'rgba(219, 234, 254, 0.6)' }}
      borderRadius='full'
      h={12}
      w={12}
      icon={direction === 'left' ? <MdChevronLeft /> : <MdChevronRight />}
      onClick={handleScroll}
    />
  );
}
