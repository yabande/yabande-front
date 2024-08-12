import { createContext, Dispatch, SetStateAction, useState } from "react";

export type IMessageState = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  throwNewMessage: (s: string) => void;
};

export const MessageContext = createContext<IMessageState | null>(null);

function MessageContextProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [message, setMessage] = useState<string>("");

  const throwNewMessage = (_message: string) => {
    setMessage(_message);
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <MessageContext.Provider value={{ message, setMessage, throwNewMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageContextProvider;
