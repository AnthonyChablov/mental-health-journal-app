import create from "zustand";

// Define the existing state and actions
type State = {
  openDrawer: boolean;
};

type Actions = {
  setOpenDrawer: (newOpenDrawer: boolean) => void;
};

// Extend the state and actions with the new models
export const useDrawerStore = create<State & Actions>((set) => ({
  openDrawer: false,
  setOpenDrawer: (newOpenDrawer: boolean) => set({ openDrawer: newOpenDrawer }),
}));
