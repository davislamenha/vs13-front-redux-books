import { ICartBook } from '@/featured/store/reducers/cart';
import CartProduct from './CartProduct';

interface CartListProps {
  books: ICartBook[];
}

const CartList = ({ books }: CartListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <CartProduct key={book.id} book={book} />
      ))}
    </div>
  );
};

export default CartList;
