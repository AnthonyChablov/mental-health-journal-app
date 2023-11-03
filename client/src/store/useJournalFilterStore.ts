import create from "zustand";
import { IJournalFilter } from "@/models/journalModels";

// Define the existing state and actions
type State = {
  filterTitle: "asc" | "desc" | "clear" | undefined;
  filterDate: "asc" | "desc" | "clear" | undefined;
  filterContent: "asc" | "desc" | "clear" | undefined;
  filterMood: "asc" | "desc" | "clear" | undefined;
};

type Actions = {
  setFilterTitle: (filterTitle: "asc" | "desc" | "clear" | undefined) => void;
  setFilterDate: (filterDate: "asc" | "desc" | "clear" | undefined) => void;
  setFilterContent: (
    filterContent: "asc" | "desc" | "clear" | undefined
  ) => void;
  setFilterMood: (filterMood: "asc" | "desc" | "clear" | undefined) => void;
};

export const useJournalFilterStore = create<State & Actions>((set) => ({
  filterTitle: undefined, // Initial state values
  filterDate: undefined,
  filterContent: undefined,
  filterMood: undefined,
  setFilterTitle: (newFilterTitle) => set({ filterTitle: newFilterTitle }),
  setFilterDate: (newFilterDate) => set({ filterDate: newFilterDate }),
  setFilterContent: (newFilterContent) =>
    set({ filterContent: newFilterContent }),
  setFilterMood: (newFilterMood) => set({ filterMood: newFilterMood }),
}));
