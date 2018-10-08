import React, { Component } from "react";

import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";
class BookList extends Component {
  render() {
    const { books, onUpdatebook } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              title="Currently Reading"
              shelftype="currentlyReading"
              rerenderBook={onUpdatebook}
              books={books.filter(book => book.shelf === "currentlyReading")}
            />
            <Bookshelf
              title="Want to Read"
              shelftype="wantToRead"
              rerenderBook={onUpdatebook}
              books={books.filter(book => book.shelf === "wantToRead")}
            />
            <Bookshelf
              title="Read"
              shelftype="read"
              rerenderBook={onUpdatebook}
              books={books.filter(book => book.shelf === "read")}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookList;
