import { useAppDispatch } from '@/redux/hooks/reduxTypedHooks';
import {
  ICartBook,
  updateQuantity,
  removeFromCart,
  addToCart,
} from '@/redux/store/reducers/cart';
import { useEffect, useState } from 'react';

interface CartProductProps {
  book: ICartBook;
  cart?: boolean;
}

const CartProduct = ({ book, cart }: CartProductProps) => {
  const [quantity, setQuantity] = useState(book.quantity);
  const [total, setTotal] = useState(book.price * quantity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTotal(book.price * quantity);
  }, [quantity, book.price]);

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

  const handleBuy = () => {
    dispatch(addToCart({ ...book, quantity }));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg max-w-96 h-[28rem] flex flex-col">
      <div className="mb-4 h-48 flex justify-center align-middle">
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
          className="max-w-full rounded-lg object-cover"
        />
      </div>

      <h2 className="mb-2 text-lg font-medium text-center">
        {book.volumeInfo.title}
      </h2>

      <p className="text-gray-600">
        Editora:
        <span className="font-semibold ms-2">
          {book.volumeInfo.publisher
            ? book.volumeInfo.publisher
            : 'Não informado'}
        </span>
      </p>

      <p className="flex gap-2 mt-2 text-gray-800">
        Preço Unitário:
        <span className="font-semibold">
          {book.price.toLocaleString('pt-br', {
            currency: 'BRL',
            style: 'currency',
          })}
        </span>
      </p>
      {cart && (
        <p className="flex gap-2 mt-2 text-gray-800">
          Total:
          <span className="font-semibold">
            {total.toLocaleString('pt-br', {
              currency: 'BRL',
              style: 'currency',
            })}
          </span>
        </p>
      )}

      <div className="flex items-center justify-between flex-1">
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
      {cart ? (
        <button
          className="w-full mt-auto px-4 py-2 text-white uppercase bg-red-500 rounded-md hover:bg-red-600"
          onClick={handleRemove}
        >
          Remover
        </button>
      ) : (
        <button
          className="w-full mt-auto px-4 py-2 text-white uppercase bg-slate-500 rounded-md hover:bg-slate-600"
          onClick={handleBuy}
        >
          Adicionar ao Carrinho
        </button>
      )}
    </div>
  );
};

export default CartProduct;
