import TabButton from './TabButton.jsx';
import { EXAMPLES } from '../data-with-examples.js';
import { useState } from 'react';

export default function Examples() {

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
    );
}