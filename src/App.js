import React, { Component } from 'react';
import './App.scss';
import { AddTodo } from './components/TaskList/AddTodo';

export class App extends Component {
  state = {
    isTaskCreator: false,
  };

  loadTaskCreator = () => {
    this.setState({
      isTaskCreator: true,
    });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.isTaskCreator
            ? (
              <AddTodo />
            )
            : (
              <button
                className="button button__task-creator"
                type="button"
                onClick={this.loadTaskCreator}
              >
                Add task
              </button>
            )
        }
      </div>
    );
  }
}
