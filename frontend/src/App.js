import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import Palette from './pages/Palette';
import Recognition from './pages/Recognition';
import Simulator from './pages/Simulator';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/recognition" element={<Recognition/>}/>
          <Route path="/palette" element={<Palette/>}/>
          <Route path="/simulator" element={<Simulator/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
