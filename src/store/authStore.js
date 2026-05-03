import { create } from "zustand";

export const useAuthStore = create((set) => ({

  owner: null,
  token: null,

  setAuth: (data) =>
    set({
      owner: data.owner,
      token: data.token
    }),

  logout: () => {
    localStorage.removeItem("token");
    set({ owner: null, token: null });
  }

}));
