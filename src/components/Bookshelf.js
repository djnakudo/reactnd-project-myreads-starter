import React, { Component } from "react";
import propTypes from "prop-types";
import Book from "./Book";
class Bookshelf extends Component {
  static propTypes = {
    books: propTypes.array.isRequired
  };
  render() {
    const { books, RerenderShelfs, title } = this.props;
    return (
      <div>
        {title && (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.map(book => (
                  <li key={book.id}>
                    <Book book={book} RerenderShelfs={RerenderShelfs} />
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
                <Book book={book} RerenderShelfs={RerenderShelfs} />
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }
}

export default Bookshelf;
