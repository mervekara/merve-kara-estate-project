import { Module } from "vuex";
import { RootState } from "../index";
import { ContactsState } from "./types";
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import { getters } from "./getters";

export const contacts: Module<ContactsState, RootState> = {
  state,
  actions,
  mutations,
  getters,
};
