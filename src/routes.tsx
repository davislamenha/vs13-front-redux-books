import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DefaultLayout from './pages/layouts/Default';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
