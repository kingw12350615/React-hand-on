import reactImg from '../../assets/react-core-concepts.png';
import './Header.css';

const descriptions = ['core', 'crucial', 'important'];

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

export default function Header() {
    let description = descriptions[getRandomInt(descriptions.length - 1)];
    return (
        <header>
            <img src={reactImg} alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>
                {description} React concepts you will need for almost any app you are
                going to build!
            </p>
        </header>
    );
}