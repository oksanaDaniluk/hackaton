import React, { Component } from 'react';
import './App.scss';
import { AddNote } from './components/AddContent/AddNode/AddNote';

export class App extends Component {
  state = {};

  render() {
    return (
      <AddNote />
    );
  }
}
