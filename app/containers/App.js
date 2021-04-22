/* eslint-disable semi */
/* eslint-disable no-console */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import style from './App.css';

@connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
  })
)
export default class App extends Component {


  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  state = {
    currentUrl: 'notSet'
  }


  render() {
    const { todos, actions } = this.props;

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const url = tabs[0].url
      console.log(`url -> ${JSON.stringify(url)}`)
      this.setState({
        currentUrl: url
      })
      // use `url` here inside the callback because it's asynchronous!
    })

    return (
      <div>
        <h3>Current URL: {this.state.currentUrl} </h3>
      </div>
    //   <div className={style.normal}>
    //   <Header addTodo={actions.addTodo} />
    //   <MainSection todos={todos} actions={actions} />
    // </div>
    )
  }
}
