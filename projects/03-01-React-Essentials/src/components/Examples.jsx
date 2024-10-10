import TabButton from './TabButton.jsx';
import { EXAMPLES } from '../data-with-examples.js';
import { useState } from 'react';
import Section from './Section.jsx';
import Tabs from './Tabs.jsx';

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
        <Section id="examples" title="Examples" >
            <Tabs buttons={<>
                <TabButton isSelected={seletetedTopic === 'components'} onSelect={() => handleClick('components')}>Components</TabButton>
                <TabButton isSelected={seletetedTopic === 'jsx'} onSelect={() => handleClick('jsx')}>JSX</TabButton>
                <TabButton isSelected={seletetedTopic === 'props'} onSelect={() => handleClick('props')}>Props</TabButton>
                <TabButton isSelected={seletetedTopic === 'state'} onSelect={() => handleClick('state')}>State</TabButton>
            </>} ButtonsContainer="menu">
                {tabContent}
            </Tabs>
        </Section>
    );
}