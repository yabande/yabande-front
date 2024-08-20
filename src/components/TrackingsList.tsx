import { ArrowPathIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
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

  async function deleteWatch(id: string) {
    await deleteTracking(id);
    setTrackings(trackings.filter((tracking) => tracking._id !== id));
    throwNewMessage(`Tracking with ID: ${id} has been deleted.`);
  }
  return (
    <div id='trackings-list'>
      <h4>رهگیری ها</h4>
      <ul className='tracking_list'>
        {trackings.length &&
          trackings.map((tracking) => (
            <li key={tracking._id} className='tracking_item'>
              <div className='flex flex-col gap-3'>
                <p >
                  <a href={tracking.url}>{tracking.title}</a>
                </p>
                <span>آخرین به روز رسانی: {`2022/2/2`}</span>
                <span>نوع رهگیری: {TrackingType[tracking.type]}</span>
                <span>وضعیت موجودی: {`ناموجود`}</span>
              </div>
              <div className='flex gap-3'>
                <PencilSquareIcon width={16} />
                <ArrowPathIcon width={16} />
                <TrashIcon
                  className='cursor-pointer'
                  width={16}
                  onClick={() => deleteWatch(tracking._id)}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TrackingsList;
