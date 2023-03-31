import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}
const store = createStore(reducer, { count: 0 });

const Component1 = ({ }) => {
  const count = ReactRedux.useSelector(state => state.count)

  React.useEffect(() => {
    if(count) {
      console.log('Component1 update')
    }
  }, [count])

  return (
    <div>
      <h5>{`Redux store count: ${count}`}</h5>
    </div>
  )
}

const Component2 = ({ }) => {
  const dispatch = ReactRedux.useDispatch()
  const [count, setCount] = React.useState(0)

  const handleIncreaseCount = () => {
    dispatch({ type: 'INCREASE_COUNT' })
    setCount(count + 1)
    console.log('count', count)
    console.log('redux count', store.getState().count)
  }
  return (
    <div>
      <button onClick={handleIncreaseCount}>Increase count</button>
      <h5>{`State count: ${count}`}</h5>
    </div>
  )
}



const Root = (props) => {
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