import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {

    static propTypes = {
        title: PropTypes.string,
        books: PropTypes.array.isRequired,
        onBookShelfChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.handleShelfUpdate = this.handleShelfUpdate.bind(this);
    }

    handleShelfUpdate(newShelf, book) {
        this.props.onBookShelfChange(newShelf, book);
    }

    render() {
        let { title, books } = this.props;
        return (
            <div className="bookshelf">
                {title &&
                    <h2 className="bookshelf-title">{title}</h2>}
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) =>
                            <li key={book.id}>
                                <Book changeBookShelf={this.handleShelfUpdate} book={book} />
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )

    }

}

export default BookShelf