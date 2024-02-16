import CartList from '@/components/CartList';

const Cart = () => {
  const books = [
    {
      id: 'zyTCAlFPjgYC',
      volumeInfo: {
        title: 'The Google story',
      },
      averageRating: 3.5,
      imageLinks: {
        smallThumbnail:
          'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        small:
          'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api',
      },
      retailPrice: {
        amount: 11.99,
      },
    },
    {
      id: 'zyTCAlFPjgegrgerYC',
      volumeInfo: {
        title: 'The Google story',
      },
      averageRating: 3.5,
      imageLinks: {
        smallThumbnail:
          'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        small:
          'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api',
      },
      retailPrice: {
        amount: 11.99,
      },
    },
    {
      id: 'gergerg',
      volumeInfo: {
        title: 'The Google story',
      },
      averageRating: 3.5,
      imageLinks: {
        smallThumbnail:
          'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        small:
          'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api',
      },
      retailPrice: {
        amount: 11.99,
      },
    },
    {
      id: 'zyTCAlFPjgYC',
      volumeInfo: {
        title: 'The Google story',
      },
      averageRating: 3.5,
      imageLinks: {
        smallThumbnail:
          'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        small:
          'https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api',
      },
      retailPrice: {
        amount: 11.99,
      },
    },
  ];

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Seu Carrinho de Compras</h1>
      <CartList books={books} />
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Resumo do Pedido</h2>
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-gray-800 font-semibold">Subtotal: $XX.XX</p>
          <p className="text-gray-800 font-semibold">Impostos: $XX.XX</p>
          <p className="text-gray-800 font-semibold mt-2">Total: $XX.XX</p>
        </div>
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default Cart;
