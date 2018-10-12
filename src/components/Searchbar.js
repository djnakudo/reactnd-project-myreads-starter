import React, { Component } from "react";
import Bookshelf from "./Bookshelf";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import { isArray} from "util";
import _ from "lodash";
import { isObject } from "util";

// this component will display a searchbar and a view for the results of a given query
// in an input text type component
class Searchbar extends Component {
  //all the queried books as a state
  state = {
    queriedBooks: []
  };
  //function to call the api search function and update the state from the component
  updateQuery = query => {
  
    BooksAPI.search(query).then(result => {
      //handle errors, if the api returned books(array), normal update
      //otherwise it cannot found any books (noData) or the initial state as an empty input value(init)
      const queryParsedResult = isArray(result)
        ? result
        : isObject(result)
          ? "noData"
          : "init";

      this.props.onChangeQuery(query);
      this.setState(() => ({
        queriedBooks: queryParsedResult
      }));
    });
  };
  //first initial query since a previous query is a props to mount the component with the previous query,
  //this was implemented since a user can view a book in BookDetails, and then comeback to search view
  componentDidMount() {
    document.querySelector(
      ".search-books-input-wrapper input"
    ).value = this.props.query;
    this.updateQuery(this.props.query);
  }
  render() {
    const { queriedBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onInput={(e) =>  {
                let debounced=_.debounce(this.updateQuery,200)
                debounced(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          {isArray(queriedBooks) && (
            <Bookshelf
            //order the books in averageRating in descending order, and after the title in ascending way, just for books that has ratings available
              books={[
                ..._.orderBy(
                  queriedBooks.filter(book => !isNaN(book.averageRating)),
                  ["averageRating", "title"],
                  ["desc", "asc"]
                ),
                ...queriedBooks.filter(book => isNaN(book.averageRating))
              ]}
              rerenderBook={this.props.onUpdatebook}
            />
          )}
          {queriedBooks === "noData" && <p>No Books Found</p>}
        </div>
      </div>
    );
  }
}

export default Searchbar;
