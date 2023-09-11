import { useState, useEffect } from 'react'
import  axios  from 'axios'
import { Link, useLocation, Routes, Route } from 'react-router-dom' 



function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  const Home = () => {
    return (
      <>
      <h1>Home</h1>
      
      </>
    )
  }

  const Users = ({users}) => {
    return (
      <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}> 
            {user.name}
            </li>
          )
        })}
      </ul>
      </>
    )
  }

  const Posts = ({posts}) => {
    return (
      <>
      <h1>Posts</h1>
      <ul>
      {posts.map((post) => {
          return (
            <li key={post.id}> 
            {post.title}
            </li>
          )
        })}
      </ul>
      </>
    )
  }

  useEffect (() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users');
      const data = response.data
      setUsers(data)
    };
    fetchUsers();
  }, []);

  useEffect (() => {
    const fetchPosts = async () => {
      const response = await axios.get('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/posts');
      const data = response.data
      setPosts(data)
    };
    fetchPosts();
  }, []);

  return (
    <>
      <nav> 
      <Link to= '/' className = {location.pathname === '/' ? 'selected': ''}>Home</Link>
      <Link to= '/users' className = {location.pathname === '/users' ? 'selected': ''}>Users ({users.length})</Link>
      <Link to= '/posts' className = {location.pathname === '/posts' ? 'selected': ''}>Posts ({posts.length})</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/users' element={<Users users={ users }/> } ></Route>
        <Route path='/posts' element={<Posts posts={ posts }/>}></Route>
      </Routes>

    </>
  )
}

export default App
