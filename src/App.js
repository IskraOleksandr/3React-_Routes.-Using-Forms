import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import './components/Style.css'
import Nav from './components/Nav'
import Home from './components/Home'
import Attractions from './components/Attractions'
import Photos from './components/Photos'
function App() {
  return (
      <BrowserRouter>
        <div className="app">
          <Nav />
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/photos" element={<Photos />} />

          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
