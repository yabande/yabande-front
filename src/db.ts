import axios from 'axios';
import { Tracking } from './types';

const API_URL = 'http://localhost:5001/api/trackings';

export async function saveTracking(tracking: Tracking): Promise<void> {
  await axios.post(API_URL, tracking, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteTracking(id: number | string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getAllTrackings(): Promise<Tracking[]> {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Assuming server returns an array of Trackings
  } catch (error) {
    console.error('Error fetching trackings:', error);
    return []; // Return empty array or handle error as needed
  }
}
