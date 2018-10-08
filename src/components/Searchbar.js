import React, { Component } from "react";
import Bookshelf from "./Bookshelf";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import { isArray } from "util";
import _ from "lodash";
import { isObject } from "util";
class Searchbar extends Component {
  state = {
    queriedBooks: []
  };

  updateQuery = query => {
    BooksAPI.search(query).then(result => {
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
              onInput={e => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {isArray(queriedBooks) && (
            <Bookshelf
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
