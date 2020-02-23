import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NoteList } from './NoteList';
import './AddNote.css';

export class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
    };
  }

  handleInputChange = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value,
    });
  }

  handleTextareaChange = ({ target }) => {
    const { value } = target;

    this.setState({
      text: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, text } = this.state;

    this.props.addNote({
      title,
      text,
    });

    this.setState({
      title: '',
      text: '',
    });
  }

  render() {
    const { title, text } = this.state;
    const { noteList } = this.props;

    return (
      <div className="add-note">
        <h1 className="add-note__heading">Note List</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Write a title here..."
            className="add-note__input--title"
            value={title}
            onChange={this.handleInputChange}
          />
          <textarea
            placeholder="Write your note here..."
            className="add-note__input--text"
            value={text}
            onChange={this.handleTextareaChange}
          />
          <button
            className="add-note__button--add"
            type="submit"
            disabled={!title.trim()}
          >
          Add Note
          </button>
        </form>
        <NoteList
          noteList={noteList}
        />
      </div>
    );
  }
}

AddNote.propTypes = {
  noteList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
    }).isRequired,
  ).isRequired,
  addNote: PropTypes.func.isRequired,
};
