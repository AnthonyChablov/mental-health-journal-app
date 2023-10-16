import create from "zustand";
import { IJournalEntry } from "@/models/journalModels";

// Define the existing state and actions
type State = {
  journalEntry: IJournalEntry;
};

type Actions = {
  setJournalEntry: (newJournalEntry: IJournalEntry) => void;
};

// Extend the state and actions with the new models
export const useJournalStore = create<
  State & Actions & { journalEntry: IJournalEntry }
>((set) => ({
  setJournalEntry: (newJournalEntry) => set({ journalEntry: newJournalEntry }),
  journalEntry: {
    user_id: "",
    title: "",
    content: "",
    date: "",
    mood: "",
    tags: [],
    privacy: "",
  },
}));
