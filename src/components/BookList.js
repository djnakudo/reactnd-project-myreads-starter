import React,{Component} from 'react';

import {Link} from 'react-router-dom';
import Bookshelf from './Bookshelf'
class BookList extends Component{

    render(){
        const {books,RerenderShelfs} = this.props;
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                  <Bookshelf RerenderShelfs = {RerenderShelfs} books={books.filter(book=>book.shelf==='currentlyReading')}/>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                  <Bookshelf RerenderShelfs = {RerenderShelfs} books={books.filter(book=>book.shelf==="wantToRead")}/> 
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                  <Bookshelf RerenderShelfs = {RerenderShelfs} books={books.filter(book=>book.shelf==='read')}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
             <Link to="/search">Add a book</Link>
              
            </div>
          </div>
        )
    }

}

export default BookList;