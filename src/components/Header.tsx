import {
  Heart,
  HouseLine,
  ShoppingCart,
  SignIn,
  SignOut,
  User,
} from "@phosphor-icons/react";

import { NavLink, useLocation } from "react-router-dom";
import { MobileHeader } from "./MobileHeader";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks/reduxTypedHooks";

const Header = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");

  function toggleMenu() {
    setOpen((state) => !state);
  }

  return (
    <header className="py-6 text-white bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <NavLink to={"/"} className="text-3xl font-bold">
          Redux Books
        </NavLink>
        <nav className="hidden sm:block">
          <ul className="flex items-center justify-center space-x-8">
            {pathname !== "/" && (
              <li>
                <NavLink
                  to="/"
                  className="flex items-center justify-center gap-2 hover:text-gray-300"
                >
                  <HouseLine size={32} />
                  Home
                </NavLink>
              </li>
            )}

            {pathname !== "/auth" && !token && (
              <li>
                <NavLink
                  to="/auth"
                  className="flex items-center justify-center gap-2 hover:text-gray-300"
                >
                  <SignIn size={32} />
                  Login
                </NavLink>
              </li>
            )}

            {pathname !== "/auth/favoritos" && token && (
              <li>
                <NavLink
                  to="/auth/favoritos"
                  className="flex items-center justify-center gap-2 hover:text-gray-300"
                >
                  <Heart size={32} />
                  Favoritos
                </NavLink>
              </li>
            )}

            {pathname !== "/auth/minha-conta" && token && (
              <li>
                <NavLink
                  to="/auth/minha-conta"
                  className="flex items-center justify-center gap-2 hover:text-gray-300"
                >
                  <User size={32} />
                  Minha Conta
                </NavLink>
              </li>
            )}

            {pathname !== "/carrinho" && (
              <li>
                <NavLink
                  to="/carrinho"
                  className="relative flex items-center justify-center gap-2 hover:text-gray-300"
                >
                  <ShoppingCart size={32} />
                  Carrinho
                  {cart.length > 0 && (
                    <span className="absolute px-2 font-bold  bg-red-500 rounded-full -top-4 text-sm left-[1rem]">
                      {cart.length}
                    </span>
                  )}
                </NavLink>
              </li>
            )}

            {token && (
              <li>
                <NavLink
                  onClick={() => localStorage.removeItem("token")}
                  to="/auth"
                  className="flex items-center justify-center gap-2 hover:text-gray-300"
                >
                  <SignOut size={32} />
                  Sair
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="block sm:hidden">
          <MobileHeader open={open} toggleMenu={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
