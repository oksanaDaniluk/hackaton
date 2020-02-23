import React, { Component } from 'react';
import { AddTodo } from './components/TaskList/AddTodo';
import { AddNote } from './components/AddContent/AddNode/AddNote';
import { Calendar } from './components/Calendar/Calendar';
import './App.css';

export class App extends Component {
  state= {
  }

  render() {
    return (
      <div className="App">
        <Calendar />
      </div>
    );
  }
}
