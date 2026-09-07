import { colors } from './colors';

const theme = {
  palette: {
    mode: 'light',
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.accent,
    },
    success: {
      main: colors.success,
    },
    warning: {
      main: colors.warning,
    },
    error: {
      main: colors.error,
    },
    text: {
      primary: colors.text,
      secondary: colors.secondaryText,
    },
    divider: colors.borders,
  },
};

export default theme;
