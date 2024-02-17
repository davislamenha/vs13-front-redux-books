import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Heart, List, ShoppingCart, User } from "lucide-react";
import { HouseLine, SignIn, SignOut } from "@phosphor-icons/react";
import { useLocation, NavLink } from "react-router-dom";

interface MobileHeaderProps {
  open: boolean;
  toggleMenu: () => void;
}

export function MobileHeader({ open, toggleMenu }: MobileHeaderProps) {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");

  return (
    <Drawer direction="right" open={open}>
      <DrawerTrigger
        aria-label="Abrir menu"
        className="flex items-center justify-center gap-2"
        onClick={toggleMenu}
      >
        <List size={32} />
      </DrawerTrigger>
      <DrawerContent className="top-0 right-0 mt-0 w-full max-w-[250px] pb-6 rounded-lg">
        <DrawerHeader className="text-left">
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <nav className="w-full">
          <ul className="flex flex-col items-center justify-center w-full gap-4 mt-4">
            {pathname !== "/" && (
              <li className="w-full">
                <NavLink
                  onClick={toggleMenu}
                  to="/"
                  className="flex items-center justify-center w-full gap-2 py-2 hover:text-primary-foreground hover:bg-primary"
                >
                  <HouseLine size={32} />
                  Home
                </NavLink>
              </li>
            )}

            {pathname !== "/auth" && !token && (
              <li className="w-full">
                <NavLink
                  onClick={toggleMenu}
                  to="/auth"
                  className="flex items-center justify-center w-full gap-2 py-2 hover:text-primary-foreground hover:bg-primary"
                >
                  <SignIn size={32} />
                  Login
                </NavLink>
              </li>
            )}

            {pathname !== "/auth/favoritos" && token && (
              <li className="w-full">
                <NavLink
                  onClick={toggleMenu}
                  to="/auth/favoritos"
                  className="flex items-center justify-center w-full gap-2 py-2 hover:text-primary-foreground hover:bg-primary"
                >
                  <Heart size={32} />
                  Favoritos
                </NavLink>
              </li>
            )}

            {pathname !== "/auth/minha-conta" && token && (
              <li className="w-full">
                <NavLink
                  onClick={toggleMenu}
                  to="/auth/minha-conta"
                  className="flex items-center justify-center w-full gap-2 py-2 hover:text-primary-foreground hover:bg-primary"
                >
                  <User size={32} />
                  Minha Conta
                </NavLink>
              </li>
            )}

            {pathname !== "/carrinho" && (
              <li className="w-full">
                <NavLink
                  onClick={toggleMenu}
                  to="/carrinho"
                  className="flex items-center justify-center w-full gap-2 py-2 hover:text-primary-foreground hover:bg-primary"
                >
                  <ShoppingCart size={32} />
                  Carrinho
                </NavLink>
              </li>
            )}

            {token && (
              <li className="w-full">
                <NavLink
                  onClick={() => {
                    localStorage.removeItem("token");
                    toggleMenu();
                  }}
                  to="/auth"
                  className="flex items-center justify-center w-full gap-2 py-2 hover:text-primary-foreground hover:bg-primary"
                >
                  <SignOut size={32} />
                  Sair
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <DrawerFooter className="absolute right-0 top-2">
          <DrawerClose
            aria-label="Fechar menu"
            className='class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"'
            onClick={toggleMenu}
          >
            X
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
