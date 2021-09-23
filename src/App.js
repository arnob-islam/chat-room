import React from 'react'
import { UseGlobalContext } from './components/Provider/Anonymus';
import Loading from './components/SingleComponents/Loading';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import PriveteRoute from './components/SingleComponents/PriveteRoute';
import PublicRoute from './components/SingleComponents/PublicRoute';
// import ChatApplication from './components/chat';
import './style/App.css'
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ForgetPassword from './components/Auth/ForgetPassword';
import Home from './pages/Home'
import Navbar from './components/Navbar/AppBar'
import Chat from './components/chat/App'
import OnlyAdminLogin from './components/Admin/AdminLogin'
import AdminDashBord from './components/Admin/index'
import AdminPriveteRoute from './components/Admin/AdminRoute'
// import AdminChatWithUser from './components/Admin/Chat/'

const App = () => {
  const { loading, } = UseGlobalContext()

  if (loading) {
    return <Loading />
  }

  return (
    <Router>
      <Switch>
        <AdminPriveteRoute exact path='/only/admin/access/' component={AdminDashBord} />
        {/* <AdminPriveteRoute exact path='/admin/single/user/:id' component={AdminChatWithUser} /> */}
        <>
          <Navbar />
          <Chat />
          <Route exact path='/' component={Home} />
          <PublicRoute exact path='/login/' component={Login} />
          <PublicRoute exact path='/user/signup/' component={SignUp} />
          <Route exact path='/user/forgetPassword/' component={ForgetPassword} />

          <Route exact path='/only/admin/login' component={OnlyAdminLogin} />
        </>
      </Switch>
    </Router>
  )
}

export default App
