import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetBookRequest, IGetBookResponse } from './types';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://www.googleapis.com/books/v1/volumes?q=filter=paid-ebooks&Type=books',
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.mutation<IGetBookResponse, IGetBookRequest>({
      query: ({ startIndex = 0, maxResults = 10 }) => ({
        url: `?q=filter=paid-ebooks&Type=books&startIndex=${startIndex}&maxResults=${maxResults}`,
      }),
    }),
  }),
});

export const { useGetAllBooksMutation } = booksApi;
