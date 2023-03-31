import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Component1, Component2, store } from './app'

export const Root = (props) => {
  return (
    <Provider store={store}>
      <div>
        <Component1 />
        <Component2 />
      </div>
    </Provider>
  )
}
ReactDOM.render(<Root />, document.getElementById('root'));