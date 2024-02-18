import { useState } from "react";
import { useGetAllBooksQuery } from "@/redux/api/booksApi";
import CartList from "@/components/CartList";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const { data, error, isLoading, isSuccess } = useGetAllBooksQuery({
    startIndex,
    maxResults: itemsPerPage,
  });

  let totalPages = 0;

  if (data?.totalItems) {
    totalPages = Math.ceil(data.totalItems / itemsPerPage);
  }

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
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex-1 w-full p-6 mx-auto mt-8 max-w-[1440px]">
        <div className="flex flex-col flex-wrap items-center justify-between mb-12">
          <h1 className="self-start mb-12 text-4xl font-bold">
            Bem-vindo à Livraria
          </h1>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg w-[21.5625rem] h-[30rem]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex items-center justify-center flex-1 p-6 mx-auto mt-8 text-5xl">
        Erro ao carregar os livros
      </div>
    );
  }

  return (
    <div className="container flex-1 p-6 mx-auto mt-8">
      <div className="flex flex-wrap items-center justify-between mb-12">
        <h1 className="text-4xl font-bold">Bem-vindo à Livraria</h1>
        <select
          title="pagination"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="px-2 py-1 mt-4 font-medium border border-gray-300 rounded-md"
        >
          <option value={5} className="font-medium">
            5 por página
          </option>
          <option value={10} className="font-medium">
            10 por página
          </option>
          <option value={20} className="font-medium">
            20 por página
          </option>
          <option value={30} className="font-medium">
            30 por página
          </option>
          <option value={40} className="font-medium">
            40 por página
          </option>
        </select>
      </div>

      {isSuccess ? (
        <CartList books={data?.items} />
      ) : (
        <div className="flex items-center justify-center flex-1">
          <h2 className="text-3xl">Nenhum livro encontrado</h2>
        </div>
      )}

      <div className="flex items-center justify-between mt-8">
        {currentPage > 1 ? (
          <Button onClick={handlePrevPage}>Anterior</Button>
        ) : (
          <span></span>
        )}

        {currentPage === totalPages ? (
          <span></span>
        ) : (
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Próximo
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
