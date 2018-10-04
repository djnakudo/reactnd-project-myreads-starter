import React,{Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import {Animated} from "react-animated-css";
import SelectBook from './SelectBook';
class Book extends Component{
  state = {
    shelf:'none'
  }
  updateBook = async (value)=>{
   let updateQuery = await BooksAPI.update(this.props.book,value);
   console.log(updateQuery);
   this.setState({
          
    shelf : value
      
   })
 alert('Book updated!');
    return updateQuery;
    
}
 getbook = async ()=>{
   let result = await BooksAPI.get(this.props.book.id);
  if(this._getBook)
    this.setState({
      shelf:result.shelf 
  })

    
    
 }

 componentDidMount(){
   this._getBook = true;
  this.getbook();
 }
 componentWillUnmount(){
   this._getBook=false;
 }

  render(){
        const {book,RerenderShelfs}  = this.props;
        return(
          <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
            <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
              <div className="book-shelf-changer">
              <SelectBook updateBook={this.updateBook} RerenderShelfs={RerenderShelfs} shelf={this.state.shelf} book={book}/>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            {book.authors&&book.authors.length>0 &&(<div className="book-authors">{book.authors.join(',')}</div>)}
            
          </div>
          </Animated>
        )
    }

}

export default Book;