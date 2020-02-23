import React, { Component } from 'react';
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
        <AddNote />
      </div>
    );
  }
}
