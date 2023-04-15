import React from 'react';
import { Routes,Route } from 'react-router-dom'
 import Login from './Components/Login'
import Insert from './Components/Insert';
import Sucees from './Components/Sucees';
import Show from './Components/Show';
import Header from './Components/Header';
import Data from './Components/Data';
import { useSelector } from 'react-redux';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';
import CreateUser from './Components/create/Create_user';
import ShowUser from './Components/create/Show_user';
import UpdateUser from './Components/create/Update_user';
import UpdateInsert from './Components/Update_insert';
import Error from './Components/error';

 
function App() {
  const { isAuthenticated } = useSelector((state) => state.root);
  console.log(isAuthenticated)
  return (
    <>
    {/* <ColorModeSwitcher/> */}

    <Header/>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/Sucees' element={<Sucees />} />
      <Route path='/error' element={<Error />} />
      <Route path='/insert' element={<Insert/>} />
      {/* <Route path='/admin' element={<AdminLogin />} /> */}
     

      
      <Route
          path="/update_user/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
          />
            <Route
          path="/update_product/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
              <UpdateInsert />
            </ProtectedRoute>
          }
          />
          <Route
          path="/data"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
              <Data />
            </ProtectedRoute>
          }
          />
          <Route
          path="/create_user"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
              <CreateUser />
            </ProtectedRoute>
          }
          />
          
          <Route
          path="/show_user"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
              <ShowUser />
            </ProtectedRoute>
          }
          />
            <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
              <Home />
            </ProtectedRoute>
          }
          />

<Route
          path="/show"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
              <Show />
            </ProtectedRoute>
          }
          />
    </Routes>
    </>
  );
}

export default App;
