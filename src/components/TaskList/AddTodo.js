import React, { Component } from 'react';
import { TaskList } from './TaskList';
/* import PropTypes from 'prop-types'; */
/* import todos from '../../api/todos'; */

export class AddTodo extends Component {
  state = {
    todos: [],
    taskId: 1,
    taskTitle: '',
    taskDescription: '',
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, { ...todo }],
    }));
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

    this.addTodo({
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
    const { todos, taskTitle, taskDescription } = this.state;

    return (
      <form
        onSubmit={this.handleSubmitForm}
      >
        <label>
          <input
            type="text"
            className="todo-title"
            onChange={this.handleInputTitleChange}
            value={taskTitle}
            placeholder="Write a task here"
          />
        </label>
        <label>
          <textarea
            type="text"
            className="todo-text"
            onChange={this.handleInputDescriptionChange}
            value={taskDescription}
            placeholder="Write a description"
          />
        </label>
        <div className="button-container">
          <button
            className="button-save"
            disabled={!taskTitle.trim()}
            type="submit"
          >
          Save
          </button>
          <button
            className="button-cancel"
            type="button"
            onClick={this.handleCanselButton}
          >
          Cansel
          </button>
        </div>
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

/* AddTodo.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      taskId: PropTypes.any,
      taskTitle: PropTypes.string,
      /* descripshion: PropTypes.string,
      status: PropTypes.string,
      dateAdded: PropTypes.any,
      dateEnded: PropTypes.any,
    }).isRequired,
  ).isRequired,
}; */
