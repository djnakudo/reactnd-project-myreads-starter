import React,{Component} from 'react';
import Bookshelf from './Bookshelf';
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI';
import { isArray } from 'util';

import { isObject } from 'util';
class Searchbar extends Component{
    state={
  
     books : [],
     allBooks : []   
    }

    updateQuery = (query)=>{
        BooksAPI.search(query)
        .then(result=>{
            const queryParsedResult = isArray(result) ? result : isObject(result)  ? 'noData' : 'init';
          
            this.setState(()=>({
               
                books:queryParsedResult
            }))
        })
        
    }
    render(){
        const {books} = this.state;
     
        return(
            <div className="search-books">
            <div className="search-books-bar">
            <Link to="/" className="close-search" onClick={()=>{console.log('clicked');this.props.onRedirectToMain()}}>Close</Link>
             
              <div className="search-books-input-wrapper">
                
                <input type="text" placeholder="Search by title or author"
                
                onInput={(e)=>this.updateQuery(e.target.value)}
                />
          
              </div>
            </div>
            <div className="search-books-results">
               {isArray(books) && ( <Bookshelf books={books} />)}
               {books==='noData' &&(<p>No Books Found</p>)}
               
             
            </div>
            </div>
        )
    }

}

export default Searchbar;