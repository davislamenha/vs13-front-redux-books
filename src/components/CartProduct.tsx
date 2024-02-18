import { useAppDispatch } from "@/redux/hooks/reduxTypedHooks";
import {
  ICartBook,
  updateQuantity,
  removeFromCart,
  addToCart,
} from "@/redux/store/reducers/cart";
import { useEffect, useState } from "react";
import { Heart } from "@phosphor-icons/react";
import {
  useAddToFavoritesMutation,
  useDeleteFavoriteMutation,
  useLazyGetFavoritesQuery,
} from "@/redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface CartProductProps {
  book: ICartBook;
  cart?: boolean;
}

const CartProduct = ({ book, cart }: CartProductProps) => {
  const [quantity, setQuantity] = useState(book.quantity);
  const [total, setTotal] = useState(book.price * quantity);
  const dispatch = useAppDispatch();

  const [getFavorites, { data: favorites }] = useLazyGetFavoritesQuery();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getFavorites();
    }
  }, [getFavorites]);

  const isFavorite = favorites?.find((item) => item.id === book.id);

  const [addToFavorites, { isLoading: isAddToFavoritesLoading }] =
    useAddToFavoritesMutation();
  const [deleteFavorite, { isLoading: isDeleteFavoriteLoading }] =
    useDeleteFavoriteMutation();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setTotal(book.price * quantity);
  }, [quantity, book.price]);

  const formatTitle = (title: string) => {
    let newTitle = "";

    if (book.volumeInfo.title.length > 30) {
      newTitle = title.substring(0, 30) + "...";
    } else {
      newTitle = title;
    }

    return newTitle;
  };

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

  const handleAddToFavorites = async () => {
    if (!token) {
      return navigate("/auth");
    }

    const newBook = {
      id: book.id,
      title: book.volumeInfo.title,
      publisher: book.volumeInfo.publisher ?? "Não informado",
      image_url: book.volumeInfo.imageLinks?.thumbnail,
      price: book.price,
    };

    await addToFavorites(newBook)
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteFavorite = async () => {
    await deleteFavorite({ id: book.id })
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg max-w-96 h-[30rem] flex flex-col gap-2">
      <div className="relative flex justify-center h-48 mb-4 align-middle">
        <img
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={book.volumeInfo.title}
          className="object-cover max-w-full rounded-lg"
        />

        {!cart &&
          (isAddToFavoritesLoading || isDeleteFavoriteLoading ? (
            <svg className="absolute top-0 right-0 p-2 mx-auto border-4 rounded-full size-5 border-primary/50 border-t-primary animate-spin"></svg>
          ) : isFavorite ? (
            <button
              disabled={isDeleteFavoriteLoading}
              aria-label="Remover dos favoritos"
              className="absolute top-0 right-0 group"
              onClick={handleDeleteFavorite}
            >
              <Heart
                size={32}
                weight="fill"
                className="transition-all group-hover:text-red-500"
              />
            </button>
          ) : (
            <button
              disabled={isAddToFavoritesLoading}
              aria-label="Adicionar aos favoritos"
              className="absolute top-0 right-0 group"
              onClick={handleAddToFavorites}
            >
              <Heart
                size={32}
                className="transition-all group-hover:text-red-500"
              />
            </button>
          ))}
      </div>

      <h2 className="mb-2 text-lg font-medium text-center">
        {formatTitle(book.volumeInfo.title)}
      </h2>

      <p className="text-gray-600">
        Editora:
        <span className="font-semibold ms-2">
          {book.volumeInfo.publisher
            ? book.volumeInfo.publisher
            : "Não informado"}
        </span>
      </p>

      <p className="flex gap-2 text-gray-800">
        Preço Unitário:
        <span className="font-semibold">
          {book.price.toLocaleString("pt-br", {
            currency: "BRL",
            style: "currency",
          })}
        </span>
      </p>
      {cart && (
        <p className="flex gap-2 text-gray-800">
          Total:
          <span className="font-semibold">
            {total.toLocaleString("pt-br", {
              currency: "BRL",
              style: "currency",
            })}
          </span>
        </p>
      )}

      <div className="flex items-center justify-between flex-1 mt-2">
        <Button onClick={decreaseQuantity}>-</Button>
        <span className="px-4 py-[0.35rem] font-bold text-gray-800 border-2 rounded-lg border-primary">
          {quantity}
        </span>
        <Button onClick={increaseQuantity}>+</Button>
      </div>
      {cart ? (
        <Button
          className="mt-4 bg-red-500 hover:bg-red-600"
          onClick={handleRemove}
        >
          Remover
        </Button>
      ) : (
        <Button onClick={handleBuy} className="mt-4">
          Adicionar ao carrinho
        </Button>
      )}
    </div>
  );
};

export default CartProduct;
