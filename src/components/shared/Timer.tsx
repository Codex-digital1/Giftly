import React, { useEffect, useState } from "react";

// Time remaining state type
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerProps {
  targetDate: string;
  isUser: boolean;
}

const Timer: React.FC<TimerProps> = ({ targetDate, isUser }) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(
    null
  );

  useEffect(() => {
    const targetDateObj = new Date(targetDate); // Convert targetDate to Date object

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDateObj.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        alert("Countdown Complete!");
        setTimeRemaining(null);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center justify-center bg-[#fff3f5] w-full">
      <div className="text-base">
        {timeRemaining ? (
          isUser ? (
            <div className="flex flex-row justify-between gap-3 w-full">
              <p className="flex flex-col items-center">
                <span className="text-xl font-bold">{timeRemaining.days}</span>
                <span>Day</span>
              </p>
              <p className="flex flex-col items-center">
                <span className="text-xl font-bold">{timeRemaining.hours}</span>
                <span>Hours</span>
              </p>
              <p className="flex flex-col items-center">
                <span className="text-xl font-bold">
                  {timeRemaining.minutes}
                </span>
                <span>Minutes</span>
              </p>
              <p className="flex flex-col items-center">
                <span className="text-xl font-bold">
                  {timeRemaining.seconds}
                </span>
                <span>Sec</span>
              </p>
            </div>
          ) : (
            <div className="flex flex-row justify-between w-full">
              <p className="flex items-center">
                <span className="text-base">{timeRemaining.days}</span>
                <span className="mx-[2px]">:</span>
              </p>
              <p className="flex items-center">
                <span className="text-base">{timeRemaining.hours}</span>
                <span className="mx-[2px]">:</span>
              </p>
              <p className="flex items-center">
                <span className="text-base">{timeRemaining.minutes}</span>
                <span className="mx-[2px]">:</span>
              </p>
              <p className="flex items-center">
                <span className="text-base">{timeRemaining.seconds}</span>
              </p>
            </div>
          )
        ) : (
          <p>Delevery Sheduled....</p>
        )}
      </div>
    </div>
  );
};

export default Timer;
