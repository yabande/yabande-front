import MessageContextProvider from "./MessageContext.tsx";
import TrackingsContextProvider from "./TrackingsContext.tsx";
import UserContextProvider from "./UserContext.tsx";

function ContextWrapper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <MessageContextProvider>
      <UserContextProvider>
        <TrackingsContextProvider>
          <>{children}</>
        </TrackingsContextProvider>
      </UserContextProvider>
    </MessageContextProvider>
  );
}

export default ContextWrapper;
