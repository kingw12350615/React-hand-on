import { CORE_CONCEPTS } from './data.js'
import Header from './components/Header/Header.jsx';
import CoreConcept from './components/CoreConcept.jsx';
import TabButton from './components/TabButton.jsx';
import { useState } from 'react';
import { EXAMPLES } from './data-with-examples.js';

function App() {

  const [seletetedTopic, setSelectedTopic] = useState(null);

  function handleClick(identifier) {
    setSelectedTopic(identifier);
  };

  let tabContent = <p>Please select a topic</p>;

  if (seletetedTopic) {
    tabContent = 
      <div id="tab-content">
        <h3>{EXAMPLES[seletetedTopic].title}</h3>
        <p>{EXAMPLES[seletetedTopic].description}</p>
        <pre>
          <code>
            {EXAMPLES[seletetedTopic].code}
          </code>
        </pre>
      </div>
  }

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concept</h2>
          <ul>
            {CORE_CONCEPTS.map(e => <CoreConcept key={e.title} {...e} />)}
            {/* Normal way to pass prop object
            <CoreConcept title={CORE_CONCEPTS[0].title} description={CORE_CONCEPTS[0].description} image={CORE_CONCEPTS[0].image} />
            {/* Shorter way using spread operation */}
            {/* <CoreConcept {...CORE_CONCEPTS[1]} /> */}
            {/* <CoreConcept title={CORE_CONCEPTS[2].title} description={CORE_CONCEPTS[2].description} image={CORE_CONCEPTS[2].image} /> */}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton isSelected={seletetedTopic === 'components'} onSelect={() => handleClick('components')}>Components</TabButton>
            <TabButton isSelected={seletetedTopic === 'jsx'} onSelect={() => handleClick('jsx')}>JSX</TabButton>
            <TabButton isSelected={seletetedTopic === 'props'} onSelect={() => handleClick('props')}>Props</TabButton>
            <TabButton isSelected={seletetedTopic === 'state'} onSelect={() => handleClick('state')}>State</TabButton>
          </menu>
          {tabContent} 
        </section>
      </main>
    </div>
  );
}

export default App;
