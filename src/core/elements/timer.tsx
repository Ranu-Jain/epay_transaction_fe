import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const Timer = ({ initialSeconds = 300 }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const { t } = useTranslation()

  useEffect(() => {
    // Function to handle the countdown logic
    const updateCountdown = () => {
      setSecondsRemaining(prev => {
        if (prev <= 0) return 0; // Prevent negative values
        return prev - 1; // Decrement by one second
      });
    };

    // Set up the interval to update every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Clear the interval when the component is unmounted or countdown finishes
    return () => clearInterval(intervalId);
  }, []);

  // Format seconds to MM:SS
  const formatTime = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formattedTime = useMemo(() => formatTime(secondsRemaining), [secondsRemaining]);

  return (
    <span >{`${t('time_remain')} ${formattedTime}`}</span>
  );
};

export default React.memo(Timer);
