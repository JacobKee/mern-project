import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'



function App() {
  const [token, setToken] = useState([])

  useEffect( async () => {
    var tokens = []
    await fetch("http://localhost:8888/ethereum")
      .then(res => res.json())
      .then(
        (result) => {
          result.forEach(item => tokens.push(item))
        }
      ).catch(error => console.log(error))

    await fetch("http://localhost:8888/binance")
      .then(res => res.json())
      .then(
        (result) => {
          result.forEach(item => tokens.push(item))
        }
      ).catch(error => console.log(error))

    setToken(tokens)
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {token.map((item, index) => {
          return <p key={index}>{item.balance + ' ' +  item.name}</p>
        })}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
