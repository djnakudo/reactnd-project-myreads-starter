import React, { PureComponent } from "react";
import propTypes from "prop-types";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";
class Bookshelf extends PureComponent {
  static propTypes = {
    books: propTypes.array.isRequired
  };
  onDrop = async (e, shelf) => {
    let book = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (book.shelf !== shelf) {
      await BooksAPI.update(book, shelf);
      book.shelf = shelf;
      this.props.rerenderBook(book);
    }
  };
  render() {
    const { books, rerenderBook, title, shelftype } = this.props;

    return (
      <div>
        {title && (
          <div
            className="bookshelf"
            onDrop={e => this.onDrop(e, shelftype)}
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
  }
}

export default Bookshelf;
