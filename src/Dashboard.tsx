import { useContext } from "react";
import NewTrackingForm from "./components/NewTrackingForm";
import TrackingsList from "./components/TrackingsList";
import { IUserState, UserContext } from "./contexts/UserContext";

function Dashboard() {
  const { setUser } = useContext(UserContext) as IUserState;

  function handleLogout() {
    setUser("");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  }

  return (
    <div className='container flex flex-col gap-7'>
      <div className='flex items-center justify-between'>
        <span>نام کاربری: {localStorage.getItem("username")}</span>
        <button
          onClick={handleLogout}
          className='rounded-md bg-red-500 text-white px-4 py-2'
        >
          خروج
        </button>
      </div>
      <NewTrackingForm />
      <TrackingsList />
      <footer>
        <p className='underline'>تمامی حقوق محفوظ است!</p>
      </footer>
    </div>
  );
}

export default Dashboard;
