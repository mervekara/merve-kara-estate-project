import { GetterTree } from "vuex";
import { RootState } from "../index";
import { AgentsState } from "./types";

export const getters: GetterTree<AgentsState, RootState> = {
  getAgentsData: (state) => {
    console.log(state.agents);
    return state.agents;
  },
};
