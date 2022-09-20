import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Post from './components/Posts/Post';
import Create from './components/Communities/Create';
import PageNotFound from './components/PageNotFound';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Community from './components/Communities/Community';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <main className='p-4'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/community/:communityName'
              element={<Community />}
            />
            <Route
              path='/community/:communityName/comments/:postId'
              element={<Post />}
            />
            <Route
              path='/community/create'
              element={
                <PrivateRoute>
                  <Create />
                </PrivateRoute>
              }
            />
            <Route
              path='*'
              element={<PageNotFound />}
            />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
