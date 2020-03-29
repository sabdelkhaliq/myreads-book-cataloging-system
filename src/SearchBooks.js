import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle';

class SearchBooks extends Component {

    static propTypes = {
        updateBookShelf: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
        this.state = {
            searchedBooks: []
        }
        this.updateQuery = this.updateQuery.bind(this);
    }

    handleShelfUpdate(newShelf, book) {
        this.props.updateBookShelf(newShelf, book);
    }

    updateQuery = (query) => {

        if (!query) {
            this.setState({ searchedBooks: [] });
        } else {
            BooksAPI.search(query.trim()).then(
                books => ((books && books.length) && this.setState({ searchedBooks: books }))
            );
        }
    }

    render() {
        let { searchedBooks } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search" >Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="200" handler="onChange">
                            <input type="text" placeholder="Search by title or author"
                                onChange={(event) => this.updateQuery(event.target.value)} />
                        </Debounce >
                    </div>
                </div>
                <div className="search-books-results">
                    <div className="bookshelf">
                        <ol className="books-grid">
                            {searchedBooks.map((book) => book.imageLinks && book.imageLinks.thumbnail && <li key={book.id}><Book changeBookShelf={this.handleShelfUpdate} book={book} /></li>)}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBooks