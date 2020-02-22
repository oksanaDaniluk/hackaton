import React from 'react';
import PropTypes from 'prop-types';
/* import 'bootstrap'; */

export const TaskList = ({ todos }) => (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Task ID</th>
        <th>Task</th>
        <th>Task description </th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.taskId}>
          <th>{todo.taskId}</th>
          <th>{todo.taskTitle}</th>
          <th>{todo.taskDescription}</th>
          <button
            type="button"
          >
            EDIT
          </button>
        </tr>
      ))}
    </tbody>
  </table>
);

TaskList.propTypes = {
  todos: PropTypes.arrayOf().isRequired,
};
