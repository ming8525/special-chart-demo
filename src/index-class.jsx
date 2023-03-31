import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { connect } from 'react-redux';

const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}
const store = createStore(reducer, { count: 0 });

const mapStateToProps = state => {
  return {
    count: state.count,
  };
};

class _Component1 extends React.Component {
  componentDidUpdate() {
    console.log('Component1 update', this.props.count);
  }

  render() {
    const { count } = this.props;

    return (
      <div>
        <h5>{`Redux store count: ${count}`}</h5>
      </div>
    );
  }
}
const Component1 = connect(mapStateToProps)(_Component1);

class _Component2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  handleIncreaseCount = () => {
    this.props.dispatch({ type: 'INCREASE_COUNT' });
    this.setState(prevState => ({ count: prevState.count + 1 }));
    console.log('count', this.state.count);
    console.log('redux count', this.props.count);
  };

  render() {
    const { count } = this.props;

    return (
      <div>
        <button onClick={this.handleIncreaseCount}>Increase count</button>
        <h5>{`State count: ${this.state.count}`}</h5>
      </div>
    );
  }
}
export const Component2 = connect(mapStateToProps)(_Component2);

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