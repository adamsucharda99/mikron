import { StyleFunctionProps, extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: { brand: '#012F87' },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'sm',
      },
      variants: {
        brand: (props: StyleFunctionProps) => ({
          bg: 'brand',
          color: 'white',
          _hover: { opacity: '84%' },
          _active: { opacity: '76%' },
        }),
      },
    },
  },
});
