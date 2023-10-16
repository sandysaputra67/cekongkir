import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;


