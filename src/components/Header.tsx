import { useAppSelector } from '@/redux/hooks/reduxTypedHooks';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to={'/'} className="text-2xl font-bold">
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
                <span className="ms-2 py-1 px-2 text-sm font-bold text-white bg-slate-500 rounded-md top-[-1rem] right-[-1.2rem]">
                  {cart.length}
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
