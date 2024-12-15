import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  return (
    <ol>
      {/**
       * use the "key" prop to help React identify which items have changed, are added, or are removed
       * this will help React to update only the necessary items
       */}
      {history.map((count) => (
        <HistoryItem key={count.key} count={count.value} />
      ))}
    </ol>
  );
}
