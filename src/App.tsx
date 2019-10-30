import React from 'react';
import './App.css';
import { Timeout } from './Timeout';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          This project is to demonstrate session timeout warning, session extension and session expiry.
        </p>
      </header>
      <Timeout />
    </div>
  );
}

export default App;
