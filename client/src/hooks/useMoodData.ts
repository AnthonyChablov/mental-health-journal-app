import { useEffect, useState } from "react";
import { IJournalEntry } from "@/models/journalModels";

interface MoodObject {
  name: string;
  // Add any other properties of MoodObject if needed
}

interface MoodData {
  [moodName: string]: number;
}

const useMoodData = (journalData: IJournalEntry, moodObject: MoodObject[]) => {
  const [moodData, setMoodData] = useState<MoodData>({});

  useEffect(() => {
    if (Array.isArray(journalData)) {
      const currentWeekMoods = journalData.filter((entry) => true);
      const moodCount: MoodData = {};

      if (currentWeekMoods) {
        for (const mood of moodObject) {
          const moodEntries = currentWeekMoods.filter(
            (entry) => entry.mood === mood.name
          );
          moodCount[mood.name] = moodEntries.length;
        }
      }

      setMoodData(moodCount);
    }
  }, [journalData, moodObject]);

  return moodData;
};

export default useMoodData;
