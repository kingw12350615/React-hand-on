import { useState, useCallback, useMemo, memo } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory.jsx';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// use "memo" to avoid re-rendering when the initialCount prop doesn't changes
const Counter = memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  // use "useMemo" to avoid re-calculating the prime number check on every render
  const initialCountIsPrime =  useMemo(() => isPrime(initialCount), [initialCount]);

  const [counter, setCounter] = useState([{key: Math.random() * 1000, value: initialCount}]);

  // use "useCallback" to avoid re-creating the functions on every render
  const handleDecrement = useCallback(() => {
    setCounter((prevCounter) => [{key: Math.random() * 1000, value: -1}, ...prevCounter]);
  }, [])

  const handleIncrement = useCallback(() => {
    setCounter((prevCounter) => [{key: Math.random() * 1000, value: 1}, ...prevCounter]);
  }, [])

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter.reduce((acc, v) => acc + v.value, 0)} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counter} />
    </section>
  );
});

export default Counter;
