import { CssBaseline, Box } from '@material-ui/core';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withThemeProvider = (Story, context) => {
  return (
    <Box position="relative">
      <CssBaseline />
      <Story {...context} />
    </Box>
  );
};

export const decorators = [withThemeProvider];
