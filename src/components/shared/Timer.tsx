import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// Time remaining state type
interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerProps {
  targetDate: string;
  user: any;
  isOrderPage: boolean;
}

const Timer: React.FC<TimerProps> = ({ targetDate, user, isOrderPage }) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const targetDateObj = new Date(targetDate); // Convert targetDate to Date object

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDateObj.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        
        // toast.success('Scheduled Delivery Expeired!');
        setTimeRemaining(null);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={`flex flex-col items-center justify-center ${isOrderPage && 'bg-secondary'}  w-full`}>
      <div className="text-base">
        {timeRemaining ? (
          user ? (
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max ">
              <div className="flex flex-col">
                <span className="countdown font-mono text-xl text-primary">
                  <span style={{ "--value": timeRemaining.days } as React.CSSProperties}></span>
                </span>
                days
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-xl text-primary">
                  <span style={{ "--value": timeRemaining.hours } as React.CSSProperties}></span>
                </span>
                hours
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-xl text-primary">
                  <span style={{ "--value": timeRemaining.minutes } as React.CSSProperties}></span>
                </span>
                min
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-xl text-primary">
                  <span style={{ "--value": timeRemaining.seconds } as React.CSSProperties}></span>
                </span>
                sec
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-between w-full">
              <p className="flex items-center text-primary">
                <span className="text-base">{timeRemaining.days}</span>
                <span className="mx-[2px]">:</span>
              </p>
              <p className="flex items-center text-primary">
                <span className="text-base">{timeRemaining.hours}</span>
                <span className="mx-[2px]">:</span>
              </p>
              <p className="flex items-center text-primary">
                <span className="text-base">{timeRemaining.minutes}</span>
                <span className="mx-[2px]">:</span>
              </p>
              <p className="flex items-center text-primary">
                <span className="text-base">{timeRemaining.seconds}</span>
              </p>
            </div>
          )
        ) : (
          <p>Delivery Scheduled....</p>
        )}
      </div>
    </div>
  );
};

export default Timer;
