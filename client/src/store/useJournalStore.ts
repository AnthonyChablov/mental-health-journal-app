import create from "zustand";
import { IJournalEntry } from "@/models/journalModels";
import { Tag } from "@/models/journalModels";
import { SetStateAction } from "react";

// Define the existing state and actions
type State = {
  userId: string;
  title: string;
  content: string;
  date: Date | undefined;
  mood: string;
  tags: Tag[];
  privacy: string;
  /* Data Fetching State */
  isLoading: boolean;
};

type Actions = {
  setUserId: (newUserId: string) => void;
  setTitle: (newTitle: string) => void;
  setContent: (newContent: string) => void;
  setDate: (newDate: Date | undefined) => void;
  setMood: (newMood: string) => void;
  setTags: (newTags: Tag[]) => void;
  setPrivacy: (newPrivacy: string) => void;
  /* Data fetching setters */
  setIsLoading: (newIsLoading: boolean) => void;
};

// Extend the state and actions with the new models
export const useJournalStore = create<State & Actions>((set) => ({
  userId: "", // Initialize with default values or leave them empty
  title: "",
  content: "",
  date: undefined,
  mood: "",
  tags: [],
  privacy: "",
  isLoading: false,
  setUserId: (newUserId: string) => set({ userId: newUserId }),
  setTitle: (newTitle: string) => set({ title: newTitle }),
  setContent: (newContent: string) => set({ content: newContent }),
  setDate: (newDate: Date | undefined) => set({ date: newDate }),
  setMood: (newMood: string) => set({ mood: newMood }),
  setTags: (newTags: Tag[]) => set({ tags: newTags }),
  setPrivacy: (newPrivacy: string) => set({ privacy: newPrivacy }),
  setIsLoading: (newIsLoading: boolean) => set({ isLoading: newIsLoading }),
}));
