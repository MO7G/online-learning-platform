import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Public from './components/public/Public'
import Login from './feature/auth/Login'
import Welcome from './feature/auth/Welcome'
import RequireAuth from './feature/auth/RequireAuth'
import UsersList from './feature/user/UserList'
 

const App = () => {
    return(
        <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
  
          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="userslist" element={<UsersList />} />
          </Route>
  
        </Route>
      </Routes>
    )
};

export default App;
