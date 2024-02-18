import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetBookRequest, IGetBookResponse } from "./types";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1/volumes",
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<IGetBookResponse, IGetBookRequest>({
      query: ({ startIndex = 0, maxResults = 10 }) => ({
        url: `?q=filter=paid-ebooks&Type=books&startIndex=${startIndex}&maxResults=${maxResults}`,
      }),
      transformResponse: (response: IGetBookResponse) => {
        return {
          ...response,
          items: response.items.map((book) => {
            return {
              ...book,
              quantity: 1,
              price: book.volumeInfo.pageCount * 0.5,
              volumeInfo: { ...book.volumeInfo },
            };
          }),
        };
      },
    }),
  }),
});

export const { useGetAllBooksQuery } = booksApi;
