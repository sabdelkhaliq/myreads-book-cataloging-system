import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        changeBookShelf: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.onChangeBookShelf = this.onChangeBookShelf.bind(this);
        this.state = {
            selectedValue: "none"
        }
    }

    onChangeBookShelf(e) {
        const value = e.target.value;
        this.setState({ selectedValue: value });
        this.props.book.shelf = value;
        this.props.changeBookShelf(value, this.props.book);
    }

    componentDidMount() {
        this.setState({ selectedValue: this.props.book.shelf });
    }

    render() {
        let { book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.selectedValue} onChange={this.onChangeBookShelf} >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
            </div>
        )

    }

}

export default Book