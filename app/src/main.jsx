import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/login.jsx'
import NotFound from './pages/NotFound.jsx'
import './index.css'
import { Register } from './pages/Register.jsx'
import axios from 'axios'
import { Posts } from './pages/Posts.jsx'
import { Post } from './pages/Post.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { Profile } from './pages/Profile.jsx'

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/posts",
        element:
          <ProtectedRoute >
            <Posts />
          </ProtectedRoute>
      },
      {
        path: '/profile',
        element:
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
      },
      {
        path: "/post/:postId",
        element: <ProtectedRoute><Post /></ProtectedRoute>
      },
      //Route 404
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} ><App /></RouterProvider>
  </>
)
