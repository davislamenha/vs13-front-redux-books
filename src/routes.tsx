import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DefaultLayout from './pages/layouts/Default';
import Cart from './pages/Cart';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="" element={<Home />} />
        <Route path="carrinho" element={<Cart />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
