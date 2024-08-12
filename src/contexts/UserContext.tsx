import { createContext, Dispatch, SetStateAction, useState } from "react";

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
