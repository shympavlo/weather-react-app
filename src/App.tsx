import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './pages/Main';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};
