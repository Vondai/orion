import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import Login from './components/User/Login';
import Register from './components/User/Register';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/'/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
