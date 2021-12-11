import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from "./components/Header/Header";
import Login from './components/User/Login';
import Signup from './components/User/Signup';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
