export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
  };
  imageLinks: {
    smallThumbnail: string;
    small: string;
  };
  averageRating: number;
  retailPrice: {
    amount: number;
  };
}
