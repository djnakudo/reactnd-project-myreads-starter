import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import Searchbar from './components/Searchbar'
import './App.css'
import BookList from './components/BookList'
class BooksApp extends React.Component {
  state = {
   
    books :[]
    
  }
  
  RerenderShelfs = ()=>{
    BooksAPI.getAll()
    .then((result)=>{
      this.setState(()=>({
        books:result
      }))
    })
  }
  componentDidMount(){
  
    this.RerenderShelfs();
  }
 
  

  render() {
    
    return (
      <div className="app">
      <Route exact path='/'  render={()=>(
       <BookList books={this.state.books} RerenderShelfs={this.RerenderShelfs}/>
      )}/>
      <Route path='/search' render={({history})=>(
       <Searchbar  onRedirectToMain={()=>{this.RerenderShelfs();history.push('/')}} />
      )} />
   
      </div>
    )
  }
}

export default BooksApp
