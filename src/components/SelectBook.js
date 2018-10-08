import React, { Component } from "react";

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
