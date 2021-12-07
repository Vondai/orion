import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from "./components/Header/Header";
import Login from './components/User/Login';
import Register from './components/User/Register';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>
    </>
  );
}

export default App;
