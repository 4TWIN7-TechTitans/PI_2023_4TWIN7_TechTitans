
import './App.css';
import Signup from './userComponent/pages-register';
import Login from './userComponent/login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Routes>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login/>}></Route>
      
      </Routes> */}
      <Signup/>
      <Login/>
    </div>
  );
}

export default App;
