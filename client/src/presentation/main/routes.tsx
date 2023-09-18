import { Box, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { UserRoutes } from '../modules/users/routes';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/users/*" element={<UserRoutes />} />
      <Route
        path="*"
        element={
          <Box>
            <Typography variant="h3" component="h1">
              404 - Not Found
            </Typography>
          </Box>
        }
      />
    </Routes>
  );
};
