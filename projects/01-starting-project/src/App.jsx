import Header from "./components/Header"
import UserInput from "./components/UserInput"
import Result from "./components/Result"
import { useState } from "react"

/**
 * Main App component
 */
function App() {

  const [userInput, setUserInput] = useState({
    initialInvestment: 1000,
    annualInvestment: 100,
    expectedReturn: 6,
    duration: 12
  });

  const errMsg = checkInput(userInput);

  // Check if the user input is valid
  function checkInput(userInput) {
    if (userInput.duration <= 0) {
      return 'Duration must be greater than 0';
    }
    return null;
  }

  // Update the user input
  function onChange(identifier, value) {
    setUserInput(pre => {
      return {
        ...pre,
        [identifier]: Number(value)
      }
    });
  }

  return (
    <>
      <Header />
      <UserInput onChange={onChange} userInput={userInput} />
      {errMsg ? <p className="center">{errMsg}</p> : <Result userInput={userInput} />}
    </>
  )
}

export default App
