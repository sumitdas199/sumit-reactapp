import AuthRequired from './components/AuthRequired';
import Home from './components/pages/Home';
import Layout from './components/Layouts/Layout';
import Login from './components/pages/Login';
import Post from './components/pages/Post';
import PostDetail from './components/pages/PostDetail';
import Registration from './components/pages/Registration';
import GuestRoute from './components/GuestRoute'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import CreatePost from './components/pages/CreatePost';
import UpdatePost from './components/pages/UpdatePost';

function App() {
 
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route element={<GuestRoute/>} >
              <Route index element={<Home/>} />
          </Route>
          <Route element={<GuestRoute/>} >
              <Route path='login' element={<Login/>} />
          </Route>
          <Route element={<GuestRoute/>} >
            <Route path='registration' element={<Registration/>} />
          </Route>
          <Route element={<AuthRequired/>}>
            <Route path='post' element={<Post/>} />
          </Route>
          <Route element={<AuthRequired/>}>
            <Route path='post/:id' element={<PostDetail/>} />
          </Route>
          <Route element={<AuthRequired/>}>
            <Route path='post/create' element={<CreatePost/>} />
          </Route>
          <Route element={<AuthRequired/>}>
            <Route path='post/update/:id' element={<UpdatePost/>} />
          </Route>
          <Route element={<AuthRequired/>}>
            <Route path='post/view/:id' element={<PostDetail/>} />
          </Route>
        </Route>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
