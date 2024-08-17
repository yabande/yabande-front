import axios from "axios";
import { FormEvent, useContext } from "react";
import { IMessageState, MessageContext } from "../contexts/MessageContext";
import {
  ITrackingsState,
  TrackingsContext,
} from "../contexts/TrackingsContext";
import { IUserState, UserContext } from "../contexts/UserContext";
import { saveTracking } from "../utils/db";
import { Tracking, TrackingType } from "../utils/types";

function NewTrackingForm() {
  const { user } = useContext(UserContext) as IUserState;
  const { trackings, setTrackings } = useContext(
    TrackingsContext,
  ) as ITrackingsState;
  const { throwNewMessage } = useContext(MessageContext) as IMessageState;

  async function newWatch(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const url = formData.get("url") as string;
    const track_mode = formData.get("track_mode") as string;

    const requestBody = {
      title,
      url,
      type: track_mode === "Stock" ? TrackingType.Stock : TrackingType.Page,
      username: user, // Automatically set the user
    };

    await axios
      .post(`${import.meta.env.VITE_RELAY_URL}/api/v1/trackings`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(async (response) => {
        const newTracking: Tracking = {
          _id: response.data._id,
          ...requestBody,
        };
        await saveTracking(newTracking).then(() => {
          setTrackings([...trackings, newTracking]);
          throwNewMessage(`New tracking: ${response.data._id}`);
        });
      })
      .catch((e) => throwNewMessage(e.response.data.error));
  }
  return (
    <form onSubmit={newWatch}>
      <h1>تغییریاب</h1>
      <div
        id='new-tracking-form'
        className='my-6 flex flex-col justify-start gap-4'
      >
        <div className='input_group'>
          <label htmlFor='title'>نام یا عنوان</label>
          <input
            name='title'
            id='title'
            className='rounded-md p-2'
            placeholder='مکبوک M3 2020'
            type='text'
          />
        </div>
        <div className='input_group'>
          <label htmlFor='url'>آدرس صفحه</label>
          <input
            name='url'
            id='url'
            className='rounded-md p-2'
            placeholder='https://digikala.com/'
            type='url'
            pattern='https?://.+'
          />
        </div>
        <div className='flex flex-row justify-start gap-4'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-1'>
              <input
                type='radio'
                name='track_mode'
                id='restock_diff'
                value='Stock'
              />
              <label htmlFor='track_mode'>رهگیری موجودی محصول</label>
            </div>
            <div className='flex gap-1'>
              <input
                type='radio'
                name='track_mode'
                id='text_json_diff'
                value='Page'
              />
              <label htmlFor='track_mode'>رهگیری تغییرات صفحه</label>
            </div>
          </div>
          <button
            type='submit'
            className='rounded-md bg-blue-500 p-2 text-white'
          >
            رهگیری
          </button>
        </div>
        <div className='rounded-md bg-slate-800 p-4'>
          <div className='flex'>
            <h4>گزینه های پیشرفته</h4>
          </div>
          <div className='flex flex-col justify-start text-right'>
            <p>
              بررسی تغییرات هر{" "}
              <input type='number' className='h-10 w-10 rounded-md p-2' /> ساعت
            </p>
            <p>
              <input type='checkbox' />
              ارسال نوتیفیکیشن
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default NewTrackingForm;
