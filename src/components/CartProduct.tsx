import { IBook } from '@/types/interfaces';
import { useState } from 'react';

interface CartProductProps {
  book: IBook;
}

const CartProduct = ({
  book: {
    id,
    averageRating,
    imageLinks: { small },
    retailPrice: { amount },
    volumeInfo: { title },
  },
}: CartProductProps) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <img src={small} alt={title} className="w-full h-auto mb-4" />
      <h2 className="text-lg font-medium mb-2 text-center">{title}</h2>
      <p className="text-gray-600">
        Avaliação: <span className="font-semibold">{averageRating}</span>
      </p>
      <p className="text-gray-800  mt-2 flex gap-2">
        Preço:
        <span className="font-semibold">
          {amount.toLocaleString('pt-br', {
            currency: 'BRL',
            style: 'currency',
          })}
        </span>
      </p>
      <div className="flex justify-between items-center mt-4">
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
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md uppercase">
          Comprar
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
