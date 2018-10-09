import React from "react";
import propTypes from "prop-types";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

//component that will contain a given shelf to show the books from the API

const Bookshelf = ({ books, rerenderBook, title, shelftype }) => {
  //function to handle updates of drag/drop updating way of a given book
  const onDrop = async (e, shelf) => {
    //this will get a object data from on drag event ended from a Book component
    let book = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (book.shelf !== shelf) {
      await BooksAPI.update(book, shelf);
      book.shelf = shelf;
      rerenderBook(book);
    }
  };

  return (
    <div>
      {title && (
        <div
          className="bookshelf"
          onDrop={e => onDrop(e, shelftype)}
          onDragOver={e => e.preventDefault()}
        >
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map(book => (
                <li key={book.id}>
                  <Book book={book} rerenderBook={rerenderBook} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
      {!title && (
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <Book book={book} rerenderBook={rerenderBook} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
Bookshelf.propTypes = {
  books: propTypes.array.isRequired
};

export default Bookshelf;
