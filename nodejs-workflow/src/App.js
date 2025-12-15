import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React! 🚀</h1>
        <p>This is a simple React.js website</p>

        <div className="card">
          <h2>Counter Example</h2>
          <p>Count: <span className="count">{count}</span></p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <button onClick={() => setCount(count - 1)}>Decrement</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>

        <div className="card">
          <h3>Input Example</h3>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name && <p>Hello, <strong>{name}</strong>! 👋</p>}
        </div>

        <footer>
          <p>Built with React.js ⚛️</p>
        </footer>
      </header>
    </div>
  );
}

export default App;
