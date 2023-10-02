"use client";
import React, { useState } from 'react';
import CalendarBox from './CalendarBox';
import Container from '../Utils/Container';

const CalendarPreview = () => {
  // Initialize the current date to today
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to handle moving to the next day
  const handleNextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
  };

  // Function to handle moving to the previous day
  const handlePreviousDay = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDate);
  };

  // Generate an array of 7 days starting from the current date
  const days = [...Array(7)].map((_, index) => {
    const day = new Date(currentDate);
    day.setDate(currentDate.getDate() + index);
    return day;
  });

  return (
    <Container>
      <div className="flex items-center justify-center space-x-4">
        <button onClick={handlePreviousDay} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Previous Day
        </button>
        {days.map((day, index) => (
          <CalendarBox
            key={index}
            dayName={day.toLocaleDateString('en-US', { weekday: 'short' })}
            dayNumber={String(day.getDate())}
          />
        ))}
        <button onClick={handleNextDay} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Next Day
        </button>
      </div>
    </Container>
  );
};

export default CalendarPreview;
