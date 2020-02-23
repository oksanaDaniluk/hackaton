/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';
import { AddTodo } from '../TaskList/AddTodo';

export class Calendar extends Component {
  state = {
    todos: [],
    dateContext: moment(),
    showMonthPopup: false,
    isTaskCreator: false,
  }

  weekdays = moment.weekdays();

  weekdaysShort = ['Mon', 'Thu', 'Wed', 'Tue', 'Fri', 'Sat', 'Sun'];

  months = moment.months();

  loadTaskCreator = () => {
    this.setState({
      isTaskCreator: true,
    });
  }

  year = () => this.state.dateContext.format('Y');

  month = () => this.state.dateContext.format('MMMM');

  daysInMonth = () => this.state.dateContext.daysInMonth();

  currentDate = () => this.state.dateContext.get('date');

  currentDay = () => this.state.dateContext.format('D');

  firstDayOfMonth = () => {
    const { dateContext } = this.state;
    let firstDay = moment(dateContext).startOf('month').format('d');

    if (!firstDay) {
      firstDay = 6;
    } else {
      firstDay -= 1;
    }

    return firstDay;
  }

  setMonth = (month) => {
    const monthNow = this.months.indexOf(month);
    // eslint-disable-next-line react/no-access-state-in-setstate
    let dateContext = Object.assign({}, this.state.dateContext);

    dateContext = moment(dateContext).set('month', monthNow);

    this.setState({
      dateContext,
    });
  }

  nextMonth = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    let dateContext = Object.assign({}, this.state.dateContext);

    dateContext = moment(dateContext).add(1, 'month');
    this.setState({
      dateContext,
    });

    // eslint-disable-next-line react/prop-types
    this.props.onNextMonth && this.props.onNextMonth();
  }

  prevMonth = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    let dateContext = Object.assign({}, this.state.dateContext);

    dateContext = moment(dateContext).subtract(1, 'month');

    this.setState({
      dateContext,
    });

    // eslint-disable-next-line react/prop-types
    this.props.onPrevMonth && this.props.onPrevMonth();
  }

  onSelectChange = (evt, data) => {
    this.setMonth(data);
    // eslint-disable-next-line react/prop-types
    this.props.onMonthChange && this.props.onMonthChange();
  }

  SelectList = (props) => {
    const popup = props.data.map(data => (
      <div key={data}>
        <button type="button" onClick={evt => this.onSelectChange(evt, data)}>
          {data}
        </button>
      </div>
    ));

    return (
      <div className="month-popup">
        {popup}
      </div>
    );
  }

  onChangeMonth = (evt, month) => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      showMonthPopup: !this.state.showMonthPopup,
    });
  }

  MonthNav = () => (
    <button
      type="button"
      className="label-month"
      onClick={(evt) => {
        this.onChangeMonth(evt, this.month());
      }}
    >
      {this.month()}
      {this.state.showMonthPopup
      && <this.SelectList data={this.months} />
      }
    </button>
  )

  showYearEditor = () => {
    this.setState({
      showYearNav: true,
    });
  }

  setYear = (year) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    let dateContext = Object.assign({}, this.state.dateContext);

    dateContext = moment(dateContext).set('year', year);
    this.setState({
      dateContext,
    });
  }

  onYearChange = (evt) => {
    this.setYear(evt.target.value);
    // eslint-disable-next-line react/prop-types
    this.props.onYearChange && this.props.onYearChange(evt, evt.target.value);
  }

  onKeyUpYear = (evt) => {
    if (evt.keyCode === 13 || evt.keyCode === 27) {
      this.setYear(evt.target.value);
      this.setState({
        showYearNav: false,
      });
    }
  }

  YearNav = () => (
    this.state.showYearNav
      ? (
        <input
          defaultValue={this.year()}
          className="editor-year"
          ref={yearInput => (this.yearInput = yearInput)}
          onKeyUp={evt => this.onKeyUpYear(evt)}
          onChange={evt => this.onYearChange(evt)}
          type="number"
          placeholder="year"
        />
      )
      : (
        <span
          className="label-year"
          onDoubleClick={() => (this.showYearEditor())}
        >
          {this.year()}
        </span>
      )
  )

  onDayClick = (evt, day) => {
    // eslint-disable-next-line react/prop-types
    this.props.onDayClick && this.props.onDayClick(evt, day);
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, {
        ...todo,
        dataTodo: prevState.dateContext,
      }],
    }));
  }

  render() {
    const weekdays = this.weekdaysShort.map(day => (
      <td key={day} className="week-day">{day}</td>
    ));
    const { todos } = this.state;

    const blanks = [];

    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td key={i * 80} className="emptySlot">{''}</td>);
    }

    const daysInMonth = [];

    for (let d = 1; d <= this.daysInMonth(); d++) {
      const className = (d === this.currentDay() ? 'day current-day' : 'day');

      daysInMonth.push(
        <td key={d} className={className}>
          <span
            onClick={evt => (this.onDayClick(evt, d))}
          >
            {d}
          </span>
        </td>,
      );
    }

    const totalSlots = [...blanks, ...daysInMonth];
    const rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if ((i % 7) !== 0) {
        cells.push(row);
      } else {
        const insertRow = cells.slice();

        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }

      if (i === totalSlots.length - 1) {
        const insertRow = cells.slice();

        rows.push(insertRow);
      }
    });

    const trElems = rows.map((d, i) => (
      <tr key={i * 100}>
        {d}
      </tr>
    ));

    return (
      <div className="calendar-container" style={this.style}>
        <table className="calendar">
          <thead>
            <tr className="calendar-header">
              <td colSpan="5">
                <this.MonthNav />
                {' '}
                <this.YearNav />
              </td>
              <td colSpan="2" className="nav-month">
                <span
                  className="prev"
                  onClick={() => this.prevMonth()}
                >
                  prev
                </span>
                <span
                  className="next"
                  onClick={() => this.nextMonth()}
                >
                  next
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekdays}
            </tr>
            {trElems}
          </tbody>
        </table>
        {
          this.state.isTaskCreator
            ? (
              <AddTodo todos={todos} addTodo={this.addTodo} />
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
