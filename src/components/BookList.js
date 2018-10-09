import React from "react";

import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf";

//main div to display the home page of the myreads app

const BookList = ({ books, onUpdatebook }) => {
  const shelfs = [
    {
      title: "Currently Reading",
      shelftype: "currentlyReading"
    },
    {
      title: "Want to Read",
      shelftype: "wantToRead"
    },
    {
      title: "Read",
      shelftype: "read"
    }
  ];
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfs.map(data => (
            <Bookshelf
              title={data.title}
              shelftype={data.shelftype}
              rerenderBook={onUpdatebook}
              books={books.filter(book => book.shelf === data.shelftype)}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default BookList;
