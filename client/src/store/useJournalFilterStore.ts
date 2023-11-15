import create from "zustand";

// Define the existing state and actions
type State = {
  filterMode: "Title" | "Date" | "Mood" | "Content" | undefined;
  filterTitle: "asc" | "desc" | "clear" | undefined;
  filterDate: "asc" | "desc" | "clear" | undefined;
  filterContent: "asc" | "desc" | "clear" | undefined;
  filterMood: "asc" | "desc" | "clear" | undefined;
};

type Actions = {
  setFilterMode: (
    filterMode: "Title" | "Date" | "Mood" | "Content" | undefined
  ) => void;
  setFilterTitle: (filterTitle: "asc" | "desc" | "clear" | undefined) => void;
  setFilterDate: (filterDate: "asc" | "desc" | "clear" | undefined) => void;
  setFilterContent: (
    filterContent: "asc" | "desc" | "clear" | undefined
  ) => void;
  setFilterMood: (filterMood: "asc" | "desc" | "clear" | undefined) => void;
};

export const useJournalFilterStore = create<State & Actions>((set) => ({
  filterMode: undefined,
  filterTitle: undefined, // Initial state values
  filterDate: undefined,
  filterContent: undefined,
  filterMood: undefined,
  setFilterMode: (newFilterMode) => set({ filterMode: newFilterMode }),
  setFilterTitle: (newFilterTitle) => set({ filterTitle: newFilterTitle }),
  setFilterDate: (newFilterDate) => set({ filterDate: newFilterDate }),
  setFilterContent: (newFilterContent) =>
    set({ filterContent: newFilterContent }),
  setFilterMood: (newFilterMood) => set({ filterMood: newFilterMood }),
}));
