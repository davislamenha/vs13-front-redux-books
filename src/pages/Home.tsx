import { useEffect, useState } from 'react';
import { useGetAllBooksMutation } from '@/redux/api/booksApi';
import CartList from '@/components/CartList';
import { ICartBook } from '@/redux/store/reducers/cart';

const Home = () => {
  const [books, setBooks] = useState<ICartBook[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [getAllBooksMutation, { isLoading }] = useGetAllBooksMutation();

  const callGetAllBooks = async () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const maxResults = itemsPerPage;

    await getAllBooksMutation({ startIndex, maxResults })
      .unwrap()
      .then((payload) => {
        setTotalItems(payload.totalItems);
        const updatedBooks = payload.items.map((book) => {
          let title = '';

          if (book.volumeInfo.title.length > 20) {
            title = book.volumeInfo.title.substring(0, 20) + '...';
          } else {
            title = book.volumeInfo.title;
          }

          return {
            ...book,
            quantity: 1,
            price: book.volumeInfo.pageCount * 0.5,
            volumeInfo: { ...book.volumeInfo, title },
          };
        });
        setBooks(updatedBooks);
      })
      .catch((error) => {
        console.error('Erro ao obter livros:', error);
      });
  };

  useEffect(() => {
    callGetAllBooks();
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-8 p-6 flex-1 flex justify-center items-center text-5xl">
        Carregando...
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 p-6 flex-1">
      <div className="flex justify-between items-center flex-wrap mb-12">
        <h1 className="text-5xl font-bold">Bem-vindo à Livraria</h1>
        <select
          title="pagination"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="mt-4 px-2 py-1 border border-gray-300 rounded-md"
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={30}>30 por página</option>
          <option value={40}>40 por página</option>
        </select>
      </div>

      <CartList books={books} />

      <div className="flex justify-between items-center mt-8">
        {currentPage === 1 ? (
          <span></span>
        ) : (
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-slate-500 text-white rounded-md"
          >
            Anterior
          </button>
        )}

        {currentPage === totalPages ? (
          <span></span>
        ) : (
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-slate-500 text-white rounded-md"
          >
            Próximo
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
