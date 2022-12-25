const distributeBooks = (arr, type) =>
  arr.filter((book) => book.status === type);

export default distributeBooks;
