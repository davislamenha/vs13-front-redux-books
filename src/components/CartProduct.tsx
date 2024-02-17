import { useAppDispatch } from "@/redux/hooks/reduxTypedHooks";
import {
  ICartBook,
  updateQuantity,
  removeFromCart,
} from "@/redux/store/reducers/cart";
import { useEffect, useState } from "react";

interface CartProductProps {
  book: ICartBook;
}

const CartProduct = ({ book }: CartProductProps) => {
  const [quantity, setQuantity] = useState(book.quantity);
  const [total, setTotal] = useState(book.retailPrice.amount * quantity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTotal(book.retailPrice.amount * quantity);
  }, [quantity, book.retailPrice.amount]);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    dispatch(updateQuantity({ id: book.id, quantity: newQuantity }));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id: book.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(book.id));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg max-w-96">
      <img
        srcSet={`${book.imageLinks.smallThumbnail} 475w, ${book.imageLinks.small}`}
        alt={book.volumeInfo.title}
        className="w-auto mx-auto mb-4 rounded-lg"
      />
      <h2 className="mb-2 text-lg font-medium text-center">
        {book.volumeInfo.title}
      </h2>
      <p className="text-gray-600">
        Avaliação: <span className="font-semibold">{book.averageRating}</span>
      </p>
      <p className="flex gap-2 mt-2 text-gray-800">
        Preço Unitário:
        <span className="font-semibold">
          {book.retailPrice.amount.toLocaleString("pt-br", {
            currency: "BRL",
            style: "currency",
          })}
        </span>
      </p>
      <p className="flex gap-2 mt-2 text-gray-800">
        Total:
        <span className="font-semibold">
          {total.toLocaleString("pt-br", {
            currency: "BRL",
            style: "currency",
          })}
        </span>
      </p>
      <div className="flex items-center justify-between my-4 ">
        <button
          className="px-3 py-1 bg-gray-200 rounded-md"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <span className="text-gray-800">{quantity}</span>
        <button
          className="px-3 py-1 bg-gray-200 rounded-md"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
      <button
        className="w-full px-4 py-2 text-white uppercase bg-red-500 rounded-md hover:bg-red-600"
        onClick={handleRemove}
      >
        Remover
      </button>
    </div>
  );
};

export default CartProduct;
