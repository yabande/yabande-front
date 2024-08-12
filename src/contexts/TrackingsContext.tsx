import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Tracking } from "../utils/types";

export type ITrackingsState = {
  trackings: Tracking[];
  setTrackings: Dispatch<SetStateAction<Tracking[]>>;
};

export const TrackingsContext = createContext<ITrackingsState | null>(null);

function TrackingsContextProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [trackings, setTrackings] = useState<Tracking[]>([]);
  return (
    <TrackingsContext.Provider value={{ trackings, setTrackings }}>
      {children}
    </TrackingsContext.Provider>
  );
}

export default TrackingsContextProvider;
