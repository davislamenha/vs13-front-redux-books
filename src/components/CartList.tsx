import { ICartBook } from "@/redux/store/reducers/cart";
import CartProduct from "./CartProduct";

interface CartListProps {
  books: ICartBook[];
  cart?: boolean;
}

const CartList = ({ books, cart = false }: CartListProps) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <CartProduct key={book.id} book={book} cart={cart} />
        ))}
      </div>
    </div>
  );
};

export default CartList;
