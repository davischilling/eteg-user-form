import { Route, Routes } from 'react-router-dom';

import { CreateUserPage } from '../pages/create';

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreateUserPage />} />
    </Routes>
  );
}
