import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DefaultLayout from "./pages/layouts/Default";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Authenticated } from "./pages/layouts/Authenticated";
import { MyAccount } from "./pages/MyAccount";
import Cart from "./pages/Cart";
import { Favorites } from "./pages/Favorites";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="carrinho" element={<Cart />} />
      </Route>

      <Route path="/auth" element={<Authenticated />}>
        <Route path="minha-conta" element={<MyAccount />} />
        <Route path="favoritos" element={<Favorites />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
