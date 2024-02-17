import { useEffect, useState } from 'react';
import CartList from '@/components/CartList';
import { useAppSelector } from '@/featured/hooks';

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const [subtotal, setSubtotal] = useState(0);
  const [freight, setFreight] = useState(0);
  const [total, setTotal] = useState(0);

  // Função para calcular subtotal, frete e total com base nos produtos do carrinho
  const calculateTotals = () => {
    const subtotalAmount = cart.reduce(
      (acc, book) => acc + book.retailPrice.amount * book.quantity,
      0,
    );
    const freightAmount = subtotalAmount * 0.2;
    const totalAmount = subtotalAmount + freightAmount;

    setSubtotal(subtotalAmount);
    setFreight(freightAmount);
    setTotal(totalAmount);
  };

  // Calcula os totais sempre que o carrinho mudar
  useEffect(() => {
    calculateTotals();
  }, [cart]);

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Seu Carrinho de Compras</h1>
      <CartList books={cart} />
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Resumo do Pedido</h2>
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-gray-800 font-semibold">
            Subtotal:{' '}
            {subtotal.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <p className="text-gray-800 font-semibold">
            Frete:{' '}
            {freight.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <p className="text-gray-800 font-semibold mt-2">
            Total:{' '}
            {total.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </div>
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Cart;
