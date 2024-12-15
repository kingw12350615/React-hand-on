import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetClick(enteredNumber) {
    setChosenCount(enteredNumber);
    // if you want to use the previous state, always use the function form
    // setChosenCount(preChosenCount => preChosenCount + 1);
    // it is wrong below !!
    // setChosenCount(chosenCount + 1);
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetClick}/>
        <Counter key={chosenCount} initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
