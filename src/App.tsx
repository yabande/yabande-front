import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import axios from "axios";

enum TrackingType {
  "Page",
  "Stock",
}

type Tracking = {
  id: number | string;
  title: string;
  url: string;
  type: TrackingType;
  user: string;
};

function App() {
  const [user, setUser] = useState("");
  const [uuid, setUuid] = useState("");
  const [trackings, setTrackings] = useState<Tracking[]>([]);

  useEffect(() => {
    // Fetch trackings from the backend when the component mounts
    async function fetchTrackings() {
      try {
        const response = await axios.get("http://localhost:3021/api/trackings");
        setTrackings(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchTrackings();
  }, []);

  async function newWatch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const url = formData.get("url");
    const track_mode = formData.get("track_mode");
    const user = formData.get("user");

    const requestBody = {
      url: url,
      tag: title,
      processor: track_mode === "Stock" ? "restock_diff" : "page_diff",
      user: user,
    };

    try {
      const response = await axios.post(
        "https://izacc.ir/api/v1/watch",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "9be2e62f333ef5cd0cb8f29359435648",
          },
        }
      );

      const newTracking = {
        id: response.data["uuid"],
        title: title,
        url: url,
        type: track_mode === "Stock" ? TrackingType.Stock : TrackingType.Page,
        user: user,
      };


      setTrackings([...trackings, newTracking]);
      setUuid(response.data["uuid"]);
      setUser(user);
      alert(`UUID: ${response.data["uuid"]}`);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  async function deleteWatch(uuid) {
    try {
      await axios.delete(`https://izacc.ir/api/v1/watch/${uuid}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "9be2e62f333ef5cd0cb8f29359435648",
        },
      });


      // Remove the deleted tracking from the state
      setTrackings(trackings.filter((tracking) => tracking.id !== uuid));
      alert(`Tracking with UUID: ${uuid} has been deleted.`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <div className="container">
      <div className="flex justify-center">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <form onSubmit={newWatch}>
        <h1>تغییریاب</h1>
        <div className="flex flex-col justify-start gap-4 my-6">
          <div className="input_group">
            <label htmlFor="title">نام یا عنوان</label>
            <input
              name="title"
              id="title"
              className="p-2 rounded-md"
              placeholder="مکبوک M3 2020"
              type="text"
            />
          </div>
          <div className="input_group">
            <label htmlFor="url">آدرس صفحه</label>
            <input
              name="url"
              id="url"
              className="p-2 rounded-md"
              placeholder="https://digikala.com/"
              type="url"
            />
          </div>
          <div className="input_group">
            <label htmlFor="user">کاربر</label>
            <input
              name="user"
              id="user"
              className="p-2 rounded-md"
              placeholder="Username"
              type="text"
            />
          </div>
          <div className="flex flex-row gap-4 justify-start">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="track_mode"
                  id="restock_diff"
                  value="Stock"
                />
                <label htmlFor="track_mode">رهگیری موجودی محصول</label>
              </div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="track_mode"
                  id="text_json_diff"
                  value="Page"
                />
                <label htmlFor="track_mode">رهگیری تغییرات صفحه</label>
              </div>
            </div>
            <button type="submit">رهگیری</button>
          </div>
          <div className="bg-slate-800 p-4 rounded-md">
            <div className="flex">
              <h4>گزینه های پیشرفته</h4>
              <span>{">"}</span>
            </div>
            <div className="flex flex-col justify-start text-right">
              <p>
                بررسی تغییرات هر{" "}
                <input type="number" className="w-10 h-10 rounded-md" /> ساعت
              </p>
              <p>
                <input type="checkbox" />
                ارسال نوتیفیکیشن
              </p>
            </div>
          </div>
        </div>
      </form>
      <div>
        <h4>رهگیری ها</h4>
        <ul className="tracking_list">
          {trackings.map((tracking) => (
            <li key={tracking.id} className="tracking_item">
              <div className="flex flex-col">
                <p>
                  <a href={tracking.url}>{tracking.title}</a>
                </p>
                <span>کاربر: {tracking.user}</span> {/* Display user */}
                <span>رهگیری به صورت {TrackingType[tracking.type]}</span>
              </div>
              <div className="flex">
                <PencilSquareIcon width={16} />
                <TrashIcon
                  width={16}
                  onClick={() => deleteWatch(tracking.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="underline">تمامی حقوق محفوظ است!</p>
    </div>
  );
}

export default App;
