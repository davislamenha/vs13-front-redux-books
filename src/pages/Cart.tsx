import { useEffect, useState } from "react";
import CartList from "@/components/CartList";
import { useAppSelector } from "@/redux/hooks/reduxTypedHooks";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const [subtotal, setSubtotal] = useState(0);
  const [freight, setFreight] = useState(0);
  const [total, setTotal] = useState(0);

  // Função para calcular subtotal, frete e total com base nos produtos do carrinho
  const calculateTotals = () => {
    const subtotalAmount = cart.reduce(
      (acc, book) => acc + book.retailPrice.amount * book.quantity,
      0
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
    <div className="container flex-1 p-6 mx-auto mt-8 bg-white rounded-lg shadow-lg">
      <h1 className="mb-4 text-2xl font-semibold">Seu Carrinho de Compras</h1>
      <CartList books={cart} />
      <div className="mt-8">
        <h2 className="mb-2 text-lg font-semibold">Resumo do Pedido</h2>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="font-semibold text-gray-800">
            Subtotal:{" "}
            {subtotal.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p className="font-semibold text-gray-800">
            Frete:{" "}
            {freight.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p className="mt-2 font-semibold text-gray-800">
            Total:{" "}
            {total.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
        <button className="px-4 py-2 mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Cart;
