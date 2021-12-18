import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from "./components/Header/Header";
import Login from './components/User/Login';
import Signup from './components/User/Signup';
import Post from './components/Posts/Post';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <>
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/lorem/comments' element={<Post />} />
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
