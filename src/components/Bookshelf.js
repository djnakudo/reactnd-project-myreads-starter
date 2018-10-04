import React,{Component} from 'react';
import propTypes from 'prop-types';
import Book from './Book';
class Bookshelf extends Component{
    static propTypes = {
        books: propTypes.array.isRequired,
       
    }
    render(){
        const {books,RerenderShelfs} = this.props;
        return(
            <ol className="books-grid">
            {books.map(book=>(
                <li key={book.id}>
                       <Book book={book} RerenderShelfs={RerenderShelfs}/>
                      </li>
             ))}
            </ol>
        )
    }

}

export default Bookshelf;