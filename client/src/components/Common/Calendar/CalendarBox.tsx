'use client';
import React, {useState} from 'react'

interface ICalendarBox {
  dayName: 'Mon' | 'Tue' |'Wed' |'Thur' |'Fri' |'Sat' |'Sun';
  dayNumber: string;
  
}

const CalendarBox = ({dayName, dayNumber}:ICalendarBox) => {

  const [selected, setSelected] = useState(false);

  function onClickHandeller(){
    setSelected(!selected);
  }

  return (
    <div onClick={()=>onClickHandeller()} className={`items-center flex flex-col hover:cursor-pointer ${selected ? 'border-gray-200 border-2' : 'border-spacing-0 border-collapse'}`}>
      <p className=' text-slate-400 font-semibold '>{dayName}</p>
      <p className='text-slate-200 font-semibold'>{dayNumber}</p>
    </div>
  )
}

export default CalendarBox;