// src/App.tsx
import { useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./Reset";
import MessageWrapper from "./components/MessageWrapper";
import NewTrackingForm from "./components/NewTrackingForm";
import TrackingsList from "./components/TrackingsList";
import { IUserState, UserContext } from "./contexts/UserContext";

function App() {
  const { user, setUser } = useContext(UserContext) as IUserState;

  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  return (
    <MessageWrapper>
      <Router>
        <Routes>
          <Route
            path='/login'
            element={user ? <Navigate to='/' /> : <Login setUser={setUser} />}
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
            element={
              user ? (
                <div className='container'>
                  <div className='flex justify-between'>
                    <button
                      onClick={handleLogout}
                      className='rounded-md bg-red-500 text-white'
                    >
                      خروج
                    </button>
                  </div>
                  <NewTrackingForm />
                  <TrackingsList />
                  <p className='underline'>تمامی حقوق محفوظ است!</p>
                </div>
              ) : (
                <Navigate to='/login' />
              )
            }
          />
        </Routes>
      </Router>
    </MessageWrapper>
  );
}

export default App;
