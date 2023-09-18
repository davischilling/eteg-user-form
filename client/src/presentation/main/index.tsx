import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { SnackbarProvider } from 'notistack';

import { Layout } from '../@shared/components/Layout';
import { AppRoutes } from './routes';
import { appTheme } from './theme';

export const MainApp = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          component="main"
          sx={{
            pt: 2,
            minHeight: 'calc(100vh - 16px)',
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
        >
          <Layout>
            <AppRoutes />
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
