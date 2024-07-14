import { GetterTree } from "vuex";
import { RootState } from "../index";
import { ContactsState } from "./types";

export const getters: GetterTree<ContactsState, RootState> = {
  getContactsData: (state) => {
    return state.contacts;
  },
};
