import React, { Component } from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        updateBookShelf: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.updateBookShelf = this.updateBookShelf.bind(this);
    }

    updateBookShelf(newShelf, book) {
        this.props.updateBookShelf(newShelf, book);
    }

    render() {
        let { books } = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf onBookShelfChange={this.updateBookShelf} title={'Currently Reading'} books={books.filter(book => book.shelf === 'currentlyReading' && book.imageLinks && book.imageLinks.thumbnail)} />
                        <BookShelf onBookShelfChange={this.updateBookShelf} title={'Want to Read'} books={books.filter(book => book.shelf === 'wantToRead' && book.imageLinks && book.imageLinks.thumbnail)} />
                        <BookShelf onBookShelfChange={this.updateBookShelf} title={'Read'} books={books.filter(book => book.shelf === 'read' && book.imageLinks && book.imageLinks.thumbnail)} />
                    </div>
                </div>
            </div>)
    }
}

export default ListBooks