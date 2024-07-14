import { Module } from "vuex";
import { RootState } from "..";
import { AppointmentState } from "./types";
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import { getters } from "./getters";

export const appointment: Module<AppointmentState, RootState> = {
  state,
  actions,
  mutations,
  getters,
};
