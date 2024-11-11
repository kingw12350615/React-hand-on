import { calculateInvestmentResults, formatter } from "../util/investment"

/**
 * Output Result of investment calculation
 */
export default function Result({ userInput }) {

    let results = calculateInvestmentResults(userInput);

    return <table id="result" className="center">
        <thead>
            <tr>
                <td>Year</td>
                <td>InvestmentValue</td>
                <td>Interest(Year)</td>
                <td>Total Interest</td>
                <td>Invested Capital</td>
            </tr>
        </thead>
        <tbody>
            {
                results.map(result => {
                    const totalIntrest = result.valueEndOfYear - (userInput.initialInvestment + result.annualInvestment * result.year);
                    return (
                        <tr key={result.year}>
                            <td>{result.year}</td>
                            <td>{formatter.format(result.valueEndOfYear)}</td>
                            <td>{formatter.format(result.interest)}</td>
                            <td>{formatter.format(totalIntrest)}</td>
                            <td>{formatter.format(userInput.initialInvestment + result.annualInvestment * result.year)}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
}