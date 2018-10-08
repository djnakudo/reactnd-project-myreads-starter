import React, { Component } from "react";


//component that will render the select element from each book to change the shelf status
class SelectBook extends Component {
  render() {
    const { shelf, updateBook, rerenderBook } = this.props;

    return (
      <div className="book-shelf-changer">
        <select
          hidden={!shelf}
          value={shelf}
          onChange={e => {
            updateBook(e.target.value).then(data => {
              //will only rerender a book if a function is passed in the parent component, e.g the Searchbar does not need that 
              //each selectBook component to force a rerender on a given Book component
              if (typeof rerenderBook === "function") {
                rerenderBook(data);
              }
            });
          }}
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default SelectBook;
