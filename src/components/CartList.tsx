import { ICartBook } from "@/redux/store/reducers/cart";
import CartProduct from "./CartProduct";

interface CartListProps {
  books: ICartBook[];
}

const CartList = ({ books }: CartListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <CartProduct key={book.id} book={book} />
      ))}
    </div>
  );
};

export default CartList;
