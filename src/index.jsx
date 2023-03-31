import React from 'react';
import { createRoot } from 'react-dom/client';
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
const root = createRoot(document.getElementById('root'));
root.render(<Root />);