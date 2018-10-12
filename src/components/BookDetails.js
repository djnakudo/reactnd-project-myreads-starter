import React, { PureComponent } from "react";
import * as BooksAPI from "../BooksAPI";
import SelectBook from "./SelectBook";
//Component to show details of a given book by its id passed in the route
class BookDetails extends PureComponent {
  state = {
    book: null,
    shelf: "none"
  };
  //method to update the book in the API context
  updateBook = async value => {
    await BooksAPI.update(this.state.book, value);
    let newbook = JSON.parse(JSON.stringify(this.state.book));
    newbook.shelf = value;
    this.setState({
      shelf: value
    });

    return newbook;
  };
  //first call when the component is mounted
  componentDidMount() {
    BooksAPI.get(this.props.bookID).then(book => {
      this.setState({
        book: book,
        shelf: book.shelf
      });
    });
  }

  render() {
    const { onUpdatebook } = this.props;
    // to not display an div with no content, its displayed a test div to simulate an loader aspect until the api call is completed
    let divrendered = <div>Loading</div>;
    if (this.state.book)
      divrendered = (
        <div>
          <nav className="bg-dark-green white bb b--light-gray dt ">
            <div
              className="dtc v-mid tc mr2 close-search "
              //this will go back to the previous route that called the present one
              onClick={() => this.props.history.goBack()}
            >
              Close
            </div>

            <h1 className="dtc w-100 h-100">
              Book: <span className="fw2">{this.state.book.title}</span>
            </h1>
          </nav>

          <div className="absolute--fill db tc p5 mv4">
            <section class="mw5 mw7-ns center white bg-dark-gray pa3 ph5-ns">
              <h1 className="mt0">{this.state.book.title}</h1>
              <h5 className="mt0">{this.state.book.subtitle}</h5>
              <h5 className="mt0 i">
                Published by: {this.state.book.publisher},
                {this.state.book.publishedDate}
              </h5>
              <div class="relative v-top ma3 dib">
                <img
                  className=" mw-100"
                  alt={this.state.book.title}
                  src={
                    this.state.book.imageLinks
                      ? this.state.book.imageLinks.thumbnail
                      : ""
                  }
                />
                <SelectBook
                  book={this.state.book}
                  shelf={this.state.shelf}
                  updateBook={this.updateBook}
                  rerenderBook={onUpdatebook}
                />
              </div>
              <p className="dib lh-copy measure tj">
                <span className="fw6">Description: </span>
                {this.state.book.description}
              </p>
              <a
                class="dib f2 ttu tracked bg-green ph3 white fw6 no-underline grow"
                href={this.state.book.previewLink}
                target="_blank"
              >
                Preview
              </a>
            </section>
          </div>
        </div>
      );
    return divrendered;
  }
}

export default BookDetails;
