import axios from "axios";
import { FormEvent, useContext } from "react";
import { IMessageState, MessageContext } from "../contexts/MessageContext";
import {
  ITrackingsState,
  TrackingsContext,
} from "../contexts/TrackingsContext";
import { IUserState, UserContext } from "../contexts/UserContext";
import { Tracking, TrackingType } from "../utils/types";
import { ArrowPathIcon, ArrowDownIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/16/solid";

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
        setTrackings([...trackings, newTracking]);
        throwNewMessage(`New tracking: ${response.data._id}`);
      })
      .catch((e) => throwNewMessage(e.response.data.error));
  }
  async function showAdvanced() {
    const advancedOptions = document.getElementById(
      "advancedOptions"
    ) as HTMLDivElement;
    advancedOptions.classList.toggle("hidden");
    advancedOptions.classList.toggle("mt-2");
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
        <div className='flex flex-row items-center gap-8'>
          <label htmlFor='track_mode' className='font-bold'>روش رهگیری</label>
          <div className='flex-grow'>
            <select
              id='track_mode'
              name='track_mode'
              className='bg-slate-700 text-white p-2 rounded-md appearance-none w-full'
            >
              <option value='Stock'>لطفا نوع رهگیری را انتخاب کنید:</option>
              <option value='Stock'>رهگیری موجودی محصول</option>
              <option value='Page'>رهگیری تغییرات صفحه</option>
              <option value='Price'>رهگیری قیمت</option>
            </select>
          </div>
        </div>
        <div className='flex flex-col gap-2 cursor-pointer bg-slate-700 p-2 rounded-md' >
          <div onClick={() => showAdvanced()} className='flex flex-row gap-1 cursor-pointer items-center'>
            <p>گزینه‌های پیشرفته</p>
            <ArrowLeftIcon className='h-5 w-5' />
          </div>
          <div className='rounded-md bg-slate-700 p-4 hidden mt-2' id='advancedOptions'>
            <div className='flex flex-col justify-start text-right gap-4'>
              <p>
                بررسی تغییرات هر{" "}
                <input type='number' className='h-8 w-16 rounded-md p-2' /> ساعت
              </p>
              <p>
                <input type='checkbox' />
                ارسال نوتیفیکیشن
              </p>
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='rounded-md bg-blue-500 p-2 text-white'
        >
          رهگیری
        </button>
      </div>
    </form>
  );
}

export default NewTrackingForm;
