/* eslint-disable dot-notation */
import React from 'react';
import PropTypes from 'prop-types';
import './TaskList.css';

export const TaskList = ({ todos }) => (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Text</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.taskId}>
          <th>{todo.taskId}</th>
          <th>{todo.taskTitle}</th>
          <th>{todo.taskDescription}</th>
          <th>
            {`${todo.dataTodo['_d']}`.substring(0, 4)}
            {todo.day}
            {`${todo.dataTodo['_d']}`.substring(10, 15)}
          </th>
        </tr>
      ))}
    </tbody>
  </table>
);
TaskList.propTypes = {
  todos: PropTypes.arrayOf().isRequired,
};
