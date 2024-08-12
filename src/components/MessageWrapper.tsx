import { useContext } from "react";
import { IMessageState, MessageContext } from "../contexts/MessageContext";
import Popup from "./Popup";

function MessageWrapper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const { message } = useContext(MessageContext) as IMessageState;
  return (
    <>
      {children}
      {message && <Popup message={message} />}
    </>
  );
}

export default MessageWrapper;
