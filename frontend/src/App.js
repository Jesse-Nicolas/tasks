// npm modules
import { useState } from 'react'

// pages

//components
import NavBar from './components/NavBar/NavBar'

// services
import * as authService from './services/authService'

function App() {
  const [user, setUser] = useState(authService.getUser())

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
