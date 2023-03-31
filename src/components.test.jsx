import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux';
import { Component1, Component2, store } from './app'
import { act } from 'react-dom/test-utils';

describe('test components', function () {
  it('should call did-update for component1 when call update in component2', function () {
    const ref = { current: null }
    const callback = jest.fn()
    render(<Provider store={store}>
      <div>
        <Component1 callback={callback} />
        <Component2 ref={ref} />
      </div>
    </Provider>)
    act(() => {
      ref.current.handleIncreaseCount()
    })
    // ref.current.handleIncreaseCount()
    expect(callback).toBeCalled()
  })
})