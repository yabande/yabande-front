import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useContext, useEffect } from "react";
import { IMessageState, MessageContext } from "../contexts/MessageContext";
import {
  ITrackingsState,
  TrackingsContext,
} from "../contexts/TrackingsContext";
import { IUserState, UserContext } from "../contexts/UserContext";
import { deleteTracking, getAllTrackings } from "../utils/db";
import { TrackingType } from "../utils/types";

function TrackingsList() {
  const { user } = useContext(UserContext) as IUserState;
  const { trackings, setTrackings } = useContext(
    TrackingsContext,
  ) as ITrackingsState;
  const { throwNewMessage } = useContext(MessageContext) as IMessageState;

  useEffect(() => {
    const fetchData = async () => {
      getAllTrackings(user)
        .then((_trackings) => setTrackings(_trackings))
        .catch((error) => throwNewMessage(error));
    };
    if (user) fetchData();
  }, [setTrackings, throwNewMessage, user]);

  async function deleteWatch(uuid: string) {
    await axios
      .delete(`https://izacc.ir/api/v1/watch/${uuid}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "9be2e62f333ef5cd0cb8f29359435648",
        },
      })
      .then(async (response) => {
        console.log(response);

        await deleteTracking(uuid);

        setTrackings(trackings.filter((tracking) => tracking.id !== uuid));
        throwNewMessage(`Tracking with UUID: ${uuid} has been deleted.`);
      })
      .catch((error) => {
        throwNewMessage(`Error: ${error}`);
      });
  }
  return (
    <div id='trackings-list'>
      <h4>رهگیری ها</h4>
      <ul className='tracking_list'>
        {trackings.length &&
          trackings.map((tracking) => (
            <li key={tracking.id} className='tracking_item'>
              <div className='flex flex-col'>
                <p>
                  <a href={tracking.url}>{tracking.title}</a>
                </p>
                <span>کاربر: {tracking.user}</span> {/* Display user */}
                <span>رهگیری به صورت {TrackingType[tracking.type]}</span>
              </div>
              <div className='flex'>
                <PencilSquareIcon width={16} />
                <TrashIcon
                  className='cursor-pointer'
                  width={16}
                  onClick={() => deleteWatch(tracking.id.toString())}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TrackingsList;
