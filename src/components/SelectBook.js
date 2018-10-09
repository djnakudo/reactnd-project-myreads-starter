import React from "react";

//component that will render the select element from each book to change the shelf status

const SelectBook = ({ shelf, updateBook, rerenderBook }) => {
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
    },
    {
      title: "None",
      shelftype: "none"
    }
  ];
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
        {shelfs.map(shelf => (
          <option value={shelf.shelftype}>{shelf.title}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectBook;
