
import './App.css';
// import Signup from './userComponent/pages-register';
// import Login from './userComponent/login';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Signup = lazy(() => import('./userComponent/pages-register'));
const Login = lazy(() => import('./userComponent/login'));
const NotFound = lazy(() => import('./userComponent/notFound'));
const Home = lazy(() => import('./userComponent/index'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='*' element={<NotFound />} />
          <Route path='/index' element={<Home />} />
        </Routes>
      </Router>
    </Suspense>
      {/* <Signup/>
      <Login/> */}
    </div >
  );
}

export default App;
