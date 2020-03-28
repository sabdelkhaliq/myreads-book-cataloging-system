import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import { Link, Route } from 'react-router-dom'
class App extends React.Component {

  constructor() {
    super();
    this.state = {
      books: [],
    }
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(
      books => this.setState({ books: books }));
  }

  updateBookShelf(newShelf, book) {
    let books = this.state.books;
    const bookIndex = books.findIndex(b => b.id === book.id);
    if (bookIndex === -1)
      books.push(book);
    else
      books[bookIndex].shelf = newShelf;
    this.setState({ books: books });
    BooksAPI.update(book, newShelf);
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/Search" render={() => (
          <SearchBooks updateBookShelf={this.updateBookShelf} />
        )} />
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} updateBookShelf={this.updateBookShelf} />
        )} />
        <div className="open-search">
          <Link to="/Search">
            <button >Add a book</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default App
