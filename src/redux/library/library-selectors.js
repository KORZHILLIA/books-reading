const library = ({ library }) => library;

const libraryFuture = ({ library }) => library.books.future;

const libraryPresent = ({ library }) => library.books.present;

const libraryPast = ({ library }) => library.books.past;

// const defineLibraryError = ({ library }) => library.error?.message;

const librarySelectors = {
  library,
  libraryFuture,
  libraryPresent,
  libraryPast,
  // defineLibraryError,
};

export default librarySelectors;
