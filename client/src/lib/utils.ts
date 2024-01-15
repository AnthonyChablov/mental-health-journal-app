import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentFormattedDate() {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];

  const now = new Date();
  const dayOfWeek = daysOfWeek[now.getDay()];
  const month = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();

  const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;
  return formattedDate;
}

export function formatDate(date: string | Date | undefined) {
  if (!date) {
    return "Invalid Type";
  }

  // Create a new Date object from the provided date string
  const inputDate = new Date(date);

  // Check if the input date is valid
  if (isNaN(inputDate.getTime())) {
    return "Invalid Date";
  }

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const months = [
    "JANY",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];

  const dayOfWeek = daysOfWeek[inputDate.getDay()];
  const month = months[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;
  return formattedDate;
}

export const moodObject = [
  { name: "Sad", emoji: "😞" },
  { name: "Very Sad", emoji: "😢" },
  { name: "Angry", emoji: "😡" },
  { name: "Happy", emoji: "😃" },
  { name: "Very Happy", emoji: "😄" },
];

export function formatMood(mood: string) {
  const formattedMood = mood;
  const mappedMood = moodObject?.find((item) => item.name === formattedMood);

  if (mappedMood) {
    return {
      name: mappedMood.name,
      emoji: mappedMood.emoji,
    };
  } else {
    return {
      name: "unknown",
      emoji: "❓",
    };
  }
}
