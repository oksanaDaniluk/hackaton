/* eslint-disable dot-notation */
import React from 'react';
import PropTypes from 'prop-types';

export const NoteList = ({ noteList }) => (
  <>
    {noteList.map(note => (
      <div className="add-note__note note">
        <h2 className="note__heading">{note.title}</h2>
        <p className="note__text">{note.text}</p>
        <span>{`${note.dateNote['_d']}`.substring(0, 15)}</span>
      </div>
    ))}
  </>
);

NoteList.propTypes = {
  noteList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
