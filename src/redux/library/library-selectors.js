const library = ({ library }) => library;

const libraryFuture = ({ library }) => library.books.future;

const defineLibraryError = ({ library }) => library.error?.message;

const librarySelectors = { library, libraryFuture, defineLibraryError };

export default librarySelectors;
