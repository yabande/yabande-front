import axios from "axios";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export type IUserState = {
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
};

export const UserContext = createContext<IUserState | null>(null);

function UserContextProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  useEffect(() => {
    if (localStorage.getItem("username")) {
      axios
        .post(
          `${import.meta.env.VITE_RELAY_URL}/api/v1/user/authenticate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        )
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          if (e.response.status == 401) {
            localStorage.setItem("username", "");
            localStorage.setItem("token", "");
          }
        });
    } else {
      localStorage.setItem("username", "");
      localStorage.setItem("token", "");
    }
  }, []);
  const [user, setUser] = useState<string>(
    localStorage.getItem("username") || "",
  );
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
