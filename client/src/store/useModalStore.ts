import create from "zustand";

// Define the existing state and actions
type State = {
  toggleEditModal: boolean;
};

type Actions = {
  setToggleEditModal: (toggleEditModal: boolean) => void;
};

export const useModalStore = create<State & Actions>((set) => ({
  toggleEditModal: false,
  setToggleEditModal: (newToggleEditModal: boolean) =>
    set({ toggleEditModal: newToggleEditModal }),
}));
