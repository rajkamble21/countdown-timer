import React, { useState, useEffect, useRef } from 'react';

/**
 * Timer component that provides a countdown timer with start, pause, resume, and reset functionalities.
 */
const Timer = () => {
  const INITIAL_TIME = 1500; // 25 minutes in seconds
  const [time, setTime] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  // Function to start the timer
  const startTimer = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  };

  // Function to pause the timer
  const pauseTimer = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  // Function to resume the timer
  const resumeTimer = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  };

  // Function to reset the timer
  const resetTimer = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTime(INITIAL_TIME);
  };

  // Effect to stop the timer when time reaches zero
  useEffect(() => {
    if (time === 0) {
      clearInterval(countRef.current);
      setIsActive(false);
      setIsPaused(false);
    }
  }, [time]);

  // Function to format time in MM:SS format
  const formatTime = (time) => {
    const minutes = `0${Math.floor(time / 60)}`.slice(-2);
    const seconds = `0${time % 60}`.slice(-2);
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white">
      <h1 className="text-4xl sm:text-5xl mb-8 font-bold">Countdown Timer</h1>
      <div className="text-6xl sm:text-7xl font-mono mb-8 p-4 bg-gray-800 rounded-lg shadow-lg border-4 border-blue-500">
        {formatTime(time)}
      </div>
      <div className="flex space-x-4">
        {!isActive && !isPaused ? (
          <button onClick={startTimer} className="btn bg-green-500 hover:bg-green-700">
            Start
          </button>
        ) : (
          <>
            {isPaused ? (
              <button onClick={pauseTimer} className="btn bg-yellow-500 hover:bg-yellow-700">
                Pause
              </button>
            ) : (
              <button onClick={resumeTimer} className="btn bg-blue-500 hover:bg-blue-700">
                Resume
              </button>
            )}
            <button onClick={resetTimer} className="btn bg-red-500 hover:bg-red-700">
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
