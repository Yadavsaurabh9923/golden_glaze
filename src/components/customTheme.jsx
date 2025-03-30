import { extendTheme } from '@mui/joy/styles';

const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#48426d',
          100: '#48426d',
          200: '#48426d',
          300: '#48426d',
          400: '#48426d',
          500: '#48426d',
          600: '#48426d',
          700: '#48426d',
          800: '#48426d',
          900: '#48426d',
        },
        background: {
          body: '#48426d', // Custom body background color
        },
      },
    },
    // Repeat for dark mode if needed
  },
  // You can also modify other theme aspects here
});

export default customTheme;