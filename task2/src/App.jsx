import { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Mounted');
  }, []);

  useEffect(() => {
    console.log('Updated');
  }, [count]);

  return (
    <div className="app-container">
      <h1 className="title">React Counter App</h1>
      <h2 className="counter">{count}</h2>

      <div className="buttons">
        <button className="btn increase" onClick={() => setCount(count + 1)}>+</button>
        <button className="btn reset" onClick={() => setCount(0)}>Reset</button>
        <button className="btn decrease" onClick={() => setCount(count - 1)}>-</button>
      </div>
    </div>
  );
}

export default App;
