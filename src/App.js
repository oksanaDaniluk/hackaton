import React, { Component } from 'react';
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
