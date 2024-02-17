import { useAppDispatch } from '@/featured/hooks';
import {
  ICartBook,
  removeFromCart,
  updateQuantity,
} from '@/featured/store/reducers/cart';

import { useEffect, useState } from 'react';

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
    <div className="bg-gray-100 rounded-lg p-4 max-w-96">
      <img
        srcSet={`${book.imageLinks.smallThumbnail} 475w, ${book.imageLinks.small}`}
        alt={book.volumeInfo.title}
        className="w-auto mb-4 mx-auto rounded-lg"
      />
      <h2 className="text-lg font-medium mb-2 text-center">
        {book.volumeInfo.title}
      </h2>
      <p className="text-gray-600">
        Avaliação: <span className="font-semibold">{book.averageRating}</span>
      </p>
      <p className="text-gray-800  mt-2 flex gap-2">
        Preço Unitário:
        <span className="font-semibold">
          {book.retailPrice.amount.toLocaleString('pt-br', {
            currency: 'BRL',
            style: 'currency',
          })}
        </span>
      </p>
      <p className="text-gray-800  mt-2 flex gap-2">
        Total:
        <span className="font-semibold">
          {total.toLocaleString('pt-br', {
            currency: 'BRL',
            style: 'currency',
          })}
        </span>
      </p>
      <div className="flex justify-between items-center my-4 ">
        <button
          className="bg-gray-200 px-3 py-1 rounded-md"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <span className="text-gray-800">{quantity}</span>
        <button
          className="bg-gray-200 px-3 py-1 rounded-md"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md uppercase w-full"
        onClick={handleRemove}
      >
        Remover
      </button>
    </div>
  );
};

export default CartProduct;
