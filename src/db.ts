// src/db.ts
import axios from "axios";
import { Tracking } from "./types";

const API_URL = "http://localhost:5001/api/v1/trackings";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function saveTracking(tracking: Tracking): Promise<void> {
  await axios.post(API_URL, tracking, getAuthHeaders());
}

export async function deleteTracking(id: number | string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
}

export async function getAllTrackings(username: string): Promise<Tracking[]> {
  return await axios
    .get(`${API_URL}/?username=${username}`, getAuthHeaders())
    .then((response) => response.data)
    .catch((error) => error);
}
