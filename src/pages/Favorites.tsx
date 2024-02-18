import { formatPrice } from "@/lib/utils";
import {
  useDeleteFavoriteMutation,
  useGetFavoritesQuery,
} from "@/redux/api/authApi";
import { Heart } from "@phosphor-icons/react";
import { useState } from "react";

export function Favorites() {
  const { data, error, isLoading } = useGetFavoritesQuery();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDeleteFavorite = async ({ id }: { id: string }) => {
    setLoadingId(id);
    await deleteFavorite({ id })
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadingId(null);
  };

  return (
    <div className="relative flex-1 max-w-screen">
      <div className="pl-4 pr-4 pt-12 pb-12 m-auto flex flex-col items-start gap-8 max-w-[1440px] justify-center ">
        <h1 className="text-3xl">Favorites</h1>
        {isLoading ? (
          <svg className="absolute p-2 mx-auto border-4 rounded-full top-1/2 left-1/2 size-10 border-primary/50 border-t-primary animate-spin"></svg>
        ) : error ? (
          <p className="absolute top-1/2 left-[calc(50%-(15.25rem/2))]">
            Não foi possível carregar a página.
          </p>
        ) : data && data.length > 0 ? (
          <div className="flex flex-wrap items-start justify-center gap-8">
            {data.map((book) => (
              <div
                key={book.id}
                className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg max-w-96"
              >
                <div className="relative flex justify-center h-48 align-middle">
                  <img src={book.image_url} alt={book.title} />
                  {loadingId === book.id ? (
                    <svg className="absolute top-0 right-0 p-2 mx-auto border-4 rounded-full size-5 border-primary/50 border-t-primary animate-spin"></svg>
                  ) : (
                    <button
                      aria-label="Remover dos favoritos"
                      className="absolute top-0 right-0 group"
                      onClick={() => handleDeleteFavorite({ id: book.id })}
                    >
                      <Heart
                        size={32}
                        weight="fill"
                        className="transition-all group-hover:text-red-500"
                      />
                    </button>
                  )}
                </div>

                <h2 className="mb-2 text-lg font-medium text-center">
                  {book.title}
                </h2>
                <p className="font-medium">
                  Editora:{" "}
                  <span className="text-gray-600">{book.publisher}</span>
                </p>
                <p className="font-medium">
                  Preço Unitário:
                  <span className="ml-2 font-medium text-green-600">
                    {formatPrice(book.price)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="absolute top-1/2 sm:left-[calc(50%-(23.5625rem/2))] max-w-[80vw]">
            Você ainda não adicionou nenhum livro aos favoritos.
          </p>
        )}
      </div>
    </div>
  );
}
