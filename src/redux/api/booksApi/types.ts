export interface IBook {
  id: string;
  volumeInfo: {
    authors: string[];
    title: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    pageCount: number;
    publisher: string;
  };
  price: number;
}

export interface IGetBookResponse {
  kind: string;
  totalItems: number;
  items: IBook[];
}

export interface IGetBookRequest {
  startIndex: number;
  maxResults: number;
}
