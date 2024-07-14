import { Module } from "vuex";
import { AppointmentsState } from "./types";
import { RootState } from "../index";
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import { getters } from "./getters";

export const appointments: Module<AppointmentsState, RootState> = {
  state,
  actions,
  mutations,
  getters,
};
