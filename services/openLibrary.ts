import { BookResult } from "../types/types";

export const getCoverUrl = (coverId: number) =>
  `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;

export const searchBooks = async (query: string): Promise<BookResult[]> => {
  const encoded = encodeURIComponent(query);
  const url = `https://openlibrary.org/search.json?q=${encoded}&limit=15&fields=key,title,author_name,first_publish_year,cover_i`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al buscar libros');
  const data = await res.json();
  return data.docs as BookResult[];
};