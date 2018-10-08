import React from "react";

import { Route } from "react-router-dom";
import Searchbar from "./components/Searchbar";
import "./App.css";
import BookDetails from "./components/BookDetails";
import * as BooksAPI from "./BooksAPI";
import BookList from "./components/BookList";
class BooksApp extends React.Component {
  state = {
    books: [],
    currentQuery: "",
    msgstatus: "",
    alert: true
  };
  //alert timeout function to display a shelf status changing call
  timerAlert = setTimeout(() => {
    this.setState({ alert: true });
  }, 4000);
  updateBook = book => {
    clearTimeout(this.timerAlert);
    this.setState(prevState => ({
      msgstatus: this.generateShelfChangingStatus(book.shelf, book.title),
      alert: false,
      books:
        book.shelf === "none"
        //if the status is none the book will be in no other shelf 
          ? prevState.books.filter(item => item.id !== book.id)
          //change the book shelf
          : [book, ...prevState.books.filter(item => item.id !== book.id)]
    }));
    this.timerAlert = setTimeout(() => {
      this.setState({ alert: true });
    }, 4000);
  };
  changeQuery = query => {
    this.setState({ currentQuery: query });
  };
  //generate the innerHTML of the alert based on the new shelf status of a given Book by its name
  generateShelfChangingStatus = (shelf, name) => {
    switch (shelf) {
      case "none":
        return (
          <span>
            The book <i>{name}</i> is now into the void of dispair
          </span>
        );

      case "read":
        return (
          <span>
            Congratulations on reading the book <i>{name}</i>!
          </span>
        );
      case "wantToRead":
        return (
          <span>
            Now the book <i>{name}</i> is added to your wishlist
          </span>
        );

      case "currentlyReading":
        return (
          <span>
            Happy journey with the book <i>{name}</i>!
          </span>
        );
      default:
        return `404`;
    }
  };
  //API call to show all the classified books in some shelf
  getAllBooks = () => {
    BooksAPI.getAll().then(result => {
      this.setState(() => ({
        books: result
      }));
    });
  };
  componentDidMount() {
    this.getAllBooks();
  }
  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList books={books} onUpdatebook={this.updateBook} />
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <Searchbar
              query={this.state.currentQuery}
              onChangeQuery={this.changeQuery}
              onUpdatebook={this.updateBook}
            />
          )}
        />
        <Route
          path="/book/:id"
          render={props => (
            <BookDetails
              bookID={props.match.params.id}
              //props are passed in to get in the bookDetails component
              //the previous path and in the back button to go back to this route endpoint
              {...props}
              onUpdatebook={this.updateBook}
            />
          )}
        />
        
        <div className="alert-book-status " hidden={this.state.alert}>
          {this.state.msgstatus}
        </div>
      </div>
    );
  }
}

export default BooksApp;
