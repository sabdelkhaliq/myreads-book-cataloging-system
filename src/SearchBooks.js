import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'
class SearchBooks extends Component {

    static propTypes = {
        updateBookShelf: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
        this.state = {
            query: '',
            searchedBooks: []
        }
        this.updateQuery = this.updateQuery.bind(this);
        this.wordMap = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    }

    handleShelfUpdate(newShelf, book) {
        this.props.updateBookShelf(newShelf, book);
    }

    updateQuery = (query) => {
        this.setState({ query: query });
        if (this.wordMap.some((w) => w === query)) {
            BooksAPI.search(query).then(books => books.filter(book => book.imageLinks.thumbnail)).then(
                books => this.setState({ searchedBooks: books }));
        } else if (query === "") {
            this.setState({ searchedBooks: [] });
        }
    }

    render() {
        let { searchedBooks, query } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search" >Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query}
                            onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <div className="bookshelf">
                        <ol className="books-grid">
                            {searchedBooks.map((book) => <li key={book.id}><Book changeBookShelf={this.handleShelfUpdate} book={book} /></li>)}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBooks