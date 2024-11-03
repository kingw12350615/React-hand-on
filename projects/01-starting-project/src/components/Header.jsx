import pic from '../assets/investment-calculator-logo.png';

/**
 * The header of the application
 */
export default function Header() {
    return (<header id="header">
        <img src={pic} alt="pic" />
        <h1>Investment Calculator</h1>
    </header>);
}