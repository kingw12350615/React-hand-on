import { CORE_CONCEPTS } from '../data.js'
import CoreConcept from './CoreConcept.jsx';

export default function CoreConcepts() {
    return (
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
    );
}