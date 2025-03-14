
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import OpenMap from './components/OpenMap';
import {useState} from 'react';
function App() {

 
  const [formData, setFormData] = useState({"name": "", "phoneNo": ""});
  return (


    <div className="App">
    <Routes>
      <Route path='/' element={<Home setFormData={setFormData}/>}></Route>
      <Route path='/map' element={<OpenMap formData={formData} />}></Route>
    </Routes>

    </div>
  );
}

export default App;
