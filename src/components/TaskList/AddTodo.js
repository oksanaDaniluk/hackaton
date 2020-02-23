import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TaskList } from './TaskList';

/* import todos from '../../api/todos'; */

export class AddTodo extends Component {
  state = {
    taskId: 1,
    taskTitle: '',
    taskDescription: '',
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { taskTitle, taskId, taskDescription } = this.state;

    if (taskTitle) {
      this.addTodo({
        taskId,
        taskTitle,
        taskDescription,
      });
    }
  }

  handleInputTitleChange = ({ target: { value } }) => {
    this.setState({
      taskTitle: value,
    });
  }

  handleInputDescriptionChange = ({ target: { value } }) => {
    this.setState({
      taskDescription: value,
    });
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { taskTitle, taskId, taskDescription } = this.state;

    this.props.addTodo({
      taskId,
      taskTitle,
      taskDescription,
    });

    this.setState({
      taskId: taskId + 1,
      taskTitle: '',
      taskDescription: '',
    });
  }

  handleCanselButton = () => {
    this.setState({
      taskTitle: '',
      taskDescription: '',
    });
  }

  render() {
    const { taskTitle, taskDescription } = this.state;
    const { todos } = this.props;

    return (
      <form
        onSubmit={this.handleSubmitForm}
      >
        <label>
          <input
            type="text"
            onChange={this.handleInputTitleChange}
            value={taskTitle}
            placeholder="Write a task here"
          />
        </label>
        <label>
          <input
            type="text"
            onChange={this.handleInputDescriptionChange}
            value={taskDescription}
            placeholder="Write a description"
          />
        </label>
        <button disabled={!taskTitle.trim()} type="submit">
          Save
        </button>
        <button type="button" onClick={this.handleCanselButton}>
          Cansel
        </button>
        {(todos.length !== 0)
          && (
            <TaskList
              todos={todos}
              handleEdit={this.handleEdit}
            />
          )}
      </form>
    );
  }
}

AddTodo.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      taskId: PropTypes.any,
      taskTitle: PropTypes.string,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
