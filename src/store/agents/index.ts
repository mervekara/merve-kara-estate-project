import { Module } from "vuex";
import { RootState } from "../index";
import { AgentsState } from "./types";
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import { getters } from "./getters";

export const agents: Module<AgentsState, RootState> = {
  state,
  actions,
  mutations,
  getters,
};
