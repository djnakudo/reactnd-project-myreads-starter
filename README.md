# MyReads Project

This is the project assignment 'MyReads' for the  Udacity's React Fundamentals course.

This project used the [React Starter template] (https://github.com/udacity/reactnd-project-myreads-starter)
to develop an React application to display a couple of Books from a virtual library and let the user be able to select which book his/her are currently reading, want to read and read.



## Installation
It is required that you have already installed [npm] (https://www.npmjs.com/get-npm).


To install the project use any terminal interface to run these commands :
* `git clone https://github.com/djnakudo/reactnd-project-myreads-starter.git`
* `cd ./reactnd-project-myreads-starter`
* `npm install`
* and finally to run it every time `npm start`

## Project Structure
```bash

├── README.md - This file.

├── package.json # npm package manager file contains all the dependencies from the project

├── src
    ├── App.css # Main styles from the app, in comparison from the base repo, was added some styling for the alert component.
    ├── App.js # root app component and the routing system 
  
    ├── BooksAPI.js # inherited API file from the main repo

    ├── components # directory that contains the main components from the app
        --Book.js # component that contains that renders the book imagee,name,authors and includes a shelf component instance to manipulate it state
        -- BookDetails.js # component that renders a couple of extra details from a given book, and is possible to preview it from the link gave by the api and update its shelf status
        --BookList.js # renders the home page where it contains 3 shelves (currently reading,want to read and read) that the user is able to update a book by using selectbook component or a drag/drop event
        --Searchbar.js # /search route view that the user can query for books by an input text. It is possible to see the details or update it shelf status.Using lodash, the books are oredered according with its averageRating rank and after by its alphabetical ascending order
        --SelectBook.js # selector component to update the state from a single book

```

Others ommited files are similar or very equal to the main [repo] (https://github.com/udacity/reactnd-project-myreads-starter)

## Dependencies

To improve the UX,validations and javascript operation functions it is used in this project:

* [`Tachyons`](http://tachyons.io/docs/)
* [`lodash`](https://lodash.com/docs/4.17.10)
* [`Animate css`](https://github.com/digital-flowers/react-animated-css#readme)



## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


