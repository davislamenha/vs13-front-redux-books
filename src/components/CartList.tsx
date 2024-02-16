import { IBook } from '@/types/interfaces';
import CartProduct from './CartProduct';

interface CartListProps {
  books: IBook[];
}

const CartList = ({ books }: CartListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book, index) => (
        <CartProduct key={index} book={book} />
      ))}
    </div>
  );
};

export default CartList;
