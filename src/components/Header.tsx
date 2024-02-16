import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to={"/"} className="text-2xl font-bold">
          Redux Books
        </NavLink>
        <nav>
          <ul className="flex space-x-4 justify-center items-center">
            <li>
              <NavLink to="/" className="hover:text-gray-300">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/carrinho" className="hover:text-gray-300">
                Carrinho
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
