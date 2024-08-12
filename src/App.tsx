// src/App.tsx
import { useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import MessageWrapper from "./components/MessageWrapper";
import { IUserState, UserContext } from "./contexts/UserContext";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./Reset";

function App() {
  const { user } = useContext(UserContext) as IUserState;

  return (
    <MessageWrapper>
      <Router>
        <Routes>
          <Route
            path='/login'
            element={user ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='/register'
            element={user ? <Navigate to='/' /> : <Register />}
          />
          <Route
            path='/reset-password'
            element={user ? <Navigate to='/' /> : <ResetPassword />}
          />
          <Route
            path='/'
            element={user ? <Dashboard /> : <Navigate to='/login' />}
          />
        </Routes>
      </Router>
    </MessageWrapper>
  );
}

export default App;
