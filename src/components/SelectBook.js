import React, { Component } from "react";

class SelectBook extends Component {
  render() {
    const { shelf, updateBook, RerenderShelfs } = this.props;

    return (
      <select
        value={shelf}
        onChange={e => {
          updateBook(e.target.value).then(data => {
            console.log(data);
            if (typeof RerenderShelfs === "function") {
              console.log("ok");
              RerenderShelfs();
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
    );
  }
}

export default SelectBook;
