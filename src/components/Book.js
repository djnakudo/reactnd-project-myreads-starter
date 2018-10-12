import React, { PureComponent } from "react";
import * as BooksAPI from "../BooksAPI";

import { Animated } from "react-animated-css";
import SelectBook from "./SelectBook";
import { Link } from "react-router-dom";
//book compoment - this is showed in booklist and search views
class Book extends PureComponent {
  //shelf is a state of the current shelf from the book and visibility to manipulate animation effects
  state = {
    shelf: "none",
    visibility: true
  };
  //calls for the updateBook api and set the state of the shelf
  updateBook = async value => {
    await BooksAPI.update(this.props.book, value);
    let newbook = JSON.parse(JSON.stringify(this.props.book));
    newbook.shelf = value;
    this.setState({
      shelf: value
    });

    return newbook;
  };
//since the search api does not returns the shelf of a book, a call to a get method from the bookapi is needed
// to get the shelf status
  getbook = async () => {
    let result = await BooksAPI.get(this.props.book.id);
    if (this._getBook)
      this.setState({
        shelf: result.shelf
      });
  };
  //drag start method to pass the book data as an object for a shelf ondrop method
  dragStart = (e, book) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(book));
    e.dataTransfer.effectAllowed = "copy";
  };
  //this._getbook is implemented since BookAPI methods  are an async tasks, to not throw errors of call stack limit exceed
  componentDidMount() {
    this._getBook = true;
    this.getbook();
  }
//when the component will unmount all the async previous not finished tasks, are successfully ended
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
