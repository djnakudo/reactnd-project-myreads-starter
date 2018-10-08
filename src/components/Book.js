import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";

import { Animated } from "react-animated-css";
import SelectBook from "./SelectBook";
import { Link } from "react-router-dom";

class Book extends Component {
  state = {
    shelf: "none",
    visibility: true
  };
  updateBook = async value => {
    await BooksAPI.update(this.props.book, value);
    let newbook = JSON.parse(JSON.stringify(this.props.book));
    newbook.shelf = value;
    this.setState({
      shelf: value
    });

    return newbook;
  };

  getbook = async () => {
    let result = await BooksAPI.get(this.props.book.id);
    if (this._getBook)
      this.setState({
        shelf: result.shelf
      });
  };
  dragStart = (e, book) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(book));
    e.dataTransfer.effectAllowed = "copy";
  };
  componentDidMount() {
    this._getBook = true;
    this.getbook();
  }

  componentWillUnmount() {
    this._getBook = false;
  }

  render() {
    const { book, rerenderBook } = this.props;
    const { visibility } = this.state;
    return (
      <Animated
        animationIn="fadeInDown"
        animationOut="fadeOut"
        isVisible={visibility}
      >
        <div
          draggable
          onDragStart={e => this.dragStart(e, book)}
          className=" grow  pointer link mw5 dt hide-child br2 cover bg-center"
        >
          <div className="white child dtc v-mid h-100 w-100 bg-green pa3">
            <p className="f6">
              Subtitle: {book.subtitle ? book.subtitle : "-"}
            </p>
            <p className="f6">
              Average Rating:{" "}
              {book.averageRating ? `${book.averageRating}/5` : "Not Available"}
            </p>
            <Link
              className="db no-underline white pa1 tc bg-dark-green"
              to={{
                pathname: `/book/${book.id}`
              }}
            >
              More Details
            </Link>
          </div>

          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: book.imageLinks
                  ? `url("${book.imageLinks.thumbnail}")`
                  : ``
              }}
            />

            <SelectBook
              updateBook={this.updateBook}
              rerenderBook={rerenderBook}
              shelf={this.state.shelf}
              book={book}
            />
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors &&
            book.authors.length > 0 && (
              <div className="book-authors">{book.authors.join(",")}</div>
            )}
        </div>
      </Animated>
    );
  }
}

export default Book;
