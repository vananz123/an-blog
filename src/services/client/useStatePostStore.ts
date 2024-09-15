import { create } from "zustand";
import { persist } from "zustand/middleware";

import { StatePostStore } from "./type";
const useStatePostStore = create<StatePostStore>()(
  persist(
    (set) => ({
      isLoaded: false,
      statePost: "blog",
      setStatePost: (statePost) =>
        set((state) => ({ ...state, statePost: statePost })),
      setLoaded: () =>
        set((state) => ({
          ...state,
          isLoaded: true,
        })),
    }),
    {
      name: "state-post-store",
      onRehydrateStorage: () => (state) => state?.setLoaded(),
    }
  )
);
export default useStatePostStore;
