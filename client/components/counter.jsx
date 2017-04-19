import React from 'react';
import PropTypes from 'prop-types';
import { shapes } from 'ducks/components/counter';

const Counter = ({
  counterComponentIm,
  counterComponentIncreaseDelta,
  counterComponentDecreaseDelta,
  counterComponentIncreaseAsyncSignal,
}) => (
  <div>
    Hello Counter {counterComponentIm.get('value')}

    <br />
    <button onClick={counterComponentIncreaseDelta}>Increase</button>
    <button onClick={counterComponentIncreaseAsyncSignal}>Increase Async</button>
    <button onClick={counterComponentDecreaseDelta}>Decrease</button>
  </div>
);

Counter.propTypes = {
  counterComponentIm: shapes.state.isRequired,
  counterComponentIncreaseDelta: PropTypes.func.isRequired,
  counterComponentDecreaseDelta: PropTypes.func.isRequired,
  counterComponentIncreaseAsyncSignal: PropTypes.func.isRequired,
};

export default Counter;
