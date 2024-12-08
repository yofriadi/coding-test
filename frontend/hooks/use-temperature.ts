import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

const apiUrl = 'http://localhost:3001';
const socket = io(apiUrl);

interface TemperatureData {
  createdAt: string;
  value: number;
}

export function useTemperature(city: string) {
  const [temperatures, setTemperatures] = useState<TemperatureData[]>([]);

  const fetchInitialData = useCallback(async (city: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/data?city=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch initial data');
      }

      let { data } = await response.json();
      data = data.map((d: { createdAt: string; value: number }) => {
        d.createdAt = formatTime(d.createdAt, city);
        return d;
      });
      setTemperatures(data);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  }, []);

  useEffect(() => {
    fetchInitialData(city);

    socket.emit('subscribeToCity', city);
    socket.on('temperature', (data: TemperatureData) => {
      data.createdAt = formatTime(data.createdAt, city);
      setTemperatures((prev) => [...prev, data].slice(-30));
    });

    return () => {
      socket.emit('unsubscribeFromCity', city);
      socket.off('temperature');
    };
  }, [city, fetchInitialData]);

  return temperatures;
}

function formatTime(time: string, city: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  };

  if (city === 'Singapore') {
    options.timeZone = 'Asia/Singapore';
  } else if (city === 'Sydney') {
    options.timeZone = 'Australia/Sydney';
  }

  return new Date(time).toLocaleString('en-ID', options);
}
